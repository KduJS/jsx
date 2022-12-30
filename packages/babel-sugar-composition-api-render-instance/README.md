## @kdujs/babel-sugar-composition-api-render-instance

Babel syntactic sugar for replacing `this` with `getCurrentInstance()` in Kdu JSX with @kdujs/composition-api

### Babel Compatibility Notes

- This repo is only compatible with Babel 7.x

### Usage

Install the dependencies:

```sh
# for yarn:
yarn add @kdujs/babel-sugar-composition-api-render-instance
# for npm:
npm install @kdujs/babel-sugar-composition-api-render-instance --save
```

In your `.babelrc`:

```json
{
  "plugins": ["@kdujs/babel-sugar-composition-api-render-instance"]
}
```

However it is recommended to use the [configurable preset](../babel-preset-jsx/README.md) instead.

### Details

This plugin automatically replaces `this` in `setup()` with `getCurrentInstance()`. This is required for JSX to work in @kdujs/composition-api as `this` is not available in `setup()`

Input:

```jsx
defineComponent({ 
  setup() {
    return () => <MyComponent kModel={a.b} />
  }
})
```

Output (without @kdujs/babel-sugar-composition-api-render-instance):

```jsx
defineComponent({
  setup() {
    return () => <MyComponent model={{
      value: a.b,
      callback: $$v => {
        this.$set(a, "b", $$v);
      }
    }} />
  }
})
```

Output (with @kdujs/babel-sugar-composition-api-render-instance):

```jsx
import { getCurrentInstance } from "@kdujs/composition-api";

defineComponent({
  setup() {
    const __currentInstance = getCurrentInstance();

    return () => <MyComponent model={{
      value: a.b,
      callback: $$v => {
        __currentInstance.$set(a, "b", $$v);
      }
    }} />
  }
})
```

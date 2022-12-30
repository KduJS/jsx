## @kdujs/babel-sugar-composition-api-inject-h

Syntactic sugar for automatic `h` inject in JSX with @kdujs/composition-api.

### Babel Compatibility Notes

- This repo is only compatible with Babel 7.x

### Usage

Install the dependencies:

```sh
# for yarn:
yarn add @kdujs/babel-sugar-composition-api-inject-h
# for npm:
npm install @kdujs/babel-sugar-composition-api-inject-h --save
```

In your `.babelrc`:

```json
{
  "plugins": ["@kdujs/babel-sugar-composition-api-inject-h"]
}
```

However it is recommended to use the [configurable preset](../babel-preset-jsx/README.md) instead.

### Details

This plugin automatically injects `h` in every method that has JSX. By using this plugin you don't have to always import `h` from `@kdujs/composition-api`.

```js
// Without @kdujs/babel-sugar-inject-h
import { h } from '@kdujs/composition-api'

export default {
  setup() {
    return () => <button />
  },
}
```

```js
// With @kdujs/babel-sugar-inject-h
export default {
  setup() {
    return () => <button />
  },
}
```

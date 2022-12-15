## @kdujs/babel-sugar-functional-kdu

Syntactic sugar for functional components.

### Usage

Install the dependencies:

```sh
# for yarn:
yarn add @kdujs/babel-sugar-functional-kdu
# for npm:
npm install @kdujs/babel-sugar-functional-kdu --save
```

In your `.babelrc`:

```json
{
  "plugins": ["@kdujs/babel-sugar-functional-kdu"]
}
```

However it is recommended to use the [configurable preset](../babel-preset-jsx/README.md) instead.

### Details

This plugin transpiles arrow functions that return JSX into functional components but only if it's an uppercase variable declaration or default export:

```js
// Original:
export const A = ({ props, listeners }) => <div onClick={listeners.click}>{props.msg}</div>
export const b = ({ props, listeners }) => <div onClick={listeners.click}>{props.msg}</div>
export default ({ props, listeners }) => <div onClick={listeners.click}>{props.msg}</div>

// Result:
export const A = {
  functional: true,
  render: (h, {
    props,
    listeners
  }) => <div onClick={listeners.click}>{props.msg}</div>
}
export const b = ({ props, listeners }) => <div onClick={listeners.click}>{props.msg}</div>
export default {
  functional: true,
  render: (h, {
    props,
    listeners
  }) => <div onClick={listeners.click}>{props.msg}</div>
}
```

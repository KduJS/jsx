## @kdujs/babel-sugar-inject-h

Syntactic sugar for automatic `h` inject in JSX.

### Usage

Install the dependencies:

```sh
# for yarn:
yarn add @kdujs/babel-sugar-inject-h
# for npm:
npm install @kdujs/babel-sugar-inject-h --save
```

In your `.babelrc`:

```json
{
  "plugins": ["@kdujs/babel-sugar-inject-h"]
}
```

However it is recommended to use the [configurable preset](../babel-preset-jsx/README.md) instead.

### Details

This plugin automatically injects `h` in every method that has JSX. By using this plugin you don't have to always specifically declare `h` as first parameter in your `render()` function.

```js
// Without @kdujs/babel-sugar-inject-h
export default {
  render (h) {
    return <button />
  }
}

// With @kdujs/babel-sugar-inject-h
export default {
  render () {
    return <button />
  }
}
```

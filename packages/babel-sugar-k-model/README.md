## @kdujs/babel-sugar-k-model

Syntactic sugar for k-model in JSX.

### Usage

Install the dependencies:

```sh
# for yarn:
yarn add @kdujs/babel-sugar-k-model
# for npm:
npm install @kdujs/babel-sugar-k-model --save
```

In your `.babelrc`:

```json
{
  "plugins": ["@kdujs/babel-sugar-k-model"]
}
```

However it is recommended to use the [configurable preset](../babel-preset-jsx/README.md) instead.

### Details

This plugin adds k-model to the JSX and tries to mirror the same behaviour as in kdu-template-compiler, with a few differences:

1.  You should use underscore (`_`) instead of dot (`.`) for modifiers (`kModel_trim={this.test}`)
2.  It is recommended to use camelCase version of it (`kModel`) in JSX, but you can use kebab-case too (`k-model`).

```js
export default {
  data: () => ({
    test: 'Hello World',
  }),
  render(h) {
    return (
      <div>
        <input type="text" kModel_trim={this.test} />
        {this.test}
      </div>
    )
  },
}
```

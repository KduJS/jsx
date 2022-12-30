## @kdujs/babel-preset-jsx

Configurable preset for Kdu JSX plugins.

### Usage

Install the dependencies:

```sh
# for yarn:
yarn add @kdujs/babel-preset-jsx @kdujs/babel-helper-kdu-jsx-merge-props
# for npm:
npm install @kdujs/babel-preset-jsx @kdujs/babel-helper-kdu-jsx-merge-props --save
```

In your `babel.config.js`:

```js
module.exports = {
  presets: ['@kdujs/babel-preset-jsx'],
}
```

You can toggle specific features, by default all features (except `compositionAPI`) are enabled, e.g.:

```js
module.exports = {
  presets: [
    [
      '@kdujs/babel-preset-jsx',
      {
        kModel: false,
        compositionAPI: true,
      },
    ],
  ],
}
```

Options are:

- `compositionAPI` - Enables [@kdujs/babel-sugar-composition-api-inject-h](../babel-sugar-composition-api-inject-h) and [@kdujs/babel-sugar-composition-api-render-instance](../babel-sugar-composition-api-render-instance), support returning render function in `setup`.
- `functional` [@kdujs/babel-sugar-functional-kdu](../babel-sugar-functional-kdu/README.md) - Functional components syntactic sugar
- `injectH` [@kdujs/babel-sugar-inject-h](../babel-sugar-inject-h/README.md) - Automatic `h` injection syntactic sugar
- `kModel` [@kdujs/babel-sugar-k-model](../babel-sugar-k-model/README.md) - `kModel` syntactic sugar
- `kOn` [@kdujs/babel-sugar-k-on](../babel-sugar-k-on/README.md) - `kOn` syntactic sugar

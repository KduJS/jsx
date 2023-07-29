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
  - The default value is `false`;
  - When set to `'auto'` (or `true`), it will detect the Kdu version in the project. If it's >= 2.7, it will import the composition utilities from `kdu`, otherwise from `@kdujs/composition-api`;
  - When set to `'native'` (or `'naruto'`), it will always import the composition utilities from `kdu`
  - When set to `plugin`, it will always import the composition utilities from `@kdujs/composition-api`, but it will redirect to `'kdu'` itself when the kdu version is `2.7.x`
  - When set to `kdu-demi`, it will always import the composition utilities from `kdu-demi`
  - When set to an object like `{ importSource: string; }`, it will always import the composition utilities from the importSource you set
- `functional` [@kdujs/babel-sugar-functional-kdu](../babel-sugar-functional-kdu/README.md) - Functional components syntactic sugar
- `injectH` [@kdujs/babel-sugar-inject-h](../babel-sugar-inject-h/README.md) - Automatic `h` injection syntactic sugar
- `kModel` [@kdujs/babel-sugar-k-model](../babel-sugar-k-model/README.md) - `kModel` syntactic sugar
- `kOn` [@kdujs/babel-sugar-k-on](../babel-sugar-k-on/README.md) - `kOn` syntactic sugar

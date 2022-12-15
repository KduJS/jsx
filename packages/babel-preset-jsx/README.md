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

In your `.babelrc`:

```json
{
  "presets": ["@kdujs/babel-preset-jsx"]
}
```

You can toggle specific features, by default all features are enabled, e.g.:

```json
{
  "presets": [
    [
      "@kdujs/babel-preset-jsx",
      {
        "kModel": false
      }
    ]
  ]
}
```

Options are:

- `functional` [@kdujs/babel-sugar-functional-kdu](../babel-sugar-functional-kdu/README.md) - Functional components syntactic sugar
- `injectH` [@kdujs/babel-sugar-inject-h](../babel-sugar-inject-h/README.md) - Automatic `h` injection syntactic sugar
- `kModel` [@kdujs/babel-sugar-k-model](../babel-sugar-k-model/README.md) - `kModel` syntactic sugar
- `kOn` [@kdujs/babel-sugar-k-on](../babel-sugar-k-on/README.md) - `kOn` syntactic sugar

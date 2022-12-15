## @kdujs/babel-sugar-k-on

Syntactic sugar for k-on in JSX.

### Usage

Install the dependencies:

```sh
# for yarn:
yarn add @kdujs/babel-sugar-k-on
# for npm:
npm install @kdujs/babel-sugar-k-on --save
```

In your `.babelrc`:

```json
{
  "plugins": ["@kdujs/babel-sugar-k-on"]
}
```

However it is recommended to use the [configurable preset](../babel-preset-jsx/README.md) instead.

### Details

This plugin adds k-on to the JSX and tries to mirror the same behaviour as in kdu-template-compiler, with a few differences:

1.  You should use underscore (`_`) instead of dot (`.`) for modifiers (`kOn:click_prevent={this.test}`)
2.  It is recommended to use camelCase version of it (`kOn`) in JSX, but you can use kebab-case too (`k-on`).

```js
export default {
  methods: {
    test() {
      console.log('Hello World')
    },
  },
  render(h) {
    return (
      <div>
        <a href="https://kdu-js.web.app" kOn:click={this.test}>Kdu</a>
      </div>
    )
  },
}
```

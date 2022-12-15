## @kdujs/babel-plugin-transform-kdu-jsx

> Babel plugin for Kdu 2.0 JSX

### Requirements

- Assumes you are using Babel with a module bundler e.g. Webpack, because the spread merge helper is imported as a module to avoid duplication.

- This is mutually exclusive with `babel-plugin-transform-react-jsx`.

### Usage

```bash
npm install @kdujs/babel-plugin-transform-kdu-jsx --save-dev
npm install @kdujs/babel-helper-kdu-jsx-merge-props --save
```

In your `.babelrc`:

```json
{
  "plugins": ["transform-kdu-jsx"]
}
```

However it is recommended to use the [configurable preset](../babel-preset-jsx/README.md) instead.

### Details

The plugin transpiles the following JSX:

```jsx
<div id="foo">{this.text}</div>
```

To the following JavaScript:

```js
h(
  'div',
  {
    attrs: {
      id: 'foo',
    },
  },
  [this.text],
)
```

Note the `h` function, which is a shorthand for a Kdu instance's `$createElement` method, must be in the scope where the JSX is. Since this method is passed to component render functions as the first argument, in most cases you'd do this:

```js
Kdu.component('jsx-example', {
  render(h) {
    // <-- h must be in scope
    return <div id="foo">bar</div>
  },
})
```

### Difference from React JSX

First, Kdu 2.0's knode format is different from React's. The second argument to the `createElement` call is a "data object" that accepts nested objects. Each nested object will be then processed by corresponding modules:

```js
render (h) {
  return h('div', {
    // Component props
    props: {
      msg: 'hi'
    },
    // Normal HTML attributes
    attrs: {
      id: 'foo'
    },
    // DOM props
    domProps: {
      innerHTML: 'bar'
    },
    // Event handlers are nested under "on", though
    // modifiers such as in k-on:keyup.enter are not
    // supported. You'll have to manually check the
    // keyCode in the handler instead.
    on: {
      click: this.clickHandler
    },
    // For components only. Allows you to listen to
    // native events, rather than events emitted from
    // the component using vm.$emit.
    nativeOn: {
      click: this.nativeClickHandler
    },
    // Class is a special module, same API as `k-bind:class`
    class: {
      foo: true,
      bar: false
    },
    // Style is also same as `k-bind:style`
    style: {
      color: 'red',
      fontSize: '14px'
    },
    // Other special top-level properties
    key: 'key',
    ref: 'ref',
    // Assign the `ref` is used on elements/components with k-for
    refInFor: true,
    slot: 'slot'
  })
}
```

The equivalent of the above in Kdu 2.0 JSX is:

```jsx
render (h) {
  return (
    <div
      // Component props
      propsMsg="hi"
      // Normal attributes or component props.
      id="foo"
      // DOM properties are prefixed with `domProps`
      domPropsInnerHTML="bar"
      // event listeners are prefixed with `on` or `nativeOn`
      onClick={this.clickHandler}
      nativeOnClick={this.nativeClickHandler}
      // other special top-level properties
      class={{ foo: true, bar: false }}
      style={{ color: 'red', fontSize: '14px' }}
      key="key"
      ref="ref"
      // assign the `ref` is used on elements/components with k-for
      refInFor
      slot="slot">
    </div>
  )
}
```

### Component Tip

If a custom element starts with lowercase, it will be treated as a string id and used to lookup a registered component. If it starts with uppercase, it will be treated as an identifier, which allows you to do:

```js
import Todo from './Todo.js'

export default {
  render(h) {
    return <Todo /> // no need to register Todo via components option
  },
}
```

### JSX Spread

JSX spread is supported, and this plugin will intelligently merge nested data properties. For example:

```jsx
const data = {
  class: ['b', 'c'],
}
const knode = <div class="a" {...data} />
```

The merged data will be:

```js
{ class: ['a', 'b', 'c'] }
```

### Kdu directives

Kdu directives are usable the same way as in template with a few key differences:

1.  You can use directives camelCased instead of kebab-cased (kMyDirective is treated as `k-my-directive`)
2.  You have to use underscore sign instead of dots for modifiers because of JSXIdentifier limitation.
3.  Only runtime directives work (only k-show and custom directives), compile-time directives are out of this project's scope.

A full example would be: `<MyComponent kMyDirective:argument_modifier1_modifier2={someExpression} />`

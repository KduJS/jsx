# Babel Preset JSX

Configurable Babel preset to add Kdu JSX support. See the [configuration options here](./packages/babel-preset-jsx).

## Installation

Install the preset with:

```bash
npm install @kdujs/babel-preset-jsx @kdujs/babel-helper-kdu-jsx-merge-props
```

Then add the preset to `.babelrc`:

```json
{
  "presets": ["@kdujs/babel-preset-jsx"]
}
```

## Syntax

### Content

```jsx
render() {
  return <p>hello</p>
}
```

with dynamic content:

```jsx
render() {
  return <p>hello { this.message }</p>
}
```

when self-closing:

```jsx
render() {
  return <input />
}
```

with a component:

```jsx
import MyComponent from './my-component'

export default {
  render() {
    return <MyComponent>hello</MyComponent>
  }
}
```

### Attributes/Props

```jsx
render() {
  return <input type="email" />
}
```

with a dynamic binding:

```jsx
render() {
  return <input
    type="email"
    placeholder={this.placeholderText}
  />
}
```

with the spread operator (object needs to be compatible with [Kdu Data Object](https://kdujs-v2.web.app/v2/guide/render-function.html#The-Data-Object-In-Depth)):

```jsx
render() {
  const inputAttrs = {
    type: 'email',
    placeholder: 'Enter your email'
  }

  return <input {...{ attrs: inputAttrs }} />
}
```

### Slots

named slots:

```jsx
render() {
  return (
    <MyComponent>
      <header slot="header">header</header>
      <footer slot="footer">footer</footer>
    </MyComponent>
  )
}
```

scoped slots:

```jsx
render() {
  const scopedSlots = {
    header: () => <header>header</header>,
    footer: () => <footer>footer</footer>
  }

  return <MyComponent scopedSlots={scopedSlots} />
}
```

### Directives

```jsx
<input kModel="newTodoText" />
```

with a modifier:

```jsx
<input kModel_trim="newTodoText" />
```

with an argument:

```jsx
<input kOn:click="newTodoText" />
```

with an argument and modifiers:

```jsx
<input kOn:click_stop_prevent="newTodoText" />
```

k-html:

```jsx
<p domPropsInnerHTML={html} />
```

### Functional Components

Transpiles arrow functions that return JSX into functional components, when they are either default exports:

```jsx
export default ({ props }) => <p>hello { props.message }</p>
```

or PascalCase variable declarations:

```jsx
const HelloWorld = ({ props }) => <p>hello { props.message }</p>
```

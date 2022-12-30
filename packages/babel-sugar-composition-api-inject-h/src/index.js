import syntaxJsx from '@babel/plugin-syntax-jsx'

const importSource = '@kdujs/composition-api'

/**
 * Check if body contains JSX
 * @param t
 * @param path ObjectMethod | ClassMethod
 * @returns boolean
 */
const hasJSX = (t, path) => {
  const JSXChecker = {
    hasJSX: false,
  }
  path.traverse(
    {
      JSXElement() {
        this.hasJSX = true
      },
    },
    JSXChecker,
  )
  return JSXChecker.hasJSX
}

// remove `var h = this.$createElement;` in `setup()`
const remove$createElement = (t, path) => {
  path.traverse({
    ObjectMethod(p) {
      const isSetup = p.node.key.name === 'setup'
      if (!isSetup) return
      p.traverse({
        VariableDeclaration(varPath) {
          varPath.traverse({
            MemberExpression(p) {
              if (
                t.isThisExpression(p.node.object) &&
                t.isIdentifier(p.node.property) &&
                p.node.property.name === '$createElement'
              ) {
                varPath.remove()
              }
            },
          })
        },
      })
    },
  })
}

// auto import `h` from `@kdujs/composition-api`
const autoImportH = (t, path) => {
  if (hasJSX(t, path)) {
    const importNodes = path
      .get('body')
      .filter(p => p.isImportDeclaration())
      .map(p => p.node)
    const kcaImportNodes = importNodes.filter(p => p.source.value === importSource)
    const hasH = kcaImportNodes.some(p => p.specifiers.some(s => t.isImportSpecifier(s) && s.local.name === 'h'))
    if (!hasH) {
      const kcaImportSpecifier = t.importSpecifier(t.identifier('h'), t.identifier('h'))
      if (kcaImportNodes.length > 0) {
        kcaImportNodes[0].specifiers.push(kcaImportSpecifier)
      } else {
        path.unshiftContainer('body', t.importDeclaration([kcaImportSpecifier], t.stringLiteral(importSource)))
      }
    }
  }
}

export default babel => {
  const t = babel.types

  return {
    inherits: syntaxJsx,
    visitor: {
      Program(path) {
        remove$createElement(t, path)
        autoImportH(t, path)
      },
    },
  }
}

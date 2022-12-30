import syntaxJsx from '@babel/plugin-syntax-jsx'

const autoImportGetCurrentInstance = (t, path) => {
  const importSource = '@kdujs/composition-api'
  const importNodes = path
    .get('body')
    .filter(p => p.isImportDeclaration())
    .map(p => p.node)
  const kcaImportNodes = importNodes.filter(p => p.source.value === importSource)
  const hasH = kcaImportNodes.some(p =>
    p.specifiers.some(s => t.isImportSpecifier(s) && s.local.name === 'getCurrentInstance'),
  )
  if (!hasH) {
    const kcaImportSpecifier = t.importSpecifier(t.identifier('getCurrentInstance'), t.identifier('getCurrentInstance'))
    if (kcaImportNodes.length > 0) {
      kcaImportNodes[0].specifiers.push(kcaImportSpecifier)
    } else {
      path.unshiftContainer('body', t.importDeclaration([kcaImportSpecifier], t.stringLiteral(importSource)))
    }
  }
}

const injectInstanceId = '__currentInstance'

export default ({ types: t }) => {
  return {
    inherits: syntaxJsx,
    visitor: {
      Program(p) {
        p.traverse({
          'ObjectMethod|ObjectProperty'(path1) {
            if (path1.node.key.name !== 'setup') {
              return
            }

            let instanceInjected = false



            path1.traverse({
              JSXAttribute(path2) {
                const n = path2.get('name')
                const isInputOrModel = ['k-on', 'on-input', 'on-change', 'model'].includes(n.node.name)
                if (!isInputOrModel) return
                path2.traverse({
                  MemberExpression(path3) {
                    const obj = path3.get('object')
                    const prop = path3.get('property')
                    if (t.isThisExpression(obj) && t.isIdentifier(prop) && ['$', '_'].includes(prop.node.name[0])) {
                      autoImportGetCurrentInstance(t, p)
                      if (!instanceInjected) {
                        path1.node.value.body.body.unshift(
                          t.variableDeclaration('const', [
                            t.variableDeclarator(
                              t.identifier(injectInstanceId),
                              t.callExpression(t.identifier('getCurrentInstance'), []),
                            ),
                          ]),
                        )
                        instanceInjected = true
                      }
                      obj.replaceWith(t.identifier(injectInstanceId))
                    }
                  },
                })
              },
            })
          },
        })
      },
    },
  }
}

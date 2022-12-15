import babelPluginTransformKduJsx from '@kdujs/babel-plugin-transform-kdu-jsx'
import babelSugarFunctionalKdu from '@kdujs/babel-sugar-functional-kdu'
import babelSugarInjectH from '@kdujs/babel-sugar-inject-h'
import babelSugarKModel from '@kdujs/babel-sugar-k-model'
import babelSugarKOn from '@kdujs/babel-sugar-k-on'

export default (_, { functional = true, injectH = true, kModel = true, kOn = true } = {}) => {
  return {
    plugins: [
      functional && babelSugarFunctionalKdu,
      injectH && babelSugarInjectH,
      kModel && babelSugarKModel,
      kOn && babelSugarKOn,
      babelPluginTransformKduJsx,
    ].filter(Boolean),
  }
}

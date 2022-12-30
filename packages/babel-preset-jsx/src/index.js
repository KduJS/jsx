import babelPluginTransformKduJsx from '@kdujs/babel-plugin-transform-kdu-jsx'
import babelSugarFunctionalKdu from '@kdujs/babel-sugar-functional-kdu'
import babelSugarInjectH from '@kdujs/babel-sugar-inject-h'
import babelSugarCompositionApiInjectH from '@kdujs/babel-sugar-composition-api-inject-h'
import babelSugarCompositionApiRenderInstance from '@kdujs/babel-sugar-composition-api-render-instance'
import babelSugarKModel from '@kdujs/babel-sugar-k-model'
import babelSugarKOn from '@kdujs/babel-sugar-k-on'

export default (_, { functional = true, injectH = true, kModel = true, kOn = true, compositionAPI = false } = {}) => {
  return {
    plugins: [
      functional && babelSugarFunctionalKdu,
      injectH && (compositionAPI ? babelSugarCompositionApiInjectH : babelSugarInjectH),
      kModel && babelSugarKModel,
      kOn && babelSugarKOn,
      compositionAPI && babelSugarCompositionApiRenderInstance,
      babelPluginTransformKduJsx,
    ].filter(Boolean),
  }
}

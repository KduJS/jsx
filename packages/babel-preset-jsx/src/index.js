import babelPluginTransformKduJsx from '@kdujs/babel-plugin-transform-kdu-jsx'
import babelSugarFunctionalKdu from '@kdujs/babel-sugar-functional-kdu'
import babelSugarInjectH from '@kdujs/babel-sugar-inject-h'
import babelSugarCompositionApiInjectH from '@kdujs/babel-sugar-composition-api-inject-h'
import babelSugarCompositionApiRenderInstance from '@kdujs/babel-sugar-composition-api-render-instance'
import babelSugarKModel from '@kdujs/babel-sugar-k-model'
import babelSugarKOn from '@kdujs/babel-sugar-k-on'

export default (_, {
  functional = true,
  injectH = true,
  kModel = true,
  kOn = true,
  compositionAPI = false
} = {}) => {
  // compositionAPI: 'auto' | 'native' | 'plugin' | 'kdu-demi' | false | { importSource: string; }
  // legacy: compositionAPI: true (equivalent to 'auto')
  // bonus:  compositionAPI: 'naruto' (equivalent to 'native')
  let injectHPlugin = babelSugarInjectH
  let importSource = '@kdujs/composition-api'

  if (compositionAPI) {
    if (['native', 'naruto'].includes(compositionAPI)) {
      importSource = 'kdu'
    }

    if (compositionAPI === 'kdu-demi') {
      importSource = 'kdu-demi'
    }

    if (['auto', true].includes(compositionAPI)) {
      try {
        const kduVersion = require('kdu/package.json').version
        if (kduVersion.startsWith('2.7')) {
          importSource = 'kdu'
        }
      } catch (e) { }
    }

    if (typeof compositionAPI === 'object' && compositionAPI.importSource) {
      importSource = compositionAPI.importSource
    }

    injectHPlugin = [babelSugarCompositionApiInjectH, { importSource }]
  }

  return {
    plugins: [
      functional && babelSugarFunctionalKdu,
      injectH && injectHPlugin,
      kModel && babelSugarKModel,
      kOn && babelSugarKOn,
      compositionAPI && [babelSugarCompositionApiRenderInstance, { importSource }],
      babelPluginTransformKduJsx,
    ].filter(Boolean),
  }
}

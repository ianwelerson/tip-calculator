// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  pwa: {
    manifestOptions: {
      name: 'Tip Calculator',
      short_name: 'Tip Calculator',
      description: 'Tip Calculator',
      start_url: './',
      display: 'standalone',
      theme_color: '#26C0AB'
    },
    themeColor: '#26C0AB',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppCache: 'yes',
    appleMobileWebAppStatusBarStyle: 'black'
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/scss/variables.scss";'
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@storeModule': path.resolve(__dirname, 'src/store/modules'),
        '@type': path.resolve(__dirname, 'typescript/types.ts'),
        '@interface': path.resolve(__dirname, 'typescript/interfaces.ts')
      }
    }
  }
}

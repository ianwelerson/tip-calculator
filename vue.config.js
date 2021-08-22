// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
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
        '@storeModule': path.resolve(__dirname, 'src/store/modules')
      }
    }
  }
}

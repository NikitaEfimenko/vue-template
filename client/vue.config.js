// vue.config.js

const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
    devServer: {
        proxy: 'http://localhost:5000'
    },
  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin()
    ]
  },
}
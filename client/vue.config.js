const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  outputDir: path.resolve(__dirname, '../dist/public'),
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  },
  pages: {
    index: {
      entry: 'src/main.ts',
      title: 'Overwatch'
    }
  }
})

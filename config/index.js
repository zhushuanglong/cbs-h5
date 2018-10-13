// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'qiho-h5/cbs',
    // assetsPublicPath: '//yun.duiba.com.cn/',
    assetsPublicPath: '//yun.dui88.com/',
    productionSourceMap: false, // 设为true生成map可以作调试
    // productionGzip: false,
    // productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8881,
    autoOpenBrowser: true, // 自动打开浏览器
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/personal/*': {
        target: 'http://api.cucoe.net',
        changeOrigin: true,
        secure: false
      },
      '/users/*': {
        target: 'http://api.cucoe.net',
        changeOrigin: true,
        secure: false
      },
      '/coupon/*': {
        target: 'http://api.cucoe.net',
        changeOrigin: true,
        secure: false
      },
      '/orders/*': {
        target: 'http://api.cucoe.net',
        changeOrigin: true,
        secure: false
      },
      '/products/*': {
        target: 'http://api.cucoe.net',
        changeOrigin: true,
        secure: false
      },
      '/promotions/*': {
        target: 'http://api.cucoe.net',
        changeOrigin: true,
        secure: false
      },
      '/carts/*': {
        target: 'http://api.cucoe.net',
        changeOrigin: true,
        secure: false
      },
      '/address/*': {
        target: 'http://api.cucoe.net',
        changeOrigin: true,
        secure: false
      }
    },
    cssSourceMap: false,
  }
};


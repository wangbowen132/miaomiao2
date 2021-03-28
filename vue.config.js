module.exports = {
  publicPath: '/miaomiao/',
  devServer: {
    proxy: {
      "/ajax" : {
        target: 'https://m.maoyan.com',
        changeOrigin: true,
        pathRewrite: {
          "^/ajax": ""
        }
      },
      "/api2": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  }
}
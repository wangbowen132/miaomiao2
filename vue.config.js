module.exports = {
  devServer: {
    proxy: {
      "/ajax" : {
        target: 'https://m.maoyan.com',
        changeOrigin: true,
        pathRewrite: {
          "^/ajax": ""
        }
      },
      // "/rider": {
      //   target: 'https://pianku.api.mgtv.com',
      //   changeOrigin: true
      // },
      // '/location': {
      //   target: 'https://api.map.baidu.com/',
      //   changeOrigin: true
      // }
    }
  }
}
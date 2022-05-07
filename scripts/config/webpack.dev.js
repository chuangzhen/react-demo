const {
  merge
} = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')

const common = require('./webpack.common')
const {
  PROJECT_PATH,
  SERVER_HOST,
  SERVER_PORT
} = require('../constant')

module.exports = merge(common, {
  target:  'web' ,
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: 'boundle/[name].js',
    path: path.resolve(PROJECT_PATH, './dist'),
    // publicPath:'/',
  },

  devServer: {
    host: SERVER_HOST,
    port: SERVER_PORT,
    stats: 'errors-only',
    clientLogLevel: 'none',
    compress: true,
    open: true,
    hot: true,
    noInfo: true,
    inline:true,  //缺少该配置，会出现上面的错误
    historyApiFallback:true  //缺少该配置，会出现上面的错误,配置broswerRouter实现hashRouter的效果
  },
  plugins: [
    // 实际上只开启 hot：true 就会自动识别有无声明该插件，没有则自动引入，但是怕有隐藏问题这里还是手动加上了
    new webpack.HotModuleReplacementPlugin()
  ],
})
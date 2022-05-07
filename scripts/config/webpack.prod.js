const {
    merge
} = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common')
const MiniCssExtraPlu = require('mini-css-extra-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const {
    PROJECT_PATH
} = require('../constant')


module.exports = merge(common, {
    target: 'browserslist',
    mode: 'production',
    devtool: false,
    output: {
        filename: 'js/[name].[contentBash:8].js',
        path: path.resolve(PROJECT_PATH, './dist')
    },
    plugins: [
        new MiniCssExtraPlu({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].chunk.css'
        })
    ],
    // optimization：在 webpack4 之后添加了 optimization 属性，专门用于存放优化打包的配置，minimizer属性存放一个数组，
    // 里可以存放用于代码压缩的插件，minimize 置 true 表示启用 minimizer 配置
    optimization:{
        minimize:true,
        minimizer:[
            new CssMinimizerWebpackPlugin(),
            //去除console.log的代码
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                  compress: { pure_funcs: ['console.log'] },
                }
              })
        ]
    }
})
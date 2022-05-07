const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar')
const {
  PROJECT_PATH
} = require('../constant')
const MiniCssExtraPlu = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')


const isDevelopment = process.env.NODE_ENV == 'dev'
const isProduction = process.env.NODE_ENV == 'prod'

// 因为后续要配sass和less也需要使用到这套规则，所以这里抽离出来
const getCssLoaders = () => {
  const cssLoaders = [isDevelopment ? 'style-loader' : MiniCssExtraPlu.loader,
    {
      loader: 'css-loader',
      options: {
        modules: {
          //允许css的名称编译后成为xxx--zzz
          localIdentName: '[local]--[hash:base64:5]'
        },
        sourceMap: isDevelopment
      }

    },
    {
      loader: 'px2rem-loader',
      options: {
        remUnit: 100, ////// 对应比例，375px设计稿   100ox => 1rem
        remPrecision: 8 // 转换成rem时保留的小数位
      }
    }
  ]

  //  postcss-loader处理的是css 所有sass和less的loader要在postcss-loader之后
  isProduction && cssLoaders.push({
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: [
          isProduction && [
            'postcss-preset-env',
            {
              autoprefixer: {
                grid: true
              }

            }
          ]
        ]
      }
    }
  })


  return cssLoaders
}




module.exports = {
  entry: {
    app: path.resolve(PROJECT_PATH, './src/index.tsx')
  },
  plugins: [
    //获取跟文件index.html为模板
    new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_PATH, './public/index.html'),
    }),
    //打包进度条
    new WebpackBar({
      name: 'Link Starout!!',
      color: '#52c41a'
    }),
    //打包时校验ys
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(PROJECT_PATH, './tsconfig.json')
      }
    }),
    //清除上一次的打包数据
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [{
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css?$/,
        use: [
          ...getCssLoaders()
        ]
      },
      {
        test: /\.less$/,
        use: [
          ...getCssLoaders(),
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          ...getCssLoaders(),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
             //将公共文件缓存起来，提高多次编译的速度
          cacheDirectory: true,
            presets: [
              ['@babel/preset-react'],
              ['@babel/preset-env', { targets: "defaults" }]
            ],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },



    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".jsx"],
    alias: {
      'src': path.resolve(PROJECT_PATH, './src'),
      'components': path.resolve(PROJECT_PATH, './src/components'),
      'utils': path.resolve(PROJECT_PATH, './src/utils'),
    }
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
}
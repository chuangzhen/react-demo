//报错信息记录

## 一：报错信息 Error: Cannot find module 'webpack-cli/bin/config-yargs'
问题： webpack-cli 和 webpack-dev-server 会有版本兼容问题导致打包报错
解决：同一版本 如都用3.x版本


## 二：报错信息 TypeError: Cannot read property 'tap' of undefined
    at HtmlWebpackPlugin.apply (D:\demo\react-demo\node_modules\html-webpack-plugin\index.js:40:31)
问题：html-webpack-plugin 插件版本与webpack版本不兼容
解决：我的webpack版本是4.44.2   html-webpack-plugin版本是5.3.1，将html-webpack-plugin 的版本降低或者提高webpack的版本


## 三：报错信息 Error: TypeScript emitted no output for D:\demo\react-demo\src\index.tsx.
问题：webpack启动打包时，没有为tsx输出文件
解决：修改tsconfig.json文件："noEmit": false  // 不生成输出文件，改为false，则执行build时不会报错


## 四：报错信息 configuration.module.rules[1] has an unknown property 'text'. These properties are valid:
问题：一个module的loader中的test写错了，写成了text
解决：将错误写成text的loader改成test就好


## 五：报错 ：类型NodeModule上不存在属性hot
问题：react  js适配typescript的时候，webpack 的热替换找不到hot属性，安装@types/webpack-env解决
解决：@types/webpack-env：包含 webpack 的 api 声明文件 yarn add @types/webpack-env@1.16.0

## 六 报错：找不到模块“./index.scss”或其相应的类型声明。ts(2307)
问题:在组件内引入.scss  .less 等模块时，ts配置里边找不到模块
解决：在tsconfig.json中的include 增加 typing.d.ts全局声明文件，已经创建typing.d.ts 文件  
### 详情参考 https://juejin.cn/post/6844903560056930311

## 七 报错：D:\demo\react-demo\node_modules\fork-ts-checker-webpack-plugin\lib\index.js:124
            throw new Error('When you use this plugin you must install `typescript`.');
问题:安装打包时 增加ts类型检查插件失败
解决： yarn add fork-ts-checker-webpack-plugin@6.2.5 --dev 重新安装该插件


## 八 报错： 'cross-env' 不是内部或外部命令，也不是可运行的程序 或批处理文件。
问题：启动项目时找不到cross-env
解决：删除node_modules重新安装以来 yarn


## 九 热更新失效
解决：webpack 5 是默认支持热更新的，再webpack.config.js要配置 target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist'
    在package.json中的browserslist保留
    "browserslist": [
        "> 1%",
        "last 2 versions",
        "not ie <= 8"
    ]

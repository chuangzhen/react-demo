# 现已改用来写demo,练习react相关知识点


# [本项目参考配置过程主要连接] [https://blog.csdn.net/qq_39261142/article/details/116176902]
# 1 创建项目
npx  create-react-app my-app --template typescript

```
yarn  安装插件
yarn add react-router-dom @types/react-router-dom --dev
```


# 2firebase-google登录、facebook登录同理

1.在firebase控制台登录账号，添加firebase账户
2.获取像配置信息
3.初始化firebase  
4.唤起登录界面、弹窗


# 3.创建webpack相关配置
```
参考链接
https://blog.csdn.net/qq_39261142/article/details/116176902
```
## 3.1 yarn add cross-env@7.03 --dev  
        cross-env : 统一配置node环境变量

## 3.2 webpack基本配置所需的第三方包
webpack：用于编译 JavaScript 模块
webpack-cli：用于在命令行中运行 webpack
webpack-dev-serve：可以在本地起一个 http 服务，通过简单的配置还可指定其端口、热更新的开启等
webpack-merge：用于合并webpack公共配置
html-webpack-plugin：用于打包html文件
```
        yarn add webpack@5.28.0
        yarn add webpack-cli@4.5.0
        yarn add webpack-dev-server@3.11.2
        yarn add webpack-merge@5.7.3
        yarn add html-webpack-plugin@5.3.1
```

## 3.3 devServer的配置功能：
        devServer的配置功能如下：
        host：服务ip
        port：服务端口
        stats：设为errors-only表示终端只打印错误类型的日志，不会打印warning以及其他信息影响阅读
        compress：设为true表示启用gzip压缩，加快网站打开速度
        open：设为true表示第一次启动项目时自动打开默认浏览器
        hot：设为true表示启用服务热替换配置
        clientLogLevel：设为none表示去除多余网页console信息
        noInfo：设为true表示去除启动项目时显示的打包信息【减少大包时的信息，但是打包进度也没有了】
                【解决】：使用第三方包来展示打包进度条webpackbar:用于显示打包进度条，yarn add webpackbar@5.0.0-3


        hot开启的是热替换而非热更新，webpack默认支持热更新
        热更新：当文件有修改时，刷新浏览器页面
        热替换：当文件有修改时，不刷新浏览器页面
        什么时候使用热替换：更改css和局部js变动时导致整个页面刷新调试体验差，开启热替换后不会导致页面刷新也能更改页面数据，调试更快


# 4 webpack 实现热替换

        hot开启的是热替换而非热更新，webpack默认支持热更新
        热更新：当文件有修改时，刷新浏览器页面
        热替换：当文件有修改时，不刷新浏览器页面
        什么时候使用热替换：更改css和局部js变动时导致整个页面刷新调试体验差，开启热替换后不会导致页面刷新也能更改页面数据，调试更快

```
        // src/index.tsx

        if (module && module.hot) {
        module.hot.accept();
        }
        ...

        //报错 ：类型NodeModule上不存在属性hot
        解决：@types/webpack-env：包含 webpack 的 api 声明文件 yarn add @types/webpack-env@1.16.0


```


## 4.1webpack 打包时纯输出的文件名的哈希值的区别：
        output:{
        filename:'[name][contenthash:8].js',
                path:path.resolve(__dirname,'dist')
        }
        哈希值的区别：

        hash：每次修改任何一个文件，所有文件名的hash至都将改变，所以一旦修改了任何一个文件，整个项目的文件缓存都将失效

        chunkHash：根据chunk生成的hash值，如果打包来源于同一个chunk，那么hash值就一样，chunkHash不适用于同一chunk的文件，如一个js文件导入了一个css文件，他们属于同一个chunk，因此若只修改了js，最终打包出来的文件cs和js都会变成一个新的hash

        contenthash：根据文件内容生成hash值，不同文件的hash值一定不一样（只要文件内容不做修改，一定是同一个hash，有变动则会替换成另外的），这样就令浏览器只清楚掉变动文件的缓存（只有改动的文件重命名了）

## 4.2 清楚打包数据

        防止多次build导致文件积累
        clean-webpack-plugin : 清除上一次打包的dist目录，防止文件残留
        yarn add clean-webpack-plugin@4.0.0-alpha.0 --dev

        //webpack.common.js
        const CleanWebpackPlugin = require('clean-webpack-plugin')
        modules.export = {
                ...
                plugins:[
                        ...,
                        new CleanWebpackPlugin()
                ]
        }

## 4.3 缓存机制 提高二次编译速度 webpack5已内置该功能[参考][https://blog.csdn.net/Qianliwind/article/details/109390355]
        cache: {
                type: 'filesystem',
                buildDependencies: {
                config: [__filename],
                },
        },
cache.type：缓存类型，值为 memory 或 filesystem，分别代表基于内存的临时缓存，以及基于文件系统的持久化缓存

cache.buildDependencies：全局缓存失效的一种机制，配置 {config: [__filename]}，表示当配置文件内容或配置文件依赖的模块文件发生变化时，当前的构建缓存即失效`

# 5 配置css

        tyle-loader：将 js 文件中引入的 css 代码插入到 html 模板文件，使网页可以正常展示样式

        mini-css-extract-plugin：和 style-loader 功能一样，只是打包后会单独生成 css 文件而非直接写在 html 文件中，用于生产环境，开发环境不需要另外生成文件使用 style-loader 即可

        css-loader：令 js 可以通过 import 或者 require 等命令导入 css 代码

        yarn add style-loader@2.0.0
        yarn add css-loader@5.2.4
        yarn add mini-css-extract-plugin@1.4.0


        //webpack-common.js
        css-loader的options配置：

        modules：开启 css module，看个人习惯，如果不使用可以直接置值 false，否则影响打包速度，localIdentName 表示自定义类名，为了确保类名全局统一加上哈希值
        sourceMap：为 true 时会根据 devtool 映射css错误，生产环境不需要映射所有这里给的值是开发环境

## 5.1 兼容样式
        css的一些样式在不同浏览器内核中有不同的前缀写法，为了编写一套css打包时自动添加上所有的前缀，需要对webpack进行配置，下载第三方包：

        postcss-loader：与 sass/less 不同，不是预处理器，相当于一个工具箱，可以使用它配合插件去转换css

        postcss-preset-env：将最新的 css 语法转换为目标环境的浏览器能够理解的语法，不用考虑浏览器兼容问题，以前需要配合 autoprefixer 第三方包自动补全前缀，现在新版本已经内置autoprefixer功能了,开启自动添加前缀功能，有些功能是默认关闭的，如栅格样式一些浏览器不支持所以默认关闭了，这里手动打开
        ```
        yarn add postcss-loader@5.2.0
        yarn add postcss-preset-env@6.7.0
        ```
## 5.2 为了实现功能，还需要在 package.json 文件中配置 browserslist 属性

```
        {
        "browserslist": [
                ">0.2%",
                "not dead",
                "ie >= 9",
                "not op_mini all"
        ],
        } 
        >0.2%：兼容98%以上的主流浏览器

        not dead：不去兼容已经停用的浏览器

        ie >= 9：只兼容ie的9以上版本

        not op_mini all：不去兼容任何opera mini浏览器（主要原因已经停止更新很久并不再使用）
```

### 注意，这里有个天坑：配置 browserslist 字段会导致 webpack-dev-server 的热更新功能直接失效，为了避免这种情况需要给 webpack 配上 target 属性 【wepack5 未碰到，后续留意】
```
// scripts/config/webpack.dev.js

        module.exports = merge(common, {
                // ...other
        target: 'web',
        })


// scripts/config/webpack.prod.js

        module.exports = merge(common, {
                // ...other
        target: 'browserslist',
        })

```


### 预处理器   less  sass less-loader sass-loader node-loader
##  5.3 postcss-loader处理的是css 所以在webpack的modules中，要把postcss-loader放在less-loader等css预处理loader之前 

yarn add less@4.1.1 less-loader@8.1.1 node-sass@5.0.0 sass-loader@11.0.1 --dev
//或者
yarn add less@4.1.1
yarn add less-loader@8.1.1
yarn add node-sass@5.0.0
yarn add sass-loader@11.0.1
### 配置sass-loader 和less-loader


## 5.4 优化压缩css 
css-minimizer-webpack-plugin：压缩生产环境打包后的 css 文件

yarn add css-minimizer-webpack-plugin@2.0.0

 ### optimization：在 webpack4 之后添加了 optimization 属性，专门用于存放优化打包的配置，minimizer属性存放一个数组，里可以存放用于代码压缩的插件，minimize 置 true 表示启用 minimizer 配置
    //webpack.prod.js
    optimization:{
        minimize:true,
        minimizer:[
            new CssMinimizerWebpackPlugin()
        ]
    }



# 6.React 路由优化
## 6.1使用react-router-dom来配置路由
 ### 正常使用 HashRouter 只是在url上会多一个# ,HashRouter类似 html中的描点跳转，因此定位始终在index.html上，但这样浏览器的url上回读一个#

 ### 使用BroswerRouter  ，匹配/之外的路由时，浏览器会报404找不到资源的错误
   #### 【原因：react服务单页面应用，使用BroswerRouter模式会向浏览器请求指定路由的资源，如/login会请求服务端的/login的html资源，但服务端没有该资源，因此返回404】
   #### webpack的解决思路：如果匹配不到对应路由，都返回index.html,再通过js（react-router）来控制显示哪个页面组件，这样就相当于无论请求什么路由资源，都是返回单页面应用的模板index.html的资源
   需要同时配置 output.publicPath 和 devServer.historyApiFallback.index 属性才可以生效
```
   // scripts/config/webpack.dev.js
        方法一：未生效
        {
        output: {
                path: path.resolve(PROJECT_PATH, './dist'),
                publicPath: '/',
        },
        devServer: {
                historyApiFallback: {
                        index: path.join(PROJECT_PATH, './public/index.html')
                },
        }
        *** 方法二：【生效】
        output: {
                path: path.resolve(PROJECT_PATH, './dist'),
                publicPath: '/',
        },
        devServer：{
                inline:true,  //缺少该配置，会出现上面的错误
                historyApiFallback:true  //缺少该配置，会出现上面的错误
        }

        output.publicPath：[可参考] [https://blog.csdn.net/lhjuejiang/article/details/80243975]

        historyApiFallback.index：当路由与真实文件不匹配时，webpack-dev-server 使用指定文件渲染而非 404 错误
```

# 7.配置JS
## 7.1 兼容es6+
        babel-loader：用于处理 ES6+ 语法，将其编译为浏览器可以执行的 js

        @babel/core：babel 所需依赖

        @babel/preset-env：是一组ES6转译的plugins，会根据设置的目标浏览器环境（browserslist），选择该环境不支持的新特性进行转译，这样就减少了不必要转译，增快打包速度

        @babel/plugin-transform-runtime：提供 ES6+ 的 api，如 es6 新的数组方法等，和 @babel/polyfill 不同的是该包可以实现按需加载，不会全部引入影响打包速度，需要依赖 runtime-corejs 【源码解析】

        @babel/runtime-corejs3：相当于 @babel/polyfill 的功能，在 7.4.0 版本后的 babel 使用 runtime-core 代替了 babel/polyfill
        
        Babel默认只转换新的 js 语法，而不转换新的API，如 Iterator、Generator、Set、Maps、Proxy、 Reflect、Symbol、Promise 等全局对象，以及一些在全局对象上的方法如 Object.assign都不会转码（如ES6在 Array 对象上新增了 Array.form 方法，Babel就不会转码这个方法，如果想让这个方法运行，必须使用babel-polyfill 、babel-runtime 、plugin-transform-runtime 等插件来转换）
        
        yarn add babel-loader@8.2.2  --dev
        yarn add @babel/core@7.13.16 --dev
        yarn add @babel/preset-env@7.13.15 --dev
        yarn add @babel/plugin-transform-runtime@7.13.15 --dev
        yarn add @babel/runtime-corejs3@7.13.17 --dev
        yarn add @babel/preset-react --dev


        presets：是一组Plugins的集合，告诉babel要转换的源码使用了哪些新的语法特性，这样可以省略写多个 plugins

        @babel/preset-env 配置：
             modules：将 ES6+ 模块语法转换为另一种类型，默认 auto，为了防止babel 将任何模块类型都转译成CommonJS类型，导致 tree-shaking 失效问题这里关掉
        @babel/plugin-transform-runtime 配置：
             corejs：依赖包 runtime-corejs 的相关信息，这里使用的是 runtime-corejs3 所以版本信息 version 填3，proposals 默认 false，3版本可以选择开启，开启后代理不会污染全局变量


```
weback common.js新增
modules：{
        rules:[
                {
                        test: /\.(tsx|js)$/,
                        loader: 'babel-loader',
                        options: {
                                //将公共文件缓存起来，提高多次编译的速度
                                cacheDirectory: true
                                },
                        //忽略node_modules目录的文件
                        exclude: /node_modules/
                }
        ]
}

```
        cacheDirectory：babel-loader 在执行的时候，可能会产生一些运行期间重复的公共文件，造成代码体积大冗余，同时也会减慢编译效率，所以开启该配置将这些公共文件缓存起来，下次编译就会加快很多

        exclude：第三方包不需要进行转译，排除后可加快打包速度


# 8 9 支持react  和  ts的时候，使用npx ceate-react-app my-app --template typescript 会自动支持
# 8 支持React  
        react：react核心依赖

        react-dom：负责处理web端的dom的渲染

        @types/react ：react 类型声明文件，用于 tsx

        @types/react-dom：react-dom 类型声明文件，用于 tsx

        @babel/preset-react ：用于让 babel 可以转译 jsx 语法

        arn add react@17.0.2
        yarn add react-dom@17.0.2
        yarn add @types/react@17.0.3
        yarn add @types/react-dom@17.0.3
        yarn add @babel/preset-react@7.13.13

##  跟babel相关的配置
// .babelrc
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false
      }
    ],
    "@babel/preset-react"
  ],
  ...
}

### 注意 presets 的处理顺序是数组由末到前，因此需要把 @babel/preset-react 配在 @babel/preset-env 后面，表示先将 jsx 处理成 ES6+js ，然后再将 ES6+js 处理成目标浏览器能识别的 js 代码块的意思

# 9.支持Typescripts
        typescript：支持 ts
        @babel/preset-typescript：处理ts文件，原理是去掉ts的类型声明，然后再用其他 babel 插件进行编译

        yarn add typescript@4.2.4
        yarn add @babel/preset-typescript@7.13.0

## 9.1 需要使用 ts 时，需要在项目的根目录下配置 tsconfig.json ，因此新建该文件并配置（也可以通过 npx tsc --init 生成
```
{
  "compilerOptions": {
    // 基本配置
    "target": "ES5",                          // 编译成哪个版本的 es
    "module": "ESNext",                       // 指定生成哪个模块系统代码
    "lib": ["dom", "dom.iterable", "esnext"], // 编译过程中需要引入的库文件的列表
    "allowJs": true,                          // 允许编译 js 文件
    "jsx": "react",                           // 在 .tsx 文件里支持 JSX
    "isolatedModules": true,				  // 提供额外的一些语法检查，如文件没有模块导出会报错
    "strict": true,                           // 启用所有严格类型检查选项

    // 模块解析选项
    "moduleResolution": "node",               // 指定模块解析策略
    "esModuleInterop": true,                  // 支持 CommonJS 和 ES 模块之间的互操作性
    "resolveJsonModule": true,                // 支持导入 json 模块
    "baseUrl": "./",                          // 根路径
    "paths": {								  // 路径映射，与 baseUrl 关联
      "src/*": ["src/*"],
      "components/*": ["src/components/*"],
      "utils/*": ["src/utils/*"]
    },

    // 实验性选项
    "experimentalDecorators": true,           // 启用实验性的ES装饰器
    "emitDecoratorMetadata": true,            // 给源码里的装饰器声明加上设计类型元数据

    // 其他选项
    "forceConsistentCasingInFileNames": true, // 禁止对同一个文件的不一致的引用
    "skipLibCheck": true,                     // 忽略所有的声明文件（ *.d.ts）的类型检查
    "allowSyntheticDefaultImports": true,     // 允许从没有设置默认导出的模块中默认导入
    "noEmit": true							  // 只想使用tsc的类型检查作为函数时（当其他工具（例如Babel实际编译）时）使用它
  },
  "exclude": ["node_modules"]
}
```
### baseUrl 和 paths 需要配合 webpack 的 resolve.alias 属性使用，且两者配置要统一，实际上只在 webpack 这里配就可以完成映射关系，但是在 tsconfig.json 也配上的话可以添加代码智能提示
        resolve：配置webpack如何寻找模块对应的文件 【resolve配置字段信息】

        alias：配置项通过别名来把原来导入路径映射成一个新的导入路径

## 9.2 优化  
###  在导入文件的时候，不需要写后缀.tsx  jsx 等等
        // scripts/config/webpack.common.js
        module.exports = {
        // other...
        resolve: {
                extensions: ['.tsx', '.ts', '.js', '.json'],
        },
        }
#### extensions：在导入语句没带文件后缀时，webpack会自动带上后缀去尝试访问文件是否存在，extensions用于配置在尝试过程中用到的后缀列表，webpack 会按照定义的后缀名的顺序依次处理文件，在配置时尽量把最常用到的后缀放到最前面，可以缩短查找时间


## 9.3 js压缩
        terser-webpack-plugin：用去去除生产环境的无用js代码，webpack5 之后自带，不需要另行安装，直接引入使用即可

        ```
        // scripts/config/webpack.prod.js
        const TerserPlugin = require("terser-webpack-plugin")

        module.exports = merge(common, {
        optimization: {
        minimize: true,
        minimizer:[
        new TerserPlugin({
                //false去除所有的注释
                extractComments: false,
                terserOptions: {
                //pure_func是去除函数，将所有的console.log去除
                compress: { pure_funcs: ['console.log'] },
                }
        }),
        ]
        }
        })
        ```
## 9.4 打包类型检查
目前 webpack 打包时不会有类型检查信息（为了编译速度，babel 编译 ts 时直接将类型去除，并不会对 ts 的类型做检查），即使类型不正确终端也会显示打包成功，有误导性，为此添加上打包类型检查，下载第三方包

fork-ts-checker-webpack-plugin：ts 类型检查，让终端可以显示类型错误

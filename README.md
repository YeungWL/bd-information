## 项目配置说明
### 运行这个项目必须要求（否则报错）：  
* 安装node且版本大等于4.0.0
* npm 版本大等于3.0.0
### 项目开发环境运行说明
* 在根目录下使用命令行运行npm run dev
* 执行这段命令实际会使用node执行build/dev-server.js文件，文件主要完成下面几件事情
```
    1.检查node和npm的版本
    2.引入相关插件和配置
    3.创建express服务器和webpack编译器
    4.配置开发中间件（webpack-dev-middleware）和热重载中间件（webpack-hot-middleware）
    5.挂载代理服务和中间件
    6.配置静态资源
    7.启动服务器监听特定端口（8080）
    8.自动打开浏览器并打开特定网址（localhost:8080）
```
具体执行步骤可以具体看一下dev-server这个文件，文件里面已经一一注释。
### 项目生产环境打包说明
* 在根目录下使用命令行运行npm run build
* 执行这段命令实际会使用node执行build/build.js文件，文件主要完成下面几件事情
```
    1.loading动画
    2.删除创建目标文件夹
    3.webpack编译
    4.输出webpack编译后的文件
```
具体执行步骤可以具体看一下build/build.js这个文件，文件里面已经一一注释。
### 项目目录结构说明
#### 1. 打包配置文件表在build文件夹和config文件夹
#### 2. 主要开发目录在src文件夹下
#### 3. src文件夹结构说明
* **assets文件夹** => 静态资源目录
* **api文件夹** => 接口文档目录
* **component文件夹** => vue组件目录
* **router文件夹** => 路由配置目录
* **js文件夹** => js脚本目录
* **stores文件夹** => vuex文件目录
* **style文件夹** => 样式表目录
* **app.vue文件** => App.vue是我们的主组件,所有页面都在App.vue下进行切换
* **main.js文件** => main.js 是我们的入口文件，主要作用是初始化vue实例并使用需要的插件


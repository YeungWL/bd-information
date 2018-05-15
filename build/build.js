// 检查NodeJS和npm的版本
require('./check-versions')()
//声明当前环境为生产环境
process.env.NODE_ENV = 'production'
//loading插件
var ora = require('ora')
//删除文件夹的插件
var rm = require('rimraf')
//路径插件
var path = require('path')
// 用于在控制台输出带颜色字体的插件
var chalk = require('chalk')
//引入webpack
var webpack = require('webpack')
//引入配置表
var config = require('../config')
//引入生产环境配置
var webpackConfig = require('./webpack.prod.conf')
//开启loading动画
var spinner = ora('building for production...')
spinner.start()
//每次build都删除一次dist
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  // webpack编译
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    // 没有出错则输出相关信息
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})

var path = require('path')
const net=require('net')

var express = require('express')
var webpack = require('webpack')
var webpackConfig = require('../webpack.dev.config.js')
// import portIsOccupied from './portIsOccupied.js';
var portIsOccupied = require('./portIsOccupied.js')

var app = express()
var port=30000
// 加载webpack配置
var compiler = webpack(webpackConfig)
// 加载中间件webpack-dev-middleware
// 1. 监听资源变更，自动打包 2. 快速编译，资源走内存，不读硬盘 3.返回中间件
app.use(require('webpack-dev-middleware')(compiler, {
  // 不打印多余信息
  noInfo: true,
  // 监听目录
  publicPath: webpackConfig.output.publicPath,
  // 控制台打包彩色
  stats: {
    colors: true
  },
  lazy: false,
  watchOptions: {
      aggregateTimeout: 300,
      poll: true
  }
}))
// 加载中间件webpack-hot-middleware
// 热加载，实时更新改变
app.use(require('webpack-hot-middleware')(compiler,{
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFallback: true
 }))

// 监听3000端口，开启服务
app.listen(port, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
    return console.log(err);
  }
  console.log('Listening at http://localhost:' + port +'\n')
});

// var __port = port
// server(port)
// portIsOccupied(30006,(isOccupied,port)=>{
//   console.log(isOccupied,port)
// })
// 检测port是否被占用 并启动服务
// function server (port=8080){
//     // console.log('> Listening at http://localhost:' + port+ '\n')
//     portIsOccupied(port,(isOccupied,port)=>{
//       console.log(isOccupied,port)
//       if(!isOccupied){
//         console.log(`port:${port} is occupied! \ntry listen port:${port+1}!`)
//         server(port+1)
//       }else{
//         console.log('> Starting dev server...')
//         app.listen(port, 'localhost', function (err, result) {
//           if (err) {
//             console.log(err);
//             return console.log(err);
//           }
//           console.log('> Listening at http://localhost:' + port)
//         });
//       }
//     })
// }

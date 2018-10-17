const path = require('path');
var webpack = require('webpack')
var merge = require('webpack-merge')
const htmlWebpackPlugin = require('html-webpack-plugin');

var baseWebpackConfig = require('./webpack.base.config.js')
module.exports = merge(baseWebpackConfig,{
    mode:"none",
    entry:[
        'webpack-hot-middleware/client?reload=true',
        'webpack/hot/only-dev-server',
        "./src/app.js",
    ], 
    output: {
        path: path.resolve(__dirname, "dist"), // string
        filename:'js/[name].[hash].js', // string    // 「入口分块(entry chunk)」的文件名模板（出口分块？）
        publicPath: "/", // string    // 输出解析文件的目录，url 相对于 HTML 页面
    },
    resolve: {
        alias: {
        
        },
    },
    devtool: "source-map", // enum  // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
    context: __dirname, // string（绝对路径！）
    stats: "errors-only",  // 精确控制要显示的 bundle 信息
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            // inject:'body',
            title: 'webpack so good',//支持ejs语法
            minify:{
                // collapseWhitespace:true,
                //去空格collapseWhitespace
                // removeComments:true,
                //去除注释 removeComments
            },
        
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9003,
        // noInfo: true
      }
})
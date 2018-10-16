const path = require('path');
var webpack = require('webpack')
var merge = require('webpack-merge')
const htmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin')

var baseWebpackConfig = require('./webpack.base.config.js')
module.exports = merge(baseWebpackConfig,{
    mode:"none",
    entry:{
        app:"./src/app.js",
        vendors: ['react', 'react-dom','react-router-dom']
    }, // string | object | array  // 这里应用程序开始执行

  // webpack 开始打包

    output: {
        path: path.resolve(__dirname, "dist"), // string
        filename:'js/[name].[chunkhash].js', // string    // 「入口分块(entry chunk)」的文件名模板（出口分块？）
        publicPath: "/", // string    // 输出解析文件的目录，url 相对于 HTML 页面
        chunkFilename: "js/[name].[chunkhash].js",
    },
    context: __dirname, // string（绝对路径！）
    stats: "errors-only",  // 精确控制要显示的 bundle 信息
    optimization:{
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "vendors",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    plugins: [
        //打包前清除
        new CleanWebpackPlugin(['dist']),
       
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
        //压缩
        new UglifyJsPlugin()
    ],
})
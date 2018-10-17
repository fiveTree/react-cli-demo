const path = require('path');
var webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin')
var autoprefixer =require('autoprefixer');
const postcssOptions = {
    // Necessary for external CSS imports to work
    // https://github.com/facebookincubator/create-react-app/issues/2677
    ident: 'postcss',
    plugins: () => [
    //   require('postcss-flexbugs-fixes'), // eslint-disable-line
      autoprefixer({
        // flexbox: 'no-2009',
        browsers:[
            '>1%',
            'last 4 versions',
            'Firefox ESR',
            'not ie < 9', // React doesn't support IE8 anyway
          ]
      }),
    ],
  };

module.exports = {
    mode:"none",
    // output: {
    //     path: path.resolve(__dirname, "dist"), // string
    //     filename:'js/[name].[chunkhash].js', // string    // 「入口分块(entry chunk)」的文件名模板（出口分块？）
    //     publicPath: "/", // string    // 输出解析文件的目录，url 相对于 HTML 页面
    //     chunkFilename: "js/[name].[chunkhash].js",
    // },
    module: {
        rules: [
        {
            test: /\.jsx|\.js$/,
            include: path.resolve(__dirname, "./src") ,
            exclude: /node_modules/, 
            loader: "babel-loader",
        },
        {
            test: /\.css$/,
            include: path.resolve(__dirname, "./src") ,
            use: ["style-loader", "css-loader", {
                loader:'postcss-loader',
                options:postcssOptions
            }]
        },
        {
            test: /\.scss$/,
            include: path.resolve(__dirname, "./src") ,
            use: ['style-loader','css-loader',{
                loader:'postcss-loader',
                options:postcssOptions
            },'sass-loader']
        },
        {
            test: /\.less$/,
            include:path.resolve(__dirname,"src"),
            use: [
                 "style-loader", // creates style nodes from JS strings
                 "css-loader" ,{
                    loader:'postcss-loader',
                    options:postcssOptions
                },
                 {
                    loader: "less-loader", // compiles Less to CSS
                }]
            },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader',
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }]
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: ['file-loader']
        }],

    },

    resolve: {
        alias: {
        
        },
    },
    // devtool: "source-map", // enum  // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
    context: __dirname, // string（绝对路径！）
    stats: "errors-only",  // 精确控制要显示的 bundle 信息
}
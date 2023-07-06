const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');

//首页界面
const htmlPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "./src/index.html"),
    filename: 'index.html'
})

//webpack基本配置
module.exports = {
    entry: './src/index.js',//入口文件路径
    output: {
        filename: '[name][chunkhash:8].js',//出口文件名
        path: path.resolve(__dirname, 'build'),//输出目录路径
        chunkFilename: '[name][chunkhash:8]'
    },

    //babel对高级js语法的解析
    module:{
        rules:[
            {
            test:/\.js$/,
            exclude:/node_modules/,
            use:[
                {
                    loader:"babel-loader",
                    options:{
                        "presets":["@babel/preset-env"]
                    }
                }
                
            ]
            }
        ]
    },

//css打包资源处理以及postcss对精灵图的处理
    module:{
        rules:[
            {
            test:/\.less$/,
            use:[
                'style-loader','css-loader','less-loader'
            ]
            },{
                test:/\.css$/,
                use:[
                    {loader:MiniCssExtractPlugin.loader},
                    'css-loader','postcss-loader'
                ]
            },{
                test:/\.(jpg|gif|png)$/,
                loader:'url-loader',
                options:{
                    limit:10*1024
                }
            
            }
        ]
    },

    //hash值
    output: {
        filename: "[name][chunkhash:8].js",//出口文件名
        path:path .resolve(__dirname, 'build'),//输出目录路径
        chunkFilename:"[name][chunkhash:8].js"
    },

    mode: 'development',//开发模式，可以是 'development'（不会压缩） 或 'production'(会压缩)

    plugins: [
        htmlPlugin,
        new MiniCssExtractPlugin({
            filename: '[name].css', //filename 选项指定了生成的 CSS 文件的命名规则
        }),
        new CleanWebpackPlugin(), //插件用于在每次构建前清理指定目录下的文件，以确保每次构建都是从一个干净的状态开始
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, 'src/images/icons'),
                glob: '*.png',
            },
            target: {
                image: path.resolve(__dirname,'src/images/icons/icon.png'),
                css: path.resolve(__dirname, 'src/css/icon.css'),
            },
            apiOptions: {  //apiOptions 配置项用于指定生成的 CSS 文件中引用大图的路径
                cssImageRef: './icon.png',
            },
        }),
    ]
}


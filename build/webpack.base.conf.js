// 最基础的打包配置，是开发环境和生产环境都要用到的配置
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');//第三方库单独打包
const webpack = require('webpack');

module.exports = {
    entry: {
      bundle: path.resolve(__dirname, '../src/index.js')
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].[hash].js'
    },
    resolve: {
        extensions: ['*', '.js', '.json', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src'),
        },
    },
    module: {
      rules: [
        {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
              'file-loader'
            ]
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
              'file-loader'
            ]
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        {
            test: /\.css$/,
            use: ['vue-style-loader', 'css-loader']
        },
        {
            test: /\.css$/,
            use: ['vue-style-loader', 'css-loader', 'postcss-loader']
        },
        {
            test: /\.styl(us)$/,
            use: ['vue-style-loader', 'css-loader', 'stylus-loader', 'postcss-loader']
        }                                           
      ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html')
        }),
        new VueLoaderPlugin(),
        new AutoDllPlugin({
            inject: true, // will inject the DLL bundle to index.html  inject 为 true，插件会自动把打包出来的第三方库文件插入到 HTML
            debug: true,
            //filename 是打包后文件的名称
            filename: '[name]_[hash].js',
            //path 是打包后的路径
            path: './js',
            //entry 是入口
            entry: {
            //vendor 是你指定的名称 数组内容就是要打包的第三方库的名称，不要写全路径，Webpack 会自动去 node_modules 中找到的
            vendor: ['vue', 'vue-router', 'vuex']
            }
        }),
        //提取共同代码
        //使用 splitChucksPlugin 插件，这是 Webpack 自带的，不用安装第三方依赖
        new webpack.optimize.SplitChunksPlugin(),
    ]
  };
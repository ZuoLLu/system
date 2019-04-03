// 生产环境要使用的配置了
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const baseConfig = require('./webpack.base.conf');
//抽取 CSS 到单文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: []
  },
  plugins: [
    new CleanWebpackPlugin(),
     //抽取 CSS 到单文件
     new MiniCssExtractPlugin({
        filename: "./css/[name].css",
        chunkFilename: "[id].css"
    })//然后当你要抽取 CSS 的时候（比如生产环境打包），你就把原来配置文件中的所有 vue-style-loader 替换为 MiniCssExtractPlugin.loader，其他的什么 css-loader、stylus-loader 等等都不要动。
  ]
});

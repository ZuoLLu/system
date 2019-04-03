// 开发环境要使用的配置
const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base.conf');
const webpack = require('webpack');

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        host: 'localhost',
        port: 5050,
        open: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
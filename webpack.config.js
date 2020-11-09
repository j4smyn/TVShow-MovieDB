const NODE_ENV = process.env.NODE_ENV || 'dev';
const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
});
let plugins = [
    HTMLWebpackPluginConfig
];

module.exports = {
    entry: {
        main: ['./app/js/index.js']
    },
    output: {
        path: path.join('./bin'),
        filename: (NODE_ENV === 'production' ? 'app.bundle.min.js' : 'app.bundle.js')
    },
    watch: (NODE_ENV === 'dev'),
    watchOptions: {
        aggregateTimeout: 90
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel-loader']
            },
            {
                test: /\.css$/, loader: "style!css"
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader?sourceMap']
            },
        ]
    },
    plugins
};

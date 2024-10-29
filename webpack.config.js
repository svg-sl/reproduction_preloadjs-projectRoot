const path = require('path');
const glob = require('glob')
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: glob.sync('./src/**/*.js').map(filePath => './' + filePath),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
    },
    target: 'node',
    devtool: 'source-map',
    module: {
        rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              enforce: "pre",
              use: [
                "babel-loader"
              ]
            },
        ]
    }
};
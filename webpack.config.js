//require node module path
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//define our entry file and output path where we want the bundle file to be in
module.exports = {
    entry: ['./src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },

    devtool: 'source-map',


    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],

    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }


            },

            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']

            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [{
                    loader: 'file-loader',
                }, ]

            }

        ]
    }



}
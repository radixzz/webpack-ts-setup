var webpack = require( 'webpack' );
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    watch: true,
    entry: { 
        'app': './app/scripts/main.ts',
        'vendor': [ "pixi.js", "underscore", "tweenkey", "algorithms" ]
    },
    output: {
        path: './build',
        filename: 'js/[name].js'
    },
    module: {
        loaders:[
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader") },
            { test: /\.ts$/, loader: 'ts-loader' },
            { test: /\.pug$/, loader: 'pug-loader' },
        ]
    },
    plugins: [
        new ExtractTextPlugin( "css/[name].css" ),
        new CopyWebpackPlugin([
            {
                from: './app/assets'
            }
        ]),
        new webpack.optimize.CommonsChunkPlugin({
            names: [ "vendor" ],
            filename: "js/[name].js"
        }),
        new HtmlWebpackPlugin({
            title: 'Wepack Experiment Template',
            template: './app/views/index.pug',
            inject: 'body'
        })
    ],
    devServer: {
        inline: true,
        compress: true
    },
    resolve: {
        extensions: [ "", ".webpack.js", ".web.js", ".ts", ".js" ]
    }
}
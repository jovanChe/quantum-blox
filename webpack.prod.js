const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

//Use text extraction plugin to get all the css in separate file
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//To gzip stuff
var CompressionPlugin = require("compression-webpack-plugin");


module.exports = {
    context: __dirname + "/",
    //Since key is used as a name of a file, I use it to add multiple output points by joining path and
    //concatinating with name that includes new path (pushing it all to public/js, but sorting into static and app folders
    entry: {
        "main": "./ui/main.js"
    },
    output: {
        path: path.join(__dirname, 'static/js'),
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
        // Babel loader with added react preset, react 0.14+ and babel 6+ wont work together w/o this
        {
            test:/\.(js|jsx)?$/,
            loader: "babel",
            exclude: /node_modules/,
            query: {
                presets:['react', 'es2015']
            }
        },
        {
            test:/\.json$/,
            loader: "json-loader"
        },
        // Post-css loader setup, to be able to bundle all the code for the components together
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader',
                'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&minimize' + JSON.stringify({discardComments: {removeAll: true}}) + '!postcss-loader')
        },
        {
            test: /\.(png|jpg)?$/,
            loader: 'url',
            query: {
                limit: 25000,
                name: "../images/[hash].[ext]"
            }
        },
        {
            test: /\.svg$/,
            loader: 'file-loader',
            query: {
                limit: 25000,
                name: "../images/[hash].[ext]"
            }
        }
    ]
    },
    // Order of postcss transforms is important
    // since they are executed in sequence
    postcss: function(webpack) {
        return [
            require('lost'),
            // This adds all @import files to the watchlist of webpack
            // https://github.com/postcss/postcss-loader#integration-with-postcss-import
            require('postcss-import')({
                addDependencyTo: webpack,
                path: ['./ui/general-styles/', './ui/']
            }),
            require('postcss-custom-properties'),
            require('autoprefixer'),
            require('postcss-mixins'),
            require('postcss-nested'),
            require('postcss-custom-media')
            // TODO: px to rem
        ];
    },
    // devtool: "#inline-source-map",
    plugins: [
        // Plugin for writing css bundle loaded in components
        new ExtractTextPlugin('../css/style.css', { allChunks: true }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            output:{
                comments: false
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            // This is way to set or create global variables...
            // Will use it to check if React is rendered on server or on client side (in webpack or node)
            // APP_ENV does not need to be in process.env
            // NODE_ENV needs to be set to production in prod since lots of stuff, including React use it to optimize prod
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                APP_ENV: JSON.stringify('browser')
            }
        }),
        //
        // You can use compression plugin to gzip resources
        // but you have to set http headers showing that content is gzipped
        // and that it i javascript
        //
        // Content-Encoding:gzip
        // Type:application/javascript
        // 
        
        // new CompressionPlugin({
        //     asset: "[path].gz[query]",
        //     algorithm: "gzip",
        //     test: /\.js$/,
        //     threshold: 10240,
        //     minRatio: 0.8
        // })
    ]
};

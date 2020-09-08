const path = require("path");
const webpack = require('webpack')
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const common = require("./webpack.common");

module.exports = merge(common, {
    mode: "development",
    devServer: {
        port: 3000,
        overlay: true,
        open: true
    },
    devtool: 'cheap-module-eval-source-map',
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    }
})
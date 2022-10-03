const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const modeConfiguration = env => require(`./webpackMods/webpack.${env}.config.js`)(env);

module.exports = ({ mode } = { mode: 'production' }) => {
    console.log(`${mode} mode is running`);

    return merge({
        mode,
        entry: './src/index.js',
        devServer: {
            open: true
        },
        output: {
            publicPath: '/',
            path: path.resolve(__dirname, 'build'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.sa?css$/,
                    use: [
                        "style-loader", 
                        { 
                            loader  : 'css-loader',
                            options : {
                                modules : true
                            } 
                        }, 
                        "sass-loader"
                    ]
                },
                {
                    test    : /\.(otf|eot|ttf|ttc|woff|jpe?g|png|gif)$/,
                    exclude : /node_modules/,
                    use: ["url-loader", "file-loader"]
                },
                {
                    test: /\.svg$/i,
                    issuer: /\.[jt]sx?$/,
                    use: ['@svgr/webpack'],
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                favicon: "./public/favicon.ico",
                manifest: "./public/manifest.json",
                template : './public/index.html'
            })
        ]
    },
    modeConfiguration(mode))
}
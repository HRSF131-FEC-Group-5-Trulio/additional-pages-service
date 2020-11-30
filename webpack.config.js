const path = require('path');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    plugins: [new CompressionPlugin()],
    entry: './client/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public')
    },
    module: {
      rules: [{
       loader: 'babel-loader',
       test: /\.js$/,
       exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true
              }
            }
          ]
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
              },
            },
          ],
        }
      ]
     },
     mode: 'production',
    devServer: {
      contentBase: path.join(__dirname, 'public')
     }
};
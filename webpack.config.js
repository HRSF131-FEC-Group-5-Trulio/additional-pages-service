const path = require('path');
module.exports = {
    entry: './client/app.js',
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
        }
      ]
     },
     mode: 'development',
    devServer: {
      contentBase: path.join(__dirname, 'public')
     }
};
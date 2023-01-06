const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './client/src/index.js',

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: './client/public', //when bundled and deployed --> serves bundled js file
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s?css/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },

  devServer: {
    port: 8080,
    hot: true,
    host: 'localhost',
    historyApiFallback: true,
    proxy: {
      // /** is any characters after the intial root route
      '/**': {
        target: 'http://localhost:3005',
      },
      // '/users': {
      //   target: 'http://localhost:3005',
      // },
    },
  },
};

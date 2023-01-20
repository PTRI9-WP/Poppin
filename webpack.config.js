const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './client/src/index.js',
  //allows 'import dashboard from ./dashboard' instead of 'import dashboard from ./dashboard.jsx, etc.'
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.png',
      '.jpg',
      '.jpeg',
      '.gif',
      '.css',
      '.scss',
    ],
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './client/public/index.html',
      filename: 'index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
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
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
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
        secure: false,
      },
      // '/users': {
      //   target: 'http://localhost:3005',
      // },
    },
  },
};

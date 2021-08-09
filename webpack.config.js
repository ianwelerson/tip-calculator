const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'assets/js/[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: '/src/index.html',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].css',
    }),
  ],
  devServer: {
    contentBase: './src',
  },
};
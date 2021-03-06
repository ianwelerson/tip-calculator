const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: './src/assets/js/main.ts',
  output: {
    filename: 'assets/js/[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          'ts-loader',
        ]
      },
      {
        test: /\.scss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: "sass-loader",
            options: {
              additionalData: '@import "./src/assets/sass/_variables.scss";',
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext][query]'
        }
      },
      {
        test: /\.(woff|woff2|ttf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext][query]'
        }
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
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    inline: true,
    hot: false,
    watchContentBase: true,
    liveReload: true,
  },
  target: devMode ? 'web' : 'browserslist',
};
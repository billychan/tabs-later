const webpack = require('webpack');
const path = require('path');
const fileSystem = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = process.env.NODE_ENV || 'development';

// load the secrets
const alias = {};
const secretsPath = path.join(__dirname, (`secrets.${env}.js`));

if (fileSystem.existsSync(secretsPath)) {
  alias.secrets = secretsPath;
}

const isDevEnv = env === 'development';

const options = {
  mode: isDevEnv ? 'development' : 'production',
  entry: {
    popup: path.join(__dirname, 'src', 'js', 'pages', 'popup', 'popup.js'),
    options: path.join(__dirname, 'src', 'js', 'pages', 'options', 'options.js'),
    background: path.join(__dirname, 'src', 'js', 'pages', 'background', 'background.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /.(scss|css)$/,
        use: [
          isDevEnv ? 'style-loader' : MiniCssExtractPlugin.loader,
          { loader: 'postcss-loader', ident: 'postcss' },
        ],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(ttf|eot|dtd|svg|woff(2)?)(\?[a-z0-9=.]+)?$/,
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name].[ext]',
        },
      },
      {
        test: /\.(jpg|jpeg|gif|png|ico)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/img/[name].[ext]',
        },
      },
    ],
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve('./src/js'),
    ],
    alias,
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/manifest.json',
        transform(content) {
          // generates the manifest file using the package.json informations
          return Buffer.from(JSON.stringify({
            description: process.env.npm_package_description,
            version: process.env.npm_package_version,
            ...JSON.parse(content.toString()),
          }));
        },
      },
      {
        from: 'src/img/*',
      },
    ]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'js', 'pages', 'popup', 'popup.html'),
      filename: 'popup.html',
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'js', 'pages', 'options', 'options.html'),
      filename: 'options.html',
      chunks: ['options'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'js', 'pages', 'background', 'background.html'),
      filename: 'background.html',
      chunks: ['background'],
    }),
    new WriteFilePlugin(),
  ],
  devtool: isDevEnv ? 'source-map' : undefined,
  devServer: isDevEnv ? {
    hot: true,
    contentBase: path.join(__dirname, '../build'),
    headers: { 'Access-Control-Allow-Origin': '*' },
  } : undefined,
};

module.exports = options;

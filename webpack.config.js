const path = require('path');
const fileSystem = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

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
    popup: path.join(__dirname, 'src', 'js', 'pages', 'popup', 'popup.tsx'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: isDevEnv ? '[hash].js' : '[name].[contenthash].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /.(scss|css)$/,
        use: [
          isDevEnv ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDevEnv,
            },
          },
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
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
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
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!resources*'],
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
      {
        from: 'node_modules/@blueprintjs/icons/resources/icons/*',
        to: 'resources/icons',
        flatten: true,
      },
    ]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'js', 'pages', 'popup', 'popup.html'),
      filename: 'popup.html',
      chunks: ['popup'],
    }),
    new WriteFilePlugin(),
    new MiniCssExtractPlugin({
      filename: isDevEnv ? '[hash].css' : '[name].[contenthash].css',
      chunkFilename: isDevEnv ? '[hash].css' : '[name].[contenthash].css',
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({}),
      new OptimizeCssAssetsPlugin({}),
    ],
  },
  devServer: isDevEnv ? {
    hot: true,
    contentBase: path.join(__dirname, '../build'),
    headers: { 'Access-Control-Allow-Origin': '*' },
    disableHostCheck: true,
    host: 'localhost',
    port: 3000,
  } : undefined,
};

module.exports = options;

const path = require('path');
const HtmlWebapckPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function generate(seed, files) {
  const importMap = {
    imports: {},
  };
  files.forEach((file) => {
    if (file.isChunk && file.isInitial && file.chunk) {
      if (/\.js$/.test(file.name)) {
        importMap.imports[`project1/${file.chunk.name}`] = `http://localhost:8001${file.path}`;
      }
      if (/\.css$/.test(file.name)) {
        importMap.imports[`project1/${file.chunk.name}@css`] = `http://localhost:8001${file.path}`;
      }
    }
  });
  return importMap;
}

module.exports = {
  mode: 'development',
  entry: {
    runtime: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    libraryTarget: 'system',
    filename: '[name].[hash:8].chunk.js',
    publicPath: '/'
  },
  devtool: 'source-map',
  watch: true,
  externals: [/@project/, 'react', 'react-dom', 'react-router-dom'],
  devServer: {
    hot: true,
    port: 8001,
    open: true,
    static: {
      directory: path.join(__dirname, 'dist'),
      publicPath: '/'
    },
    historyApiFallback: {
      index: './index.html'
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With',
      'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: {
          loader: 'source-map-loader'
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebapckPlugin({
      template: './src/index.html',
      inject: false
    }),
    new WebpackManifestPlugin({
      publicPath: '/',
      generate,
      fileName: 'import-map.json'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!static-files/**']
    })
  ]
}
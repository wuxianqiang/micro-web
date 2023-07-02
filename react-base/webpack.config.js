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
        importMap.imports[`@project/${file.chunk.name}`] = file.path;
      }
      if (/\.css$/.test(file.name)) {
        importMap.imports[`@project/${file.chunk.name}@css`] = file.path;
      }
    }
  });
  return importMap;
}

module.exports = {
  mode: 'development',
  entry: {
    runtime: './src/index.js',
    fetch: './src/shared/fetch.js',
    history: './src/shared/history.js'
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
    hot: false,
    port: 8080,
    open: true,
    static: {
      directory: path.join(__dirname, 'dist'),
      publicPath: '/'
    },
    historyApiFallback: {
      index: './index.html'
    }
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
          loader: 'babel-loader'
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
    // new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!static-files/**']
    })
  ]
}
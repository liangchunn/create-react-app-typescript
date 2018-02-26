/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/iframeScript.js',
  output: {
    path: path.join(__dirname, './lib'),
    filename: 'iframe-bundle.js',
  },
  optimization: {
    minimize: true,
  },
  performance: { hints: false },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, './src'),
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      // We set process.env.NODE_ENV to 'production' so that React is built
      // in production mode.
      'process.env': { NODE_ENV: '"production"' },
      // This prevents our bundled React from accidentally hijacking devtools.
      __REACT_DEVTOOLS_GLOBAL_HOOK__: '({})',
    }),
    // This code is embedded as a string, so it would never be optimized
    // elsewhere.
    // new UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     comparisons: false
    //   },
    //   output: {
    //     comments: false,
    //     ascii_only: false
    //   }
    // })
  ],
};

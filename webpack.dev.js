const merge = require('webpack-merge');
const baseConfig = require('./webpack.common.js');

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  devServer: {
    // was showing '[WDS] Live Reloading enabled' after startup
    clientLogLevel: 'none',
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'fast-sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                // Make content of this files available in every vue sfc without
                // import
                './src/scss/helpers/variables.scss',
                './src/scss/helpers/mixins/*.scss',
              ],
            },
          },
        ],
      },
      {
        test: /\.(jpg|webp)$/,
        use: 'file-loader',
      },
      {
        test: /\.(woff|woff2|otf)$/,
        use: 'file-loader',
      },
      {
        test: /\.(mp3|wav)$/,
        use: 'file-loader',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              // put all svg icons in separate file sprite.svg
              extract: true,
            },
          },
        ],
      },
    ],
  },
});

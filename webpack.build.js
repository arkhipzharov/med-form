const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.common.js');

module.exports = merge(baseConfig, {
  mode: 'production',
  performance: {
    // to not show warnings about too big bundle size
    hints: false,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        // for webpack performance
        cache: true,
        parallel: true,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
          'fast-sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              // Make content of this files available in every vue sfc without
              // import
              resources: [
                './src/scss/helpers/variables.scss',
                './src/scss/helpers/mixins/*.scss',
              ],
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: '[name].[ext]',
              outputPath: 'assets/fonts',
            },
          },
        ],
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // inline images if size under 10000 bytes
              limit: 10000,
              outputPath: 'assets/img',
            },
          },
        ],
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
          {
            loader: 'svgo-loader',
            options: {
              // doesn't use external config by default
              externalConfig: '.svgo.yml',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // refresh styles by adding hash after uploading new version of website
      filename: 'style.[hash].css',
    }),
    new CleanWebpackPlugin({
      // ignoring .git file because we are setted dist/ folder as git worktree
      // for deploying build files to github pages, and without that file
      // worktree functionality not working
      // https://medium.com/linagora-engineering/deploying-your-js-app-to-github-pages-the-easy-way-or-not-1ef8c48424b7
      cleanOnceBeforeBuildPatterns: ['!.git'],
    }),
  ],
});

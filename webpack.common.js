require('dotenv').config();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

// Try the environment variable, otherwise use root
const GH_PAGES_PUBLIC_PATH = process.env.GH_PAGES_PUBLIC_PATH || '/';

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: GH_PAGES_PUBLIC_PATH,
    // refresh js by adding hash after uploading new version of website
    filename: 'main.[hash].js',
  },
  resolve: {
    // import './file-name-without-esxtension'
    extensions: ['.vue', '.js', '.scss'],
    // import './folder' intstead of './folder/index.ext'
    plugins: [new DirectoryNamedWebpackPlugin(true)],
    alias: {
      // import '@/file' intstead of import '../../../file'
      '@': path.resolve(__dirname, 'src'),
    },
    // for webpack performance
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              /*
                <div>
                  text
                </div>
                =>
                <div> text</div>

                fix for that behaviour
              */
              whitespace: 'condense',
            },
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new SpriteLoaderPlugin({
      // simpler version of svg sprite in bundle
      plainSprite: true,
      spriteAttrs: {
        // svg sprite was breaking layout
        style: 'display: none;',
      },
    }),
    new VueLoaderPlugin(),
  ],
};

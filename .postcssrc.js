module.exports = {
  syntax: 'postcss-scss',
  plugins: {
    'postcss-import': {},
    // polyfills for css bundle
    'postcss-preset-env': {},
    // minify css bundle
    'cssnano': {},
  },
};

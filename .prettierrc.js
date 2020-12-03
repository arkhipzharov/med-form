module.exports = {
  singleQuote: true,
  /*
    <style>
      .block {...}
    </style>

    instead of

    <style>
    .block {...}
    </style>

    Because it looks more consistent with <template> vue sfc tag, which always
    have 2 spaces base indent bcs of prettier
  */
  vueIndentScriptAndStyle: true,
  trailingComma: 'all',
  // preserve quotes around object property names in configs because some of it
  // needs to be always quoted for consistency, like rule names
  quoteProps: 'preserve',
  // (param) => {...} instead of param => {}
  arrowParens: 'always',
};

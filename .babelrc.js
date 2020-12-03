module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        /* 1
          Теперь надо указывать версию corejs, подробнее:

          https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md
        */
        corejs: 3,
      },
    ],
  ],
};

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  // 'Use the latest vue-eslint-parser' fix
  //
  // https://github.com/vuejs/eslint-plugin-vue/issues/30#issuecomment-434855197
  parser: 'vue-eslint-parser',
  parserOptions: {
    // import('./file.ext');
    parser: 'babel-eslint',
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        /*
          Said that expected indentation of 0 spaces but found 2 inside script
          tag
        */
        'indent': 'off',
      },
    },
  ],
  rules: {
    'no-plusplus': 'off',
    /*
      const id = this.data.id;

      Said that in this case it is necessary to apply destructuring
    */
    'prefer-destructuring': 'off',
    /*
      resetSidebarScrollPosition(sidebar) {
        sidebar.scrollTop = 0;
      },

      Said that you can’t assign value to the property of an object that
      contains function parameter
    */
    'no-param-reassign': 'off',
    /*
      TheMenu.vue
      grid:
        'location shops . to-buyers . projects . call . notifications . enter . registration .' 39.36px
        / 245px auto 10px auto 10px auto 1fr auto 20px auto 20px auto 10px auto 4px;

      And in the editor there is a limit line
    */
    'max-len': 'off',
    /*
      .find((data) => data.id === storData.id);
      Better than
      .find(data => data.id === storData.id);

      Brackets around a single parameter of the arrow function are required.
      It’s easier to identify function by looking through the code
    */
    'arrow-parens': ['error', 'always'],
    /*
      const maxPageScrollOffsetToComfortablyComeBackToTopByManualScrolling
        = pageHeight * 4;
      if (
        pageScrollOffset
        > maxPageScrollOffsetToComfortablyComeBackToTopByManualScrolling
      ) {
        ...
      }

      Said that the operators '=' and '>' should not be on a new line. If we
      shorten the variable names, then the code will not be so clear
    */
    'operator-linebreak': 'off',
    /*
      mixins: [vueComponentReset(() => ({**error here**
        iconName: 'menu',
        iconText: 'menu',
      }))],
    */
    'arrow-body-style': 'off',
    /*
      function request(url, options, responseType) {
        try {
          ...
          return parsedData;
        } catch (errorResponse) {
          if (!(errorResponse instanceof Error)) {
            ...
            return parsedErrorData;
          }
        }
      }

      Said that expect to return a value at the end of function
    */
    'consistent-return': 'off',
    /*
      const data: Data = {
        actionDataIdsChunkSize: 3,
        user: {} as UserData,
      };

      let actionsDataChunkWithoutErrors = actionsDataChunk.filter(
        (data) => data !== null && !data.deleted && !data.dead,
      );

      "'data' is already declared in the upper scope"
    */
    'no-shadow': 'off',
    /*
      for (const id of commentTreeItemIds) {
        const comment = await request(`item/${id}.json`);
        ...
      }
    */
    'no-await-in-loop': 'off',
    /*
      for (const id of commentTreeItemIds) {
        const comment = await request(`item/${id}.json`);
        ...
      }

      'iterators/generators require regenerator-runtime, which is too
      heavyweight for this guide to allow them. Separately, loops should be
      avoided in favor of array iterations'
    */
    'no-restricted-syntax': 'off',
    // shapeAndPossiblyNormalizeInputsDataObj() {
    //   ...
    //   normalizeVueInputsDataObj();
    // }

    // normalizeVueInputsDataObj() {
    //   ...
    // }
    // `'normalizeVueInputsDataObj' was used before it was defined`
    // we prefer to see business logic first before helpers
    'no-use-before-define': 'off',
    'indent': [
      'error',
      2,
      {
        /*
          ${
            data.class === 'show-catalog'
              ? '@click='showCatalog''
              : ''
          }

          Said that the indents in this case are incorrect
        */
        ignoredNodes: ['TemplateLiteral'],
      },
    ],
    /*
      "Unable to resolve path to module '@/components/TheComponent'"
    */
    'import/no-unresolved': 'off',
    /*
      'Missing file extension for "@/components/TheInfiniteLoading"'
    */
    'import/extensions': 'off',
    /*
      import { shallowMount } from '@vue/test-utils';

      Said that '@vue/test-utils' and other packages should be listed in the
      dependencies, not devDependencies
    */
    'import/no-extraneous-dependencies': 'off',
    // using only named import for vscode import autocomplete
    // https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module/
    'import/prefer-default-export': 'off',
    /*
      <component
        :is='RptCartItem'
        v-for='data in cartItemsData'
        :cartItemsData='cartItemsData'
      />

      Input parameters are properties of the object, and the spelling of
      their names in camelCase is generally accepted. SFC also allows you to
      write attributes in camelCase. Said that you need to write them
      through a dash
    */
    'vue/attribute-hyphenation': 'off',
    /*
      <div class="header__logo-icon">HN</div>
    */
    'vue/singleline-html-element-content-newline': 'off',
    'vue/script-indent': [
      'error',
      2,
      {
        /*
          <script>
            export default {};
          </script>

          Instead of

          <script>
          export default {};
          </script>
        */
        baseIndent: 1,
        /*
          let actionsDataChunk: (
            | CommentData
            | ItemData
            | null
            | undefined
          )[] = [];

          'expected 10 spaces but got 8'
        */
        ignores: [":expression"],
      },
    ],
    'vue/html-indent': [
      'error',
      2,
      {
        ignores: [
          /*
            {{ `
              ${data.score} ${
              adoptWordEndingsToNumber(
                data.score, ['point', 'points', 'points'])
              }
            ` }}

            instead of

            {{`
              ${data.score} ${
                adoptWordEndingsToNumber(
                  data.score, ['point', 'points', 'points']
                )
              }
            `}}

            https://stackoverflow.com/a/53094449 - solution
          */
          "TemplateLiteral > *",
          /*
            <TheLoginOrRegisterPopup
              v-if="
                currPopup.name === 'TheLoginOrRegisterPopup' &&
            --> currPopup.isExist === true
              "
            />

            'Expected indentation of 12 spaces but found 10 spaces'
          */
          "VAttribute",
        ],
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          /*
            <a
              href='##'
              class='link-mask'
            ></a>

            In order not to convert tags of some elements after
            autocompletion to self-closing once again
          */
          normal: 'never',
        },
        /*
          <svg>
            <use></use>
          </svg>

          Said that use should be self-closing
        */
        svg: 'never',
      },
    ],
  },
};

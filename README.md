# Med Form

Medical field creae\te client form test task. Live preview is available
[here](http://lime-test.h1n.ru/med-form)

## 📥 Setup

1. `git clone https://github.com/shiftenko/med-form`
2. `npm i`

## 👷‍♂ Development

`npm run dev`

## 🌐 Production

1. `npm run build`
2. Upload files from dist folder on hosting

## Lint

### Regular

`npm run lint`

> this can be useful if you are debugging eslint and don't want to manually
> check problems in every file, or just for quick search

### With code formatting

`npm run lint:fix`

## Special comments

`// (pending|unknown|number)` mark at the top of comment describes the status of
the problem <- which is discussed in the rest of it

example:

``` javascript
// (unknown)
// sometimes `window.svgSpriteInjector is not a function occures`,
// maybe because of npm/webpack cache or other
```
meaning:
* pending: problem can be solved and we just need to monitor further
investigations (pull request, etc.) until one fixes it
* unknown: cause of problem is unknown and we can try to explore
this later, but for now it should be fixed by workaround or in other ways
* number: this comment text can be inserted in all places where only exact
`// (number)` comment exists

## Other

* If you are made adjustments to global scss variables/mixins/functions and
don't see change in styles, reload webpack
* 1 low npm packages vulnerability is
(pending)[https://github.com/constverum/stylelint-config-rational-order/issues/39]

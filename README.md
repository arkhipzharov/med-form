# Med Form

Medical field create client form with dynamic and submit validation.
Live preview is available [here](https://arkhipzharov.github.io/med-form/)

## 📥 Setup

1. `git clone https://github.com/arkhipzharov/med-form`
2. `npm i`
2. `git worktree add dist gh-pages`

## 👷‍♂ Development

`npm run dev`

## 🌐 Production

> You can read more about this approach
[here](https://medium.com/linagora-engineering/deploying-your-js-app-to-github-pages-the-easy-way-or-not-1ef8c48424b7)

1. `npm run build`
2. `cd dist`
3. `git add .`
4. `git commit`
4. `git push origin gh-pages`
5. wait a bit and check updates [here](https://arkhipzharov.github.io/med-form/)

## Lint

### Regular

`npm run lint`

### With code formatting

`npm run lint:fix`

## Special comments

`// (pending|unknown|number)` mark at the top of comment describes the status of
the problem <- which is discussed in the rest of it

Example:

``` javascript
// (unknown)
// sometimes `window.svgSpriteInjector is not a function occures`,
// maybe because of npm/webpack cache or other
```
Meaning:
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
[pending](https://github.com/constverum/stylelint-config-rational-order/issues/39)
* Files for debugging in '.' folder inside chrome dev tools

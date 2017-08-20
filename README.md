thank-you-stars
====

Give your dependencies stars on GitHub!

[![npm version][npm-image]][npm-url]
![Node.js Version Support][node-version]
[![build status][circleci-image]][circleci-url]
[![dependency status][deps-image]][deps-url]
[![Greenkeeper badge](https://badges.greenkeeper.io/teppeis/thank-you-stars.svg)](https://greenkeeper.io/)
![License][license]

## Setup

```console
$ npm install -g thank-you-stars
```

Save your GitHub token as `~/.thank-you-stars.json`.

```json
{
    "token": "YOUR_TOKEN"
}
```

## Usage

After `npm install`, run in your project root directory. And then, it stars your dependencies and devDependencies in your `package.json`.

```console
$ ls
node_modules/       package.json

$ thank-you-stars
Starred! https://github.com/mikedeboer/node-github
Starred! https://github.com/npm/hosted-git-info
Starred! https://github.com/npm/normalize-package-data
Starred! https://github.com/sindresorhus/p-queue
Starred! https://github.com/eslint/eslint
Starred! https://github.com/teppeis/eslint-config-teppeis
Starred! https://github.com/power-assert-js/power-assert
Starred! https://github.com/mochajs/mocha
```

## License

MIT License: Teppei Sato &lt;teppeis@gmail.com&gt;

[npm-image]: https://img.shields.io/npm/v/thank-you-stars.svg
[npm-url]: https://npmjs.org/package/thank-you-stars
[npm-downloads-image]: https://img.shields.io/npm/dm/thank-you-stars.svg
[deps-image]: https://img.shields.io/david/teppeis/thank-you-stars.svg
[deps-url]: https://david-dm.org/teppeis/thank-you-stars
[node-version]: https://img.shields.io/badge/Node.js%20support-v4,v6,v8-brightgreen.svg
[coverage-image]: https://img.shields.io/coveralls/teppeis/thank-you-stars/master.svg
[coverage-url]: https://coveralls.io/github/teppeis/thank-you-stars?branch=master
[license]: https://img.shields.io/npm/l/thank-you-stars.svg
[circleci-image]: https://circleci.com/gh/teppeis/thank-you-stars.svg?style=svg
[circleci-url]: https://circleci.com/gh/teppeis/thank-you-stars

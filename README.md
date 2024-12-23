# after
![tests](https://github.com/substrate-system/after/actions/workflows/nodejs.yml/badge.svg)
[![types](https://img.shields.io/npm/types/@substrate-system/after?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![Common Changelog](https://nichoth.github.io/badge/common-changelog.svg)](./CHANGELOG.md)
[![install size](https://flat.badgen.net/packagephobia/install/@substrate-system/after)](https://packagephobia.com/result?p=@substrate-system/after)
[![dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen.svg?style=flat-square)](package.json)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)

[`after`](https://github.com/Raynos/after), for the world of promises. Resolve a promise after some number of calls.

<details><summary><h2>Contents</h2></summary>
<!-- toc -->
</details>

## install

```sh
npm i -S @substrate-system/after
```

## Format

This exposes ESM and common JS via [package.json `exports` field](https://nodejs.org/api/packages.html#exports).

### ESM
```js
import { after } from '@substrate-system/after'
```

### Common JS
```js
const after = require('@substrate-system/after')
```

### pre-built JS
This package exposes minified JS files too. Copy them to a location that is
accessible to your web server, then link to them in HTML.

#### copy
```sh
cp ./node_modules/@substrate-system/package/dist/index.min.js ./public/after.min.js
```

#### HTML
```html
<script type="module" src="./after.min.js"></script>
```

## Example
Resolve a promise after some number of calls.

```js
import { after } from '@substrate-system/after'

const next = after(3)

// 1
setTimeout(() => next(), 10)

// 2
setTimeout(() => next(), 20)

// 3
setTimeout(() => next(), 30)

// 4 -- this does nothing
setTimeout(() => next(), 40)

next.then(() => {
    console.log('60ms later...')
    // 10 + 20 + 30
})
```

# promise-method

[![Build Status](https://travis-ci.org/wbinnssmith/promise-method.svg)](https://travis-ci.org/wbinnssmith/promise-method)
[![js-semistandard-style](https://cdn.rawgit.com/flet/semistandard/master/badge.svg)](https://github.com/Flet/semistandard)

Wraps a function and returns one that always returns a promise. API-compatible with bluebird's `Promise.method`.

This promise will resolve with the return value of the passed function. If the passed function throws, the resulting promise will reject. The calling context is preserved in this process, so it can safely wrap object methods.

Accepts an alternate Promise implementation as input if the environment doesn't natively support them.

This module is meant to be a convenient standalone implementation of a Promise utility, but it doesn't provide an alternate Promise constructor and is less than 600 bytes minified and gzipped.

## Example

```js
var method = require('promise-method');
var foo = {
	y: 5,
	bar: method(function (x) {
		return x * this.y;
	})
}

foo.bar(6).then(result => assert(result === 30));
```

## API

```js
function method(fn, Promise)
```

`fn` - a synchronously executed function that may return or throw synchronously. This will be wrapped and returned as a promise-returning function.

`Promise` an alternate Promise implementation to use (perhaps if a global one doesn't exist)

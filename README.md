# config-registry [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Handle environment configs on mongo database to be shared across multiple microservices

## Installation

```sh
$ npm install --save config-registry
```

## Usage

```js
const ConfigRegistry = require('config-registry');

var configRegistry = new ConfigRegistry({
  env: 'dev',
  collection: '<registyCollectionName>',
  name: '<configName>',
  db: {
    url: '<mongoCnxString>'
  }
});

configRegistry
  .getConfig()
  .then((config) => {
    // use config object config.<key>
  })
  .catch((error) => {
    // handle error
  });

```
## License

MIT © [Helmac.ca](https://github.com/compuhelmac/)


[npm-image]: https://badge.fury.io/js/config-registry.svg
[npm-url]: https://npmjs.org/package/config-registry
[travis-image]: https://travis-ci.org/compuhelmac/config-registry.svg?branch=master
[travis-url]: https://travis-ci.org/compuhelmac/config-registry
[daviddm-image]: https://david-dm.org/compuhelmac/config-registry.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/compuhelmac/config-registry

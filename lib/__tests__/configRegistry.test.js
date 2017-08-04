const assert = require('assert');
const ConfigRegistry = require('../index.js');

test('no options', function (done) {
  try {
    let configRegistry = new ConfigRegistry();
    assert.notEqual(configRegistry, undefined);
  } catch (error) {
    expect(error).not.toBe(undefined);
    done();
  }
});

test('empty options', function (done) {
  try {
    let configRegistry = new ConfigRegistry({});
    expect(configRegistry).not.toBe(undefined);
  } catch (error) {
    expect(error).not.toBe(undefined);
    done();
  }
});

test('no name', function (done) {
  try {
    let configRegistry = new ConfigRegistry({
      collection: 'config',
      db: {
        url: 'http://mongotest:27017'
      }
    });
    expect(configRegistry).not.toBe(undefined);
  } catch (error) {
    expect(error).not.toBe(undefined);
    done();
  }
});

test('no env', function (done) {
  let pEnv = process.env.NODE_ENV;
  delete process.env.NODE_ENV;
  try {
    let configRegistry = new ConfigRegistry({
      collection: 'config',
      db: {
        url: 'http://mongotest:27017'
      }
    });
    expect(configRegistry).not.toBe(undefined);
  } catch (error) {
    expect(error).not.toBe(undefined);
    done();
    process.env.NODE_ENV = pEnv;
  }
});

test('no collection', function (done) {
  try {
    let configRegistry = new ConfigRegistry({
      name: 'test',
      db: {
        url: 'http://mongotest:27017'
      }
    });
    expect(configRegistry).not.toBe(undefined);
  } catch (error) {
    expect(error).not.toBe(undefined);
    done();
  }
});

test('create', function (done) {
  let configRegistry = new ConfigRegistry({
    name: 'test',
    collection: 'config',
    db: {
      url: 'http://mongotest:27017'
    }
  });
  expect(configRegistry).not.toBe(undefined);
  done();
});

test('connect error', function (done) {
  let configRegistry = new ConfigRegistry({
    name: 'test',
    collection: 'config',
    db: {
      url: 'http://mongotest:27017'
    }
  });
  configRegistry.getConfig()
    .then(config => {
      'use strict';
      expect(config).toBe(undefined);
    })
    .catch(error => {
      expect(error).not.toBe(undefined);
      done();
    });
});

test('connect db', function (done) {
  let configRegistry = new ConfigRegistry({
    name: 'test',
    collection: 'config',
    db: {
      url: 'mongodb://test:test@ds145892.mlab.com:45892/config-registry-test'
    }
  });
  configRegistry.getConfig()
    .then(config => {
      expect(config).not.toBe(undefined);
      done();
    }).catch(error => {
      throw Error(error);
    });
});

test('dev config', function (done) {
  let configRegistry = new ConfigRegistry({
    env: 'dev',
    name: 'test',
    collection: 'config',
    db: {
      url: 'mongodb://test:test@ds145892.mlab.com:45892/config-registry-test'
    }
  });
  configRegistry.getConfig()
    .then(config => {
      expect(config).not.toBe(undefined);
      expect(config.config).not.toBe(undefined);
      expect(config.config.testKey).toBe('test-dev');
      done();
    }).catch(error => {
      throw Error(error);
    });
});

test('qa config', function (done) {
  process.env.CONFIG_REGISTRY_ENV = 'qa';
  let configRegistry = new ConfigRegistry({
    name: 'test',
    collection: 'config',
    db: {
      url: 'mongodb://test:test@ds145892.mlab.com:45892/config-registry-test'
    }
  });
  configRegistry.getConfig()
    .then(config => {
      expect(config).not.toBe(undefined);
      expect(config.config).not.toBe(undefined);
      expect(config.config.testKey).toBe('test-qa');
      done();
    }).catch(error => {
      throw Error(error);
    });
});

afterAll(() => setTimeout(() => process.exit(0), 1000));

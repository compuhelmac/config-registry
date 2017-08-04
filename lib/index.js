'use strict';
const MongoClient = require('mongodb').MongoClient;
const _ = require('lodash');

class ConfigRegistry {
  constructor(options) {
    this._options = _.extend({}, options);

    if (!this._options.env) {
      if (process.env.CONFIG_REGISTRY_ENV === undefined) {
        if (process.env.NODE_ENV === undefined) {
          throw new Error('No environment variable found (options.env | CONFIG_REGISTRY_ENV |' +
            ' NODE_ENV)');
        } else {
          this._options.env = process.env.NODE_ENV;
        }
      } else {
        this._options.env = process.env.CONFIG_REGISTRY_ENV;
      }
    }

    if (!this._options.db || !this._options.db.url) {
      throw new Error('No db cnx found');
    }

    if (this._options.name === undefined) {
      throw new Error('No config name found');
    } else {
      this._options.configName = this._options.name + '-' + this._options.env.toLowerCase();
    }

    if (this._options.collection === undefined) {
      throw new Error('No config collection found');
    }
  }

  getConfig() {
    return new Promise((success, reject) => {
      MongoClient.connect(this._options.db.url)
        .then(mongoConn => {
          return mongoConn.collection(this._options.collection).findOne({
            name: this._options.configName
          });
        })
        .then(config => success(_.omit(config, ['_id', 'name'])))
        .catch(error => reject(error));
    });
  }
}

module.exports = ConfigRegistry;

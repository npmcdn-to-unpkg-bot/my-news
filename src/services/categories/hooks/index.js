'use strict';

const afterGet = require('./after-get');

const preCreate = require('./pre-create');

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');


exports.before = {
  all: [],
  find: [],
  get: [],
  create: [preCreate()],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [afterGet()],
  create: [],
  update: [],
  patch: [],
  remove: []
};

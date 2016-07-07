'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('sources service', function() {
  it('registered the sources service', () => {
    assert.ok(app.service('sources'));
  });
});

'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('crawlers service', function() {
  it('registered the crawlers service', () => {
    assert.ok(app.service('crawlers'));
  });
});

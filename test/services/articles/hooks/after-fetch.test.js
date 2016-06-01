'use strict';

const assert = require('assert');
const afterFetch = require('../../../../src/services/articles/hooks/after-fetch.js');

describe('articles afterFetch hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'after',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    afterFetch()(mockHook);

    assert.ok(mockHook.afterFetch);
  });
});

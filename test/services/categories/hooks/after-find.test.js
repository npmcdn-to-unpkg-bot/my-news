'use strict';

const assert = require('assert');
const afterFind = require('../../../../src/services/categories/hooks/after-find.js');

describe('categories afterFind hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'after',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    afterFind()(mockHook);

    assert.ok(mockHook.afterFind);
  });
});

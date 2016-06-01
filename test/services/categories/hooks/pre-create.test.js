'use strict';

const assert = require('assert');
const preCreate = require('../../../../src/services/categories/hooks/pre-create.js');

describe('categories preCreate hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    preCreate()(mockHook);

    assert.ok(mockHook.preCreate);
  });
});

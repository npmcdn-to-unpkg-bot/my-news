'use strict';

const assert = require('assert');
const preCreate = require('../../../../src/services/articles/hooks/pre-create.js');

describe('articles preCreate hook', function() {
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

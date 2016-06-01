'use strict';

const assert = require('assert');
const postCreate = require('../../../../src/services/articles/hooks/post-create.js');

describe('articles postCreate hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'after',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    postCreate()(mockHook);

    assert.ok(mockHook.postCreate);
  });
});

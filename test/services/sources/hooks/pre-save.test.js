'use strict';

const assert = require('assert');
const preSave = require('../../../../src/services/sources/hooks/pre-save.js');

describe('sources preSave hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    preSave()(mockHook);

    assert.ok(mockHook.preSave);
  });
});

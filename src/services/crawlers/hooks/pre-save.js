'use strict';

// src/services/crawlers/hooks/pre-save.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const validator = require('../../../utils/validator');
const defaults = {};

module.exports = function(options) {
	options = Object.assign({}, defaults, options);

	return function(hook) {
		const sourceToSanitize = hook.data;
		const allowedFiels = ['_id', 'url', 'articleSelector', 'tags'];
		const fields = [{
			name: '_id',
			type: 'alphanum',
			maxLength: 20
		}, {
			name: 'url',
			mandatory: true,
			type: 'string'
		}, {
			name: 'articleSelector',
			mandatory: true,
			type: 'string'
		}, {
			name: 'tags',
			mandatory: true,
			type: 'object'
		}];

		validator.checkAllowedFields(sourceToSanitize, allowedFiels);
		validator.validate(sourceToSanitize, fields);

		const tags = sourceToSanitize.tags;
		for (let key in tags) {
			if (!tags[key].selector) {
				throw new Error('Error when trying to save crawler: tags should have a selector');
			}
		}

		hook.preSave = true;
	};
};

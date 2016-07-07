'use strict';

// src/services/sources/hooks/pre-save.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const validator = require('../../../validator');
const defaults = {};

module.exports = function(options) {
	options = Object.assign({}, defaults, options);

	return function(hook) {
		const sourceToSanitize = hook.data;
		const allowedFiels = ['_id', 'name', 'icon', 'baseUrl', 'localUrls'];
		const fields = [{
				name: '_id',
				type: 'alphanum',
				maxLength: 20
			}, {
				name: 'name',
				mandatory: true,
				type: 'string'
			}, { 
				name: 'icon',
				mandatory: true,
				type: 'string'
			}, {
				name: 'baseUrl',
				mandatory: true,
				type: 'string'
			}, {
				name: 'localUrls',
				type: 'array'
			}
		];

		validator.checkAllowedFields(sourceToSanitize, allowedFiels);
		validator.validate(sourceToSanitize, fields);

		hook.preSave = true;
	};
};

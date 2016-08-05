'use strict';

// src/services/sources/hooks/pre-save.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const validator = require('../../../utils/validator');
const defaults = {};

module.exports = function(options) {
	options = Object.assign({}, defaults, options);

	return function(hook) {
		const sourceToSanitize = hook.data;
		const allowedFiels = ['_id', 'name', 'displayName', 'icon', 'url'];
		const fields = [{
			name: '_id',
			type: 'alphanum'
		}, {
			name: 'name',
			mandatory: true,
			type: 'string'
		}, {
			name: 'displayName',
			mandatory: true,
			type: 'string'
		}, { 
			name: 'icon',
			type: 'string'
		}, {
			name: 'url',
			mandatory: true,
			type: 'string'
		}];

		validator.checkAllowedFields(sourceToSanitize, allowedFiels);
		validator.validate(sourceToSanitize, fields);

		// Check if source already exists
		return this.find({ query: { $or: [ { name: sourceToSanitize.name }, { url: sourceToSanitize.url }] } })
			.then(function(result) {
				if (result.length !== 0) {
					throw new Error('Source already exists.');
				}
			});

		hook.preSave = true;
	};
};

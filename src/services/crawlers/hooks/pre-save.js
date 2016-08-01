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
		const allowedFiels = ['_id', 'source_id', 'url', 'articleSelector', 'tags', 'category_id'];
		const fields = [{
			name: '_id',
			type: 'alphanum'
		}, {
			name: 'source_id',
			type: 'alphanum'
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
		}, {
			name: 'category_id',
			type: 'alphanum'
		}];

		validator.checkAllowedFields(sourceToSanitize, allowedFiels);
		validator.validate(sourceToSanitize, fields);

		const tags = sourceToSanitize.tags;
		for (let key in tags) {
			if (!tags[key].selector) {
				throw new Error('Error when trying to save crawler: tags should have a selector');
			}
		}

		// Check if the crawler already exists
		return this.find({ query: { url: sourceToSanitize.url, articleSelector: sourceToSanitize.articleSelector }, $limit: 1 })
			.then(function(result) {
				if (result.length !== 0) {
					throw new Error('Crawler already exists.');
				}
			});

		hook.preSave = true;
	};
};

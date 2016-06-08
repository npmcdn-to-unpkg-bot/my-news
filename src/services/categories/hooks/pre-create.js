'use strict';

// src/services/categories/hooks/pre-create.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function(options) {
	options = Object.assign({}, defaults, options);

	return function(hook) {
		const categoryToSanitize = hook.data;

		if(!categoryToSanitize.shortName) {
			throw new Error('You need to provide a name for the category.');
		}
		if(!categoryToSanitize.displayName) {
			throw new Error('You need to provide a title for the category.');
		}

		return this.find({ query: { shortName: categoryToSanitize.shortName, $limit: 1 } }).then(result => {
			if (result.length !== 0) {
				throw new Error('Category already exists.');
			}
		});
	};
};

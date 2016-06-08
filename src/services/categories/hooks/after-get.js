'use strict';

// src/services/categories/hooks/after-fetch.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function(options) {
	options = Object.assign({}, defaults, options);

	return function(hook) {
		var category = hook.result;

		return hook.app.service('articles').find({
			query: {
				category_id: category._id,
				$sort: { createdAt: 1 }
			}
		}).then(result => {
			category.articles = result;
		});
	};
};

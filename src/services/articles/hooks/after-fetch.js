'use strict';

// src/services/categories/hooks/after-fetch.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function(options) {
	options = Object.assign({}, defaults, options);

	return function(hook) {
		var res = hook.result;

		var fetchRelatedCategory = function(result) {
			if(Array.isArray(result)) {

			}
			else {
				var article = result;
				return hook.app.service('categories').find({ query: { _id: article.category_id }}).then(result => {
					article.category = result;
				});
			}
		};

		return fetchRelatedCategory(res);
	};
};

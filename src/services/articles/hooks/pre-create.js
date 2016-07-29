'use strict';

// src/services/articles/hooks/pre-create.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function(options) {
	options = Object.assign({}, defaults, options);

	return function(hook) {
		const articleToSanitize = hook.data;

		if(!articleToSanitize.title) {
			throw new Error('You need to provide a title for the article.');
		}
		if(!articleToSanitize.link) {
			throw new Error('You need to provide a link for the article.');
		}

		articleToSanitize.createdAt = new Date().getTime();

		return this.find({ query: { $or: [ { title: articleToSanitize.title }, { link: articleToSanitize.link }] }, $limit: 1 }).then(result => {
			if (result.length !== 0) {
				throw new Error('Article already exists.');
			}

			if (articleToSanitize.categoryName) {
				return hook.app.service('categories').find({ query: { shortName: articleToSanitize.categoryName, $limit: 1 }}).then(result => {
					if (result.length !== 0) {
						articleToSanitize.category_id = result[0]._id;
					}

					delete articleToSanitize.categoryName;
				});
			}
		});
	};
};

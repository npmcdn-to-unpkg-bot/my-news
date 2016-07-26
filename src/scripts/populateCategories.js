'use strict';

// NOTE: If the server is already running it will not notice the new crawler creation since it is working on a cached database and not reading the file directly.

const app = require('../app');
const categoriesService = app.service('categories');

console.log('Starting populate-categories');

const categoriesConfig = [{
	shortName: 'sog',
	displayName: 'Sog'
}, {
	shortName: 'mk',
	displayName: 'MK'
}, {
	shortName: 'lh',
	displayName: 'LH'
}, {
	shortName: 'candh',
	displayName: 'C&H'
}];

categoriesConfig.forEach(function(category) {
	categoriesService.create(category)
		.then(function(data) {
			console.log(data);
		})
		.catch(function(err) {
			console.log('Error while creating category:', err);
		});
});

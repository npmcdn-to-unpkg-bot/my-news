'use strict';

// NOTE: If the server is already running it will not notice the new crawler creation since it is working on a cached database and not reading the file directly.

const app = require('../app');
const crawlersService = app.service('crawlers');

console.log('Starting populate-crawlers');

const crawlersConfig = [{
	url: 'http://explosm.net/comics/archive',
	articleSelector: '.archive-list-item',
	tags: {
		title: {
			selector: '.meta-data h3 a'
		},
		link: {
			selector: '.meta-data h3 a'
		},
		image: {
			selector: 'img.comic-thumbnail'
		}
	}
}];

crawlersConfig.forEach(function(crawler) {
	crawlersService.create(crawler)
		.then(function(data) {
			console.log(data);
		})
		.catch(function(err) {
			console.log('Error while creating crawler:', err);
		});
});

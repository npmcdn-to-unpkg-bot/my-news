'use strict';

const app = require('../app');
const crawlersService = app.service('crawlers');

console.log('Starting run-crawlers');

crawlersService.find()
	.then(function(data) {
		console.log(data);
	})
	.catch(function(err) {
		console.log('Error while trying to fetch crawlers: ', err);
	});

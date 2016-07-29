'use strict';

const app = require('../app');
const crawlersService = app.service('crawlers');
const helpers = require('../utils/helpers');

crawlersService.find()
	.then(function(crawlersConfigs) {
		return helpers.crawlersHelper.getArticles(crawlersConfigs);
	})
	.then(console.log)
	.catch(function(err) {
		console.warn('runCrawlers, error while trying to fetch crawlers: ', err);
	});

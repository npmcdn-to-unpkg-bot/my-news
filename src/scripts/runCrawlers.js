'use strict';

const app = require('../app');
const crawlersService = app.service('crawlers');
const Crawler = require('../utils/Crawler');

console.log('Starting run-crawlers');

crawlersService.find()
	.then(function(crawlersConfigs) {
		return crawlersConfigs.map(function(crawlerConf) {
			const crawler = new Crawler(crawlerConf);
			return crawler.getFormattedArticles();
		});
	})
	.catch(function(err) {
		console.warn('Error while trying to fetch crawlers: ', err);
	});

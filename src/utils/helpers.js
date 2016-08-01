const axios = require('axios');
const Crawler = require('../utils/Crawler');

function getCrawlersFormattedArticles(crawlersConfigs) {
	return axios.all(crawlersConfigs.map(function(crawlerConf) {
		const crawler = new Crawler(crawlerConf);
		return crawler.getFormattedArticles();
	}))
	.catch(function(err) {
		console.warn('runCrawlers, error while trying to get formatted articles:', err);
	});
}

const helpers = {
	crawlersHelper: {
		getArticles: function(crawlersConfigs) {
			return getCrawlersFormattedArticles(crawlersConfigs);
		},
		getMergedArticles: function(crawlersConfigs) {
			return this.getArticles(crawlersConfigs)
				.then(function(crawlersArticles) {
					const mergedArrayOfArticles = crawlersArticles.reduce(function(prev, current) {
						return prev.concat(current);
					}, []);

					return mergedArrayOfArticles;
				})
				.catch(function(err) {
					console.warn('crawlersHelper:getMergedArticles error:', err);
				});
		}
	}
};

module.exports = helpers;

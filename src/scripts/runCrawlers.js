'use strict';

const app = require('../app');
const crawlersService = app.service('crawlers');
const axios = require('axios');
const cheerio = require('cheerio');

console.log('Starting run-crawlers');

function getHtml(crawler) {
	return axios.get(crawler.url)
		.then(function(data) {
			return data.data;
		})
		.catch(function(err) {
			console.warn('Error while retrieving html at: ' + crawler.url, err);
		});
}

function getArticlesFromHtml(crawler, html) {
	let articles = [];
	let $ = cheerio.load(html);
	let articlesTags = $(crawler.articleSelector);

	if (!articlesTags) {
		return [];
	}

	articles = articlesTags.map(function(i, el) {
		const article = {};

		if (crawler.tags.title) {
			const titleTag = $(el).find(crawler.tags.title.selector);
			if (titleTag && titleTag.text()) {
				article.title = titleTag.text();
			}
		}

		return article;
	});

	return articles;
}

function getArticlesFromCrawler(crawler) {
	return getHtml(crawler)
		.then(function(html) {
			return getArticlesFromHtml(crawler, html);
		})
		.then(function(articlesFormatted) {
			return articlesFormatted;
		})
		.catch(function(err) {
			console.warn('Error while extracting articles from HTML:', err);
		});
}

crawlersService.find()
	.then(function(crawlers) {
		return crawlers.map(getArticlesFromCrawler);
	})
	.catch(function(err) {
		console.warn('Error while trying to fetch crawlers: ', err);
	});

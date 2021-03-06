'use strict';

//const validator = require('../utils/validator');
const axios = require('axios');
const cheerio = require('cheerio');

const Crawler = class Crawler {

	constructor(crawlerConfig) {
		this.url = crawlerConfig.url;
		this.articleSelector = crawlerConfig.articleSelector;
		this.tags = crawlerConfig.tags;
		this.parser = {};
		this.articles = [];
	}

	getHtml() {
		return axios.get(this.url)
			.then(function(document) {
				return document.data;
			})
			.catch(function(err) {
				console.warn('Crawler:getHtml, error:', err);
			});
	}

	getRawArticles() {
		return this.getHtml()
			.then(function(html) {
				this.parser = cheerio.load(html);
				const rawArticles = this.parser(this.articleSelector);
				return rawArticles;
			}.bind(this))
			.catch(function(err) {
				console.warn('Crawler:getRawArticles, error:', err);
			});
	}

	getFormattedArticles() {
		return this.getRawArticles()
			.then(function(rawArticles) {
				const formattedArticles = [];

				rawArticles.each(function(i, el) {
					const article = this.formatArticle(el);
					formattedArticles.push(article);
				}.bind(this));

				this.articles = formattedArticles;
				return formattedArticles;
			}.bind(this))
			.catch(function(err) {
				console.warn('Crawler:getFormattedArticles, error:', err);
			});
	}

	formatArticle(articleTag) {
		const article = {};

		if (this.tags.title) {
			const titleTag = this.parser(articleTag).find(this.tags.title.selector);
			if (titleTag && titleTag.text()) {
				article.title = titleTag.text();
			}
		}

		if (this.tags.link) {
			const linkTag = this.parser(articleTag).find(this.tags.link.selector);
			if (linkTag && linkTag.attr('href')) {
				article.link = linkTag.attr('href');
			}
		}

		if (this.tags.image) {
			const imageTag = this.parser(articleTag).find(this.tags.image.selector);
			if (imageTag && imageTag.attr('src')) {
				article.image = imageTag.attr('src');
			}
		}

		return article;
	}

};

module.exports = Crawler;

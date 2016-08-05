'use strict';

const app = require('../app');
const sources = app.service('sources');
const categories = app.service('categories');
const crawlers = app.service('crawlers');
const axios = require('axios');

const sourcesStore = [{
	name: 'explosm',
	displayName: 'explosm',
	url: 'http://explosm.net/',
	icon: 'http://files.explosm.net/img/favicons/site/favicon-32x32.png'
}, {
	name: 'lifehacker',
	displayName: 'Lifehacker',
	url: 'http://lifehacker.com/',
	icon: 'https://i.kinja-img.com/gawker-media/image/upload/s--N2eqEvT8--/c_fill,fl_progressive,g_center,h_80,q_80,w_80/u0939doeuioaqhspkjyc.png'
}, {
	name: 'sog',
	displayName: 'Secrets Of Grindea',
	url: 'http://www.secretsofgrindea.com/',
	icon: 'http://www.secretsofgrindea.com/wp-content/themes/secretsofgrindea/images/favicon.ico'
}, {
	name: 'mk',
	displayName: 'Mark Knopfler',
	url: 'http://www.markknopfler.com',
	icon: 'http://litbimg8.rightinthebox.com/images/50x50/201204/dexpxt1333611539462.jpg'
}, {
	name: 'twitter',
	displayName: 'Twitter',
	url: 'https://twitter.com/',
	icon: 'http://abs.twimg.com/favicons/favicon.ico'
}];

const categoriesStore = [{
	shortName: 'comics',
	displayName: 'Comics'
}, {
	shortName: 'dev',
	displayName: 'Dev'
}, {
	shortName: 'lh',
	displayName: 'LH'
}, {
	shortName: 'sog',
	displayName: 'SoG'
}, {
	shortName: 'mk',
	displayName: 'MK'
}];

const crawlersStores = [{
	url: 'http://www.markknopfler.com/news',
	articleSelector: 'article.post',
	tags: {
		title: {
			selector: 'h3'
		},
		link: {
			selector: 'h3 a'
		},
		body: {
			selector: 'p + p'
		}
	}
}, {
	url: 'http://www.secretsofgrindea.com/index.php/dev-blog',
	articleSelector: '#posts div.post',
	tags: {
		title: {
			selector: 'div.header'
		},
		link: {
			selector: 'div.header a'
		},
		body: {
			selector: 'div.post-content div.edited-content'
		},
		image: {
			selector: 'div.post-content div.edited-content img'
		}
	}
}, {
	url: 'https://twitter.com/hashtag/SecretsofGrindea?src=hash&lang=en',
	articleSelector: 'div.stream ol li.stream-item div.tweet div.content',
	tags: {
		title: {
			selector: 'div.js-tweet-text-container p'
		},
		link: {
			selector: 'div.js-tweet-text-container p a'
		},
		image: {
			selector: 'div.AdaptiveMedia img'
		}
	}
}, {
	url: 'http://lifehacker.com/',
	articleSelector: 'section.main div.hfeed div.post-wrapper article',
	tags: {
		title: {
			selector: 'header h1'
		},
		link: {
			selector: 'header h1 a'
		},
		image: {
			selector: 'div.item__content figure.asset div.img-wrapper picture source'
		}
	}
}, {
	url: 'candh',
	articleSelector: 'div.archive-list-item',
	tags: {
		title: {
			selector: 'div.meta-data > h3'
		},
		link: {
			selector: 'div.meta-data > h3 > a'
		},
		image: {
			selector: 'img.comic-thumbnail'
		},
		body: {
			selector: 'div.meta-data .author-credit-name'
		}
	}
}];

function populate() {
	const self = this;

	const populateSources = axios.all(sourcesStore.map(function(source) {
		return sources.create(source)
			.then(function(createdSource) {
				console.log('Source created: ', createdSource);
			})
			.catch(function(err) {
				console.log('Source was not created');
			});
	}));
	
	const populateCategories = axios.all(categoriesStore.map(function(category) {
		return categories.create(category)
			.then(function(createdCategory) {
				console.log('Category created: ', createdCategory);
			})
			.catch(function(err) {
				console.log('Category was not created');
			});
	}));

	const populateCrawlers = axios.all(crawlersStores.map(function(crawler) {
		return crawlers.create(crawler)
			.then(function(createdCrawler) {
				console.log('Crawler created: ', createdCrawler);
			})
			.catch(function(err) {
				console.log('Crawler was not created');
			});
	}));

	axios.all([populateSources, populateCategories, populateCrawlers]);
}

populate();

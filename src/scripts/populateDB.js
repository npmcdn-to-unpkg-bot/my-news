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

const populater = {
	resourcesCreated: {},
	populate: function() {
		const self = this;
		axios.all(sourcesStore.map(function(source) {
			return sources.create(source);
		}))
		.then(function(sources) {
			self.resourcesCreated['sources'] = sources;
		})
		.then(function() {
			console.log(self.resourcesCreated['sources']);
		})
		.catch(function(err) {
			console.warn('populateDB, error while populating sources:', err);
		});
	}
};

populater.populate();

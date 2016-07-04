
(function() {

'use strict';

/* globals io, feathers, document, moment */

// --------------------------
// 		CONFIGURATION
// --------------------------

var socket = io();
var feathersApp = feathers();
feathersApp.configure(feathers.socketio(socket));

var categoryService = feathersApp.service('categories');
var articleService = feathersApp.service('articles');

var app = {
	isLoading: true,
	menuTop: document.getElementById('menuTop'),
	drawer: document.getElementById('drawer'),
	articlesList: document.getElementById('articlesList'),
	articleTemplate: document.querySelector('.article-template'),
	categoryTemplate: document.querySelector('.category-template'),
	spinner: document.querySelector('.loader'),
	categories: []
};

// --------------------------
// 		METHODS
// --------------------------

app.addCategory = function(category) {
	app.categories.push(category);
	var categoryLink = app.categoryTemplate.cloneNode(true);
	categoryLink.classList.remove('category-template');
	categoryLink.classList.add('link_'+category._id);
	categoryLink.textContent = category.displayName;
	categoryLink.removeAttribute('hidden');
	app.menuTop.appendChild(categoryLink);
	app.drawer.appendChild(categoryLink.cloneNode(true));
	document.querySelectorAll('.link_'+category._id).forEach(function(catLink) {
		catLink.addEventListener('click', function() {
			app.displayCategory(category);
		});
	});
};

app.displayCategory = function(category) {
	app.hideArticles();
	app.showArticles('cat_'+category._id);
};

app.addArticle = function(article, isHidden = false) {
	var articleTag = app.articleTemplate.cloneNode(true);
	articleTag.classList.remove('article-template');
	articleTag.classList.add('cat_'+article.category_id);
	articleTag.setAttribute('id', article._id);

	if (article.siteName) {
		articleTag.querySelector('.article-site-info').innerHTML += article.siteName;
	}

	if (article.siteIcon && article.siteIcon !== '') {
		articleTag.querySelector('.icon').setAttribute('src', article.siteIcon);
	}
	else {
		articleTag.querySelector('.icon').remove();
	}

	if (article.createdAt) {
		var datePublished = moment(article.createdAt);
		articleTag.querySelector('.article-date').textContent = datePublished.calendar(); //format('ddd, Do MMM YYYY - hh:mm');
	}

	if (article.titleHtml) {
		articleTag.querySelector('.article-title').innerHTML += article.titleHtml;
	}

	if (article.bodyHtml) {
		articleTag.querySelector('.article-body').innerHTML += article.bodyHtml;
	}

	if (article.image && article.image !== '') {
		articleTag.querySelector('.article-image').setAttribute('src', article.image);
	}

	articleTag.removeAttribute('hidden');

	if (isHidden) {
		articleTag.style.display = 'none';
	}

	articleTag.addEventListener('click', function() {
		app.toggleArticleExpansion(this);
	});

	app.articlesList.insertBefore(articleTag, app.articlesList.firstChild);
};

app.toggleArticleExpansion = function(el) {
	if (el.classList.contains('expand')) {
		el.classList.remove('expand');
		el.classList.remove('mdl-shadow--4dp');
	}
	else {
		document.querySelectorAll('.article.expand').forEach(function(e) {
			e.classList.remove('expand');
			e.classList.remove('mdl-shadow--4dp');
		});

		el.classList.add('expand');
		el.classList.add('mdl-shadow--4dp');
	}
};

app.hideArticles = function(categoryClass = '') {
	if (categoryClass !== '') {
		categoryClass = '.'+categoryClass;
	}

	document.querySelectorAll('.article'+categoryClass).forEach(function(el) {
		el.style.display = 'none';
	});
};

app.showArticles = function(categoryClass = '') {
	if (categoryClass !== '') {
		categoryClass = '.'+categoryClass;
	}

	document.querySelectorAll('.article'+categoryClass).forEach(function(el) {
		el.style.display = '';
	});
};

// --------------------------
// 		EVENT LISTENERS
// --------------------------

document.querySelectorAll('.all').forEach(function(el) {
	el.addEventListener('click', function() {
		app.showArticles();
	});
});

categoryService.on('created', function(category) {
	app.addCategory(category);
});

articleService.on('created', function(article) {
	var isHidden = false;
	// Figure out if the article's category is currently displayed.
	var anArticleOfSameCategory = document.querySelector('.article.cat_'+article.category_id);
	if (anArticleOfSameCategory) {
		if (anArticleOfSameCategory.style.display === 'none') {
			isHidden = true;
		}
	}

	app.addArticle(article, isHidden);
});

// --------------------------
// 		INIT
// --------------------------

// before is now minus some days;
var before = moment().subtract(3, 'days');

categoryService.find({ query: { $sort: { displayName: 1 }}}, function(error, result) {
	if (!result) {
		return;
	}

	result.forEach(function(cat) {
		app.addCategory(cat);
	});
});

articleService.find({ query: { createdAt: { $gte: before.valueOf() }, $sort: { createdAt: 1 }}}, function(error, result) {
	if (!result) {
		return;
	}

	result.forEach(function(article) {
		app.addArticle(article);
	});
});

})();

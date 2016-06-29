var socket = io();
var app = feathers();
app.configure(feathers.socketio(socket));

var categoryService = app.service('categories');
var articleService = app.service('articles');

var viewController = {
	menuTop: $('#menuTop'),
	drawer: $('#drawer'),
	articlesList: $('#articlesList'),
	categories: [],
	displayCategory: function(category) {
		$('.article').addClass('hidden');
		$('.'+category._id).removeClass('hidden');
	},
	addArticle: function(article, isHidden = false) {
		var hasImage = false;
		if (article.image) {
			hasImage = true;
		}

		var articleTag = $('<li id="'+article._id+'" class="article mdl-list__item mdl_grid '+article.category_id + (isHidden ? ' hidden' : '')+'"></li>');

		var datePublished = moment(article.createdAt, moment.ISO_8601);
		var publishedAt = '<span class="article-date pull-right">'+datePublished.format('ddd, Do MMM YYYY - hh:mm')+'</span>';

		var siteInfo = '';
		if ((article.siteName && article.siteName !== '') && (article.siteIcon && article.siteIcon !== '')) {
			siteInfo = '<span class="article-site-info"><img class="icon" src="'+article.siteIcon+'" />'+article.siteName+'</span>';
		}

		var articleHeader = '<div class="article-header">'+siteInfo+publishedAt+'</div>';

		var title = '';
		if (typeof(article.titleHtml) == 'undefined' || article.titleHtml == '') {
			title = '<a href="'+article.link+'" target="_blank">'+article.title+'</a>';
		}
		else {
			title = article.titleHtml;
		}
		title = '<div class="article-title">'+title+'</div>';

		var body = '';
		if (typeof(article.bodyHtml) == 'undefined' || article.bodyHtml == '') {
			body = article.body;
		}
		else {
			body = article.bodyHtml;
		}
		body = '<div class="article-body">'+body+'</div>';

		var textContainer = '<div class="mdl-list__item-text-body mdl-cell mdl-cell--10-col article-text-wrapper">'+articleHeader+title+body+'</div>';

		var image = '';
		if (hasImage) {
			image = '<img class="img-responsive" src="'+article.image+'" />';
		}
		image = '<div class="article-image-wrapper mdl-cell mdl-cell--2-col">'+image+'</div>';

		var articleItem = '<div class="mdl-list__item-primary-content article-content mdl-grid">'+textContainer+image+'</div>';

		articleTag.append(articleItem);

		this.articlesList.prepend(articleTag);
	},
	addCategory: function(category) {
		var self = this;
		this.categories.push(category);
		this.menuTop.append('<a class="mdl-navigation__link link_'+category._id+'" href="#">'+category.displayName+'</a>');
		this.drawer.append('<a class="mdl-navigation__link link_'+category._id+'" href="#">'+category.displayName+'</a>');
		$('.link_'+category._id).click(function() {
			self.displayCategory(category);
		});
	},
	init: function() {
		var self = this;
		categoryService.find({ query: { $sort: { displayName: 1 }}}, function(error, result) {
			$.each(result, function(i, cat) {
				self.addCategory(cat);
			});
		});

		articleService.find({ query: { $sort: { createdAt: 1 }}}, function(error, result) {
			$.each(result, function(i, article) {
				viewController.addArticle(article);
			});
		});

		$('.all').click(function() {
			$('.article').removeClass('hidden');
		});
	}
};

viewController.init();

categoryService.on('created', function(category) {
	viewController.addCategory(category);
});

articleService.on('created', function(article) {
	// Figure out if the article's category is currently displayed.
	var isCategoryHidden = $('.article.'+article.category_id).first().hasClass('hidden');

	viewController.addArticle(article, isCategoryHidden);
});

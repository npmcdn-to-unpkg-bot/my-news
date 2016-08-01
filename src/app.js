'use strict';

const path = require('path');
const serveStatic = require('feathers').static;
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const bodyParser = require('body-parser');
const socketio = require('feathers-socketio');
const middleware = require('./middleware');
const services = require('./services');
const helpers = require('./utils/helpers');
const axios = require('axios');

const app = feathers();

app.configure(configuration(path.join(__dirname, '..')));

app.use(compress())
  .options('*', cors())
  .use(cors())
  .use(favicon( path.join(app.get('public'), 'favicon.ico') ))
  .use('/', serveStatic( app.get('public') ))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(hooks())
  .configure(rest())
  .configure(socketio())
  .configure(services)
  .configure(middleware);

function crawlersTask() {
	app.service('crawlers').find()
		.then(function(crawlersConfigs) {
			return helpers.crawlersHelper.getMergedArticles(crawlersConfigs);
		})
		.then(function(mergedArrayOfArticles) {
			return axios.all(mergedArrayOfArticles.map(function(article) {
				return app.service('articles').create(article)
					.catch(function(err) {
						console.warn('app:crawlersTask, error when creating article', err);
					});
			}))
			.catch(function(err) {
				console.warn('app:crawlersTask, error when creating all articles', err);
	 		});
		})
		.catch(function(err) {
			console.warn('app:crawlerTask, error:', err);
		});
}

//crawlersTask();

//setInterval(crawlersTask, 120000);

module.exports = app;

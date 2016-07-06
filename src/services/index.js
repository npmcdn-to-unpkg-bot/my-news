'use strict';
const sources = require('./sources');
const categories = require('./categories');
const articles = require('./articles');
const authentication = require('./authentication');
const user = require('./user');

module.exports = function() {
  const app = this;


  app.configure(authentication);
  app.configure(user);
  app.configure(articles);
  app.configure(categories);
  app.configure(sources);
};

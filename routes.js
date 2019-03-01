const routes = require('next-routes');

module.exports = routes()
  .add('index')
  .add('new-post', '/posts/new', '/posts/new')
  .add('about', '/about-us/:foo(bar|baz)');

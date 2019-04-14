const routes = require('next-routes');

module.exports = routes()
  .add({ name: 'index', pattern: '/', page: 'index' })
  // .add('index')
  .add('trending', '/trending', 'index')
  .add('new-post', '/posts/new', '/posts/new')
  .add('about', '/about-us/:foo(bar|baz)');

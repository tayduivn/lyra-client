const express = require('express');
const next = require('next');
const LRUCache = require('lru-cache');
const routes = require('./routes');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
});

const renderAndCache = routes.getRequestHandler(
  app,
  ({ req, res, route, query }) => {
    if (ssrCache.has(req.url)) {
      return res.send(ssrCache.get(req.url));
    }
    app
      .renderToHTML(req, res, route.page, query)
      .then(html => {
        ssrCache.set(req.url, html);
        res.send(html);
      })
      .catch(err => {
        app.renderError(err, req, res, route.page, query);
      });
  }
);

app.prepare().then(() => {
  express()
    .use(renderAndCache)
    .listen(3000);
});

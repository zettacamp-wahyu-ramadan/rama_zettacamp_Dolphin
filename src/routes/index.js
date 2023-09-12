const { Router } = require('express');
const router = Router();
const bookRoute = require('./bookRoute');
const promiseRoute = require('./promiseRoute');

const defaultRoute = [
  {
    path: '/book',
    route: bookRoute,
  },
  {
    path: '/promise',
    route: promiseRoute,
  },
];

defaultRoute.forEach(({ path, route }) => {
  router.use(path, route);
});

module.exports = router;

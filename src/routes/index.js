const { Router } = require('express');
const router = Router();
const bookRoute = require('./bookRoute');

const defaultRoute = [
  {
    path: '/book',
    route: bookRoute,
  },
];

defaultRoute.forEach(({ path, route }) => {
  router.use(path, route);
});

module.exports = router;

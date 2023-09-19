const { Router } = require('express');
const bookRoute = require('./books/bookRoute');
const userRoute = require('./users/userRoute');
const transactionRoute = require('./transactions/transactionRoute');
const bookshelvesRoute = require('./bookshelves/bookshelvesRoute');

const router = Router();

const defaultRoutes = [
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/book',
    route: bookRoute,
  },
  {
    path: '/transaction',
    route: transactionRoute,
  },
  {
    path: '/bookshelves',
    route: bookshelvesRoute,
  },
];

defaultRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

module.exports = router;

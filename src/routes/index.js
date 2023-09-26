const { Router } = require('express');
const bookRoute = require('./books/bookRoute');
const userRoute = require('./users/userRoute');
const transactionRoute = require('./transactions/transactionRoute');
const bookshelvesRoute = require('./bookshelves/bookshelvesRoute');
const songRoute = require('./songs/songRoute');
const playlistRoute = require('./playlists/playlistRoute');

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
  {
    path: '/song',
    route: songRoute,
  },
  {
    path: '/playlist',
    route: playlistRoute,
  },
];

defaultRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

module.exports = router;

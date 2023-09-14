const { Router } = require('express');
const authRoute = require('./auth/authRoute');
const songRoute = require('./song/songRoute');

const router = Router();

// Define default route to array of object
const defaultRoute = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/song',
    route: songRoute,
  },
];

// Looping route
defaultRoute.forEach(({ path, route }) => {
  router.use(path, route);
});

module.exports = router;

const { Router } = require('express');
const {
  firstLooping,
  secondLooping,
} = require('../controllers/promiseController');

const router = Router();

router.get('/first', firstLooping);
router.get('/second', secondLooping);

module.exports = router;

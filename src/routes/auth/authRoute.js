const { Router } = require('express');
const httpStatus = require('http-status');
const { loginController } = require('../../controllers/auth/authController');

const router = Router();

router.post('/login', loginController);

router.post('/register', (req, res) => {
  res.sendWrapped('Success', httpStatus.OK);
});

module.exports = router;
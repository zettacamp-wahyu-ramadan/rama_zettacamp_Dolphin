const { Router } = require('express');
const {
  createUserController,
} = require('../../controllers/users/userController');

const router = Router();

router.post('/', createUserController);

module.exports = router;

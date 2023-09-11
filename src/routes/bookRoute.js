const { Router } = require('express');
const { getBookController } = require('../controllers/bookController');
const validation = require('../middlewares/validate');
const { purchaseBookValidation } = require('../validations/bookValidation');
const { authorization } = require('../middlewares/authMiddleware');

const router = Router();

router.post(
  '/',
  validation(purchaseBookValidation),
  authorization,
  getBookController
);

module.exports = router;

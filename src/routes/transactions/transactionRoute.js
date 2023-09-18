const { Router } = require('express');
const {
  createTransactionController,
} = require('../../controllers/transactions/transactionController');

const router = Router();

router.post('/', createTransactionController);

module.exports = router;

const Transaction = require('../../models/transactions/transaction.model');

const createTransactionService = async (data) => {
  try {
    const transaction = await Transaction.create(data);

    return transaction;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const findAllTransactionService = async (query) => {
  try {
    const transactions = await Transaction.find(query);

    return transactions;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

module.exports = {
  createTransactionService,
  findAllTransactionService,
};

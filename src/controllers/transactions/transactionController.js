const httpStatus = require('http-status');
const moment = require('moment');
const { findByIdBookService, updateOneBookByQueryService } = require('../../services/books/bookService');
const {
  createTransactionService,
} = require('../../services/transactions/transactionService');
const { generateUniqueRandomString } = require('../../helpers/randomString');

const createTransactionController = async (req, res) => {
  try {
    let { book_id, amount, is_credit, credit_term } = req.body;

    const book = await findByIdBookService(book_id);

    if (!book)
      return res.sendWrapped(
        `Book with ID ${book_id} not found`,
        httpStatus.NOT_FOUND
      );

    let { stock, price, discount, tax, max_discount, is_ready } = book;
    
    console.log('PRICE', price * (tax/100))
    // If not credit, set credit_term to 1
    if (!is_credit) {
      credit_term = 1;
    }
    // If stock book is 0, return error
    if (stock <= 0)
      return res.sendWrapped('Book is out of stock', httpStatus.CONFLICT);
    // Check if amount is more than stock
    if (amount > stock)
      return res.sendWrapped(
        `The stock of book is ${stock}, please insert amount less than equal to ${stock}`,
        httpStatus.CONFLICT
      );
    // If book is not ready for sell
    if (!is_ready)
      return res.sendWrapped('Book is not ready', httpStatus.CONFLICT);
    // Calculate tax
    const calculateTax = price * (tax / 100);
    // Price after tax
    const priceTax = price + calculateTax;
    // Calculate discount
    const calculateDiscount = priceTax * (discount / 100);
    // Choose a discount
    const resultDiscount =
      calculateDiscount >= max_discount ? max_discount : calculateDiscount;
    // Price after discount
    const priceDiscount = priceTax - resultDiscount;
    // Total price
    let totalPrice = 0;
    for (let indexPrice = 0; indexPrice < amount; indexPrice++) {
      totalPrice += priceDiscount;
    }
    // Calculate stock book
    stock -= amount;
    // Array holder the expired date and month
    const listExpiredDate = [];
    // Price per mounth (credit)
    const pricePerMonth = Math.round(totalPrice / credit_term);
    // Look for a price shortfall
    const priceShortfall = totalPrice - pricePerMonth * credit_term;
    // CalculatePriceShortfallHolder
    const creditPrice =
      priceShortfall >= 0
        ? pricePerMonth + priceShortfall
        : pricePerMonth - Math.abs(priceShortfall);
    // If not credit, dot calculate per month
    if (is_credit && credit_term > 1) {
      // Calculate credit
      for (let indexMonth = 1; indexMonth <= credit_term; indexMonth++) {
        const expired = moment()
          .add(indexMonth, 'month')
          .set('date', 5)
          .format('YYYY-MM-DD');
        // Set the data in object
        const data = {
          expired,
          payment: indexMonth === 1 ? creditPrice : pricePerMonth,
        };
        // Push in array
        listExpiredDate.push(data);
      }
    }

    // Create random string
    const randomString = generateUniqueRandomString(24);
    // Data to send in create transaction service
    const data = {
      book_id,
      transaction_id: randomString,
      price,
      discount,
      tax,
      total_discount: priceDiscount,
      total_tax: priceTax,
      amount,
      max_discount,
      total_price: totalPrice,
      is_credit,
      credit: !is_credit ? {} : {
        credit_term,
        payments: listExpiredDate
      }
    };

    const transaction = await createTransactionService(data);

    if (!transaction) return res.sendWrapped('Fail to create transaction', httpStatus.CONFLICT);

    const updateBook = await updateOneBookByQueryService({_id: book_id}, {stock, is_ready: stock === 0 ? false : true});

    res.sendWrapped(`Transaction successfully`, httpStatus.CREATED, transaction);
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

module.exports = {
  createTransactionController,
};

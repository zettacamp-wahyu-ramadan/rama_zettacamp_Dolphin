const httpStatus = require('http-status');
const moment = require('moment');

const getBookController = (req, res) => {
  let {
    title,
    stock,
    price,
    discount,
    tax,
    maxDiscount,
    isReady,
    amount,
    creditTerm,
  } = req.body;

  // If stock book is 0, return error
  if (stock <= 0) return res.sendWrapped('Book is out of stock', httpStatus.CONFLICT);
  // Check if amount is more than stock
  if (amount > stock)
    return res.sendWrapped(`The stock of book is ${stock}, please insert amount less than equal to ${stock}`, httpStatus.CONFLICT);
  // If book is not ready for sell
  if (!isReady) return res.sendWrapped('Book is not ready', httpStatus.CONFLICT);
  // Calculate tax
  const calculateTax = price * (tax / 100);
  // Price after tax
  const priceTax = price + calculateTax;
  // Calculate discount
  const calculateDiscount = priceTax * (discount / 100);
  // Choose a discount
  const resultDiscount =
    calculateDiscount >= maxDiscount ? maxDiscount : calculateDiscount;
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
  const pricePerMonth = Math.round(totalPrice / creditTerm);
  // Look for a price shortfall
  const priceShortfall = totalPrice - pricePerMonth * creditTerm;
  // CalculatePriceShortfallHolder
  const creditPrice =
    priceShortfall >= 0
      ? pricePerMonth + priceShortfall
      : pricePerMonth - Math.abs(priceShortfall);
  // Calculate credit
  for (let indexMonth = 1; indexMonth <= creditTerm; indexMonth++) {
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

  const result = {
    title,
    price,
    stock: stock >= 1 ? stock : 0,
    amountOfTax: calculateTax,
    priceAfterTax: priceTax,
    amountOfDiscount: resultDiscount,
    priceAfterDiscount: priceDiscount,
    totalPrice,
    isReady: stock >= 1 ? true : false,
    durationOfCredit: creditTerm,
    listExpiredDate,
  };

  res.sendWrapped('Success', httpStatus.OK, result);
};

module.exports = {
  getBookController,
};

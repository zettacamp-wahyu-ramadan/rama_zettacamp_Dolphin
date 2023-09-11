const httpStatus = require('http-status');
const moment = require('moment');
const { calculateTermOfCredit } = require('../helpers/calculateTermOfCredit');

const getBookController = async (req, res) => {
  try {
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
      additionalPrice,
    } = req.body;

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
    if (!isReady)
      return res.sendWrapped('Book is not ready', httpStatus.CONFLICT);
    // Initialization additional price
    if (!additionalPrice) {
      additionalPrice = 0;
    }
    // Calculate price with additional price
    // price += additionalPrice;
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
    // Price per mounth (credit)
    const pricePerMonth = Math.round(totalPrice / creditTerm);
    // Look for a price shortfall
    const priceShortfall = totalPrice - pricePerMonth * creditTerm;
    // CalculatePriceShortfallHolder
    const creditPrice =
      priceShortfall >= 0
        ? pricePerMonth + priceShortfall
        : pricePerMonth - Math.abs(priceShortfall);

    const resultTermOfCredit = await calculateTermOfCredit(
      creditTerm,
      creditPrice,
      pricePerMonth,
      additionalPrice,
    );

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
      listExpiredDate: resultTermOfCredit,
    };

    res.sendWrapped('Success', httpStatus.OK, result);
  } catch (error) {
    console.log(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

module.exports = {
  getBookController,
};

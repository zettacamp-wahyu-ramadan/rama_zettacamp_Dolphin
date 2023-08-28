const moment = require('moment');
// Task 1
const purchase = ({ title, stock, price, discount, tax, maxDiscount, isReady, amount, creditTerm }) => {
  // If stock book is 0, return error
  if (stock <= 0) return 'Book is out of stock';
  // Check if amount is more than stock
  if (amount > stock) return `The stock of book is ${stock}, please insert amount less than equal to ${stock}`;
  // If book is not ready for sell
  if (!isReady) return 'Book is not ready';
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
  for (let i = 0; i < amount; i++) {
    totalPrice += priceDiscount;
  }
  // Calculate stock book
  stock -= amount;
  // Initial start expired date and month
  // const expiredDate = moment().add(1, 'month').set('date', 5).format('YYYY-MM-DD');
  // Array holder the expired date and month
  const listExpiredDate = [];
  // Calculate credit
  for (let i = 1; i <= creditTerm; i++) {
    const expired = moment().add(i, 'month').set('date', 5).format('YYYY-MM-DD');
    listExpiredDate.push(expired);
  }

  const result = {
    title,
    price,
    stock: stock >= 1 ? stock : 0,
    // amount,
    amountOfTax: calculateTax,
    priceAfterTax: priceTax,
    amountOfDiscount: resultDiscount,
    priceAfterDiscount: priceDiscount,
    totalPrice,
    isReady: stock >= 1 ? true : false,
    durationOfCredit: creditTerm,
    listExpiredDate,
  };

  return result;
};

const book = {
  title: 'Hati Baja',
  price: 500000,
  stock: 2,
  amount: 2,
  discount: 15,
  tax: 10,
  maxDiscount: 100000,
  isReady: true,
  creditTerm: 3,
};

console.log(purchase(book));

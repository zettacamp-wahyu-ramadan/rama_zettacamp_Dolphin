// Task 1
const purchase = ({ title, stock, price, discount, tax, maxDiscount, isReady }) => {
  // If stock book is 0, return error
  if (stock === 0) return 'Book is sold out';
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
  // Calculate stock book
  stock -= 1;

  const result = {
    title,
    price,
    stock: stock >= 1 ? stock : 0,
    amountOfTax: calculateTax,
    priceAfterTax: priceTax,
    amountOfDiscount: resultDiscount,
    priceAfterDiscount: priceDiscount,
    isReady: stock >= 1 ? true : false,
  };

  return result;
};

const book = {
  title: 'Hati Baja',
  price: 500000,
  stock: 5,
  discount: 15,
  tax: 10,
  maxDiscount: 100000,
  isReady: true,
};

console.log(purchase(book));

// Task 1
const purchase = ({ title, stock, price, discount, tax, maxDiscount, isReady, amount }) => {
  // If stock book is 0, return error
  // if (stock <= 0) return 'Book is out of stock';
  // Check if amount is more than stock
  // if (amount > stock) return `The stock of book is ${stock}, please insert amount less than equal to ${stock}`;
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
    stock -= i;
    if (stock <= 0) break
    totalPrice += priceDiscount;
  }
  // Calculate stock book
  // stock -= amount;

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
  };

  return result;
};

const book = {
  title: 'Hati Baja',
  price: 500000,
  stock: 1,
  amount: 2,
  discount: 15,
  tax: 10,
  maxDiscount: 100000,
  isReady: true,
};

console.log(purchase(book));

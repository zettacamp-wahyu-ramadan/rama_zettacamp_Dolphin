// Task 1
const bookOne = 'Hati Baja';
const bookTwo = 'Hati Hati';

const compareBookVariable = bookOne === bookTwo ? true : false;
console.log('Is book have same value?', compareBookVariable);

// Task 2
const priceBookOne = 705000;
const priceBookTwo = 440000;

// High price
// Using if else
if (priceBookOne > priceBookTwo) {
  console.log('(Using if else) The highest price is:', priceBookOne);
} else {
  console.log('(Using if else) The highest price is:', priceBookTwo);
}

// Using ternary
const highestPrice = priceBookOne >= priceBookTwo ? priceBookOne : priceBookTwo;
console.log('(Using ternary) The highest price is:', highestPrice);

// Average price
const averagePrice = (priceBookOne + priceBookTwo) / 2;
console.log('The average price of book is:', averagePrice);

// Expensive or Cheap
const result = averagePrice <= 500000 ? 'Cheap' : 'Expensive';
console.log('The average price is:', result);

const moment = require('moment');

const calculateTermOfCredit = async (
  creditTerm,
  creditPrice,
  pricePerMonth,
  additionalPrice
) => {
  try {
    const listExpiredDate = [];

    if (!additionalPrice) {
      additionalPrice = 0;
    }

    for (let indexMonth = 1; indexMonth <= creditTerm; indexMonth++) {
      const expired = await moment()
        .add(indexMonth, 'month')
        .set('date', 5)
        .format('YYYY-MM-DD');
      // Set the data in object
      const data = {
        expired,
        payment:
          indexMonth === 1 ? creditPrice + additionalPrice : pricePerMonth,
      };
      // Push in array
      await listExpiredDate.push(data);
    }

    return listExpiredDate;
  } catch (error) {
    console.log(`Error catch: ${error}`);
    throw new Error(error);
  }
};

module.exports = {
  calculateTermOfCredit,
};

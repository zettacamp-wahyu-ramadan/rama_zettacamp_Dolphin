const promiseLoop = async (endpoint) => {
  for (let index = 1; index <= 5; index++) {
    if (index === 1) {
      console.log('Looping is start');
    }

    console.log(`Looping at ${index}`);

    if (index === 5) {
      console.log('Looping is end');
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  return `that's the ${endpoint} endpoint`;
};

module.exports = {
  promiseLoop,
};

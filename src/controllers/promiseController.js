const httpStatus = require('http-status');
const { promiseLoop } = require('../helpers/loopingPromise');

const firstLooping = async (req, res) => {
  try {
    const promise = await promiseLoop('first');
    console.log(promise);
    console.log('After call promise');
    res.sendWrapped('Success', httpStatus.OK);
  } catch (error) {
    console.log(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

const secondLooping = async (req, res) => {
  const promise = promiseLoop('second');
  console.log(promise);
  console.log('After call promise');
  res.sendWrapped('Success', httpStatus.OK);
};

module.exports = {
  firstLooping,
  secondLooping,
};

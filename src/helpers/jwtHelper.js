require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtSign = async (data, options) => {
  // Checking the env
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is required');
  }

  try {
    if (options) {
      return jwt.sign(data, JWT_SECRET, options);
    }
    // console.log('DATA', data);
    const token = await jwt.sign(data, JWT_SECRET);
    // console.log('TOKNE', token);
    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};

const jwtVerify = (data) => {
  // Checking the env
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is required');
  }

  try {
    const verify = jwt.verify(data, JWT_SECRET);
    // console.log('VERIFY', verify);
    return verify;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  jwtSign,
  jwtVerify,
};

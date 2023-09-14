const httpStatus = require('http-status');
const { jwtVerify } = require('../helpers/jwtHelper');

const authorization = (req, res, next) => {
  // Get authorization
  const authorization = req.headers.authorization;

  // Check are we have authorization
  if (!authorization) {
    return res.sendWrapped('Unauthorization', httpStatus.UNAUTHORIZED);
  }

  // Check are we use basic authorization
  if (!authorization.startsWith('Bearer')) {
    return res.sendWrapped(
      'Only bearer auth can authorization',
      httpStatus.UNAUTHORIZED
    );
  }

  // Get the value of token
  const token = authorization.split(' ')[1];

  // Check is token valid
  const validToken = jwtVerify(token);
  
  if (!validToken)
  return res.sendWrapped('Access denied', httpStatus.FORBIDDEN);

// Define req.user to data the from jwt
  req.user = validToken;

  next();
};

module.exports = {
  authorization,
};

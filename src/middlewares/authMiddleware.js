const httpStatus = require('http-status');

const authorization = (req, res, next) => {
  // Get the authorization
  const authorization = req.headers.authorization;

  // Check are we have authorization
  if (!authorization) {
    return res.sendWrapped('Unauthorization', httpStatus.UNAUTHORIZED);
  }

  // Check are we use basic authorization
  if (!authorization.startsWith('Basic')) {
    return res.sendWrapped(
      'Only basic auth can authorization',
      httpStatus.UNAUTHORIZED
    );
  }

  // Get the username and password from basic auth
  const auth = Buffer.from(authorization.split(' ')[1], "base64").toString("ascii");

  // Set username and password
  const username = auth.split(":")[0];
  const password = auth.split(":")[1];
  // Compare username and password from basic auth
  if (username === 'admin' && password === 'admin') {
    return next();
  } else {
    return res.sendWrapped('Access denied', httpStatus.FORBIDDEN);
  }
};

module.exports = {
  authorization,
};

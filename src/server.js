require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const httpStatus = require('http-status');
const routeV1 = require('./routes/index');

const { NODE_PORT } = process.env;

const app = express();

// Parse requests of content-type - application/json
app.use(express.json());
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);
// Use morgan to console api hitting
// app.use(morgan('dev'));
// Wrapped response
app.response.sendWrapped = function (message, statusCode, data) {
  return this.status(statusCode).json({
    statusCode,
    message,
    data,
  });
};
// Use indexing route in v1
app.use('/v1', routeV1);

app.use((req, res, next) => {
  res
    .status(httpStatus.NOT_FOUND)
    .send({
      statusCode: httpStatus.NOT_FOUND,
      message: "Sorry can't find that!",
    });
});

// Listening port
app.listen(NODE_PORT, () => {
  console.log(`Server running at port ${NODE_PORT}`);
});

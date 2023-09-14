require('dotenv').config(); // Allow to call env
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const httpStatus = require('http-status');
const routeV1 = require('./routes/index');

const app = express();
// Call the env
const { NODE_PORT } = process.env;

// Allow convert to JSON
app.use(express.json());
// Allow urlecoded
app.use(express.urlencoded({extended: true}));
// Allow all cors option
app.options('*', cors());
app.use(cors());
// Allow morgan to dev
app.use(morgan('dev'));

// Wrapping response
app.response.sendWrapped = function (message, statusCode, data) {
  return this.status(statusCode).json({
    statusCode,
    message,
    data,
  });
};

// Define route version 1
app.use('/v1', routeV1);

// Handler not found route
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

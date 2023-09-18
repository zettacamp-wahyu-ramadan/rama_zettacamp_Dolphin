require('dotenv').config();
const express = require('express');
const httpStatus = require('http-status');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routeV1 = require('./routes/index');

const { NODE_PORT, DB_HOST, DB_PORT, DB_NAME } = process.env;
const app = express();

mongoose
  .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connecting with MongoDB'))
  .catch((error) => console.error(error));

// Allow to convert to JSON
app.use(express.json());
// Allow to urlencoded
app.use(express.urlencoded({ extended: true }));
// Allow all cors options
app.options('*', cors());
app.use(cors());
// Allow morgan and set to dev
app.use(morgan('dev'));

// Wrapping the response
app.response.sendWrapped = function (message, statusCode, data) {
  return this.status(statusCode).json({
    status: statusCode,
    message,
    data,
  });
};

// Define route version 1
app.use('/v1', routeV1);

// Handler unkown route
app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    status: httpStatus.NOT_FOUND,
    message: 'Unknown endpoint',
  });
});

app.listen(NODE_PORT, () => {
  console.log(`Server run at port ${NODE_PORT}`);
});

const httpStatus = require("http-status");
const Joi = require("joi");

const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      console.log("error validation", error)
      return res.sendWrapped(error.details[0].message, httpStatus.BAD_REQUEST);
    }

    next();
  };
};

module.exports = validation;

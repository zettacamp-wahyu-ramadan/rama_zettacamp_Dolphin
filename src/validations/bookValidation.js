const Joi = require('joi');

const purchaseBookValidation = Joi.object({
  title: Joi.string()
    .min(2)
    .required()
    .error((errors) => {
      return errors;
    }),

  price: Joi.number()
    .integer()
    .required()
    .error((errors) => {
      return errors;
    }),

  stock: Joi.number()
    .integer()
    .required()
    .error((errors) => {
      return errors;
    }),

  amount: Joi.number()
    .integer()
    .required()
    .error((errors) => {
      return errors;
    }),

  discount: Joi.number()
    .integer()
    .required()
    .error((errors) => {
      return errors;
    }),

  tax: Joi.number()
    .integer()
    .required()
    .error((errors) => {
      return errors;
    }),

  maxDiscount: Joi.number()
    .integer()
    .required()
    .error((errors) => {
      return errors;
    }),

  isReady: Joi.boolean()
    .required()
    .error((errors) => {
      return errors;
    }),

  creditTerm: Joi.number()
    .integer()
    .required()
    .error((errors) => {
      return errors;
    }),

  additionalPrice: Joi.number()
    .integer()
    .optional()
    .error((errors) => {
      return errors;
    }),

  findByDate: Joi.string()
    .optional()
    .error((errors) => {
      return errors;
    }),
});

module.exports = {
  purchaseBookValidation,
};

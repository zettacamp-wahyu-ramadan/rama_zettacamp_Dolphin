const Joi = require('joi');

const purchaseBookValidation = Joi.object({
  title: Joi.string()
    .min(2)
    .required()
    .error((errors) => {
      // errors.forEach((err) => {
      //   console.log('ERROR', error)
      //   switch (err.code) {
      //     case 'string.empty':
      //       err.message = 'Title type is not allowed to be empty';
      //       break;
      //     case 'string.min':
      //       // err.message = `Title type must be at least ${err.local.limit} characters long`;
      //       break;
      //     case 'any.required':
      //       err.message = 'Username type is required';
      //       break;
      //     default:
      //       break;
      //   }
      // });
      return errors;
    }),

  price: Joi.number()
    .integer()
    .required()
    .error((errors) => {
      // errors.forEach((err) => {
      //   console.log(err);
      //   switch (err.code) {
      //     case 'number.base':
      //       err.message = 'Price type is number';
      //       break;
      //     default:
      //       break;
      //   }
      // });
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
});

module.exports = {
  purchaseBookValidation,
};

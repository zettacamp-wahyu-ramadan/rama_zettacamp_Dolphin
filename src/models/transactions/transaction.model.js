const mongoose = require('mongoose');
const moment = require('moment');

const transactionSchema = mongoose.Schema(
  {
    book_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Book',
    },
    transaction_id: {
      type: String,
      unique: true,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      required: false,
    },
    discount: {
      type: Number,
      default: 0,
      required: false,
    },
    tax: {
      type: Number,
      default: 0,
      required: false,
    },
    total_discount: {
      type: Number,
      default: 0,
      required: false,
    },
    total_tax: {
      type: Number,
      default: 0,
      required: false,
    },
    amount: {
      type: Number,
      default: 0,
      required: false,
    },
    max_discount: {
      type: Number,
      default: 0,
      required: false,
    },
    total_price: {
      type: Number,
      default: 0,
      required: false,
    },
    is_credit: {
      type: Boolean,
      default: false,
      required: false,
    },
    credit: {
      credit_term: {
        type: Number,
        default: 0,
        required: false,
      },
      payments: [
        {
          expired: {
            type: Date,
            default: moment().format('YYYY-MM-DD'),
            required: false,
          },
          payment: {
            type: Number,
            default: 0,
            required: false,
          },
        },
      ],
      default: {},
      required: false,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = mongoose.model('Transaction', transactionSchema);

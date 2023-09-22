const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
    required: false,
  },
  tax: {
    type: Number,
    default: 0,
    required: false
  },
  max_discount: {
    type: Number,
    default: 0,
    required: false,
  },
  genre: {
    type: String,
    default: null,
    required: false,
  },
  author: {
    type: String,
    default: null,
    required: false,
  },
  is_ready: {
    type: Boolean,
    default: true,
    required: false,
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Book', bookSchema);
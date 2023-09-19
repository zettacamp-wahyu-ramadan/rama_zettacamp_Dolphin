const mongoose = require('mongoose');

const bookshelvesSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  books: [
    {
      book_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Book',
      }
    },
  ]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

bookshelvesSchema.set('autoIndex', false);

module.exports = mongoose.model('Bookshelves', bookshelvesSchema);
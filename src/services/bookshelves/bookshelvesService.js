const Bookshelves = require('../../models/bookshelves/bookshelves.model');

const createBookshelvesService = async (data) => {
  try {
    const bookshelves = await Bookshelves.create(data);

    return bookshelves;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const findAllBookshelvesService = async (query, options) => {
  try {
    const bookshelveses = await Bookshelves.find(query, options).populate('books.book_id');

    return bookshelveses;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const findByIdBookshelvesService = async (id, options) => {
  try {
    const bookshelves = await Bookshelves.findById(id, options).populate('books.book_id');;

    return bookshelves;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const findOneByQueryBookshelvesService = async (query, options) => {
  try {
    const bookshelves = await Bookshelves.findOne(query, options).populate('books.book_id');

    return bookshelves;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const aggregateUnwindBookshelvesService = async (pipeline, options) => {
  try {
    const bookshelves = await Bookshelves.aggregate(pipeline, options);

    return bookshelves;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const updateOneBookshelvesByQueryService = async (query, data, options) => {
  try {
    const bookshelves = await Bookshelves.updateOne(query, { $set: data }, options);

    return bookshelves;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const updateManyBookshelvesByQueryService = async (query, data, options) => {
  try {
    const bookshelveses = await Bookshelves.updateMany(query, { $set: data }, options);

    return bookshelveses;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const deleteOneBookshelvesByQueryService = async (query, options) => {
  try {
    const bookshelves = await Bookshelves.deleteOne(query, options);

    return bookshelves;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const deleteManyBookshelvesByQueryService = async (query, options) => {
  try {
    const bookshelveses = await Bookshelves.deleteMany(query, options);

    return bookshelveses;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

module.exports = {
  createBookshelvesService,
  findAllBookshelvesService,
  findByIdBookshelvesService,
  findOneByQueryBookshelvesService,
  aggregateUnwindBookshelvesService,
  updateOneBookshelvesByQueryService,
  updateManyBookshelvesByQueryService,
  deleteOneBookshelvesByQueryService,
  deleteManyBookshelvesByQueryService,
};

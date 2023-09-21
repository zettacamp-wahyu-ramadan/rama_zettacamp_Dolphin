const Book = require('../../models/books/book.model');

const createBookService = async (data) => {
  try {
    const book = await Book.create(data);

    return book;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const findByIdBookService = async (id) => {
  try {
    const book = await Book.findById(id);

    return book;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const findAllBookService = async (query) => {
  try {
    const books = await Book.find(query).sort({created_at: 'desc', updated_at: 'desc'});

    return books;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const findOneBookService = async (query) => {
  try {
    const book = await Book.findOne(query);

    return book;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const distinctBookService = async (data, query) => {
  try {
    const books = await Book.distinct(data, query);

    return books;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const aggregationBookService = async (pipeline, options) => {
  try {
    const book = await Book.aggregate(pipeline, options);

    return book;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const updateOneBookByQueryService = async (query, data) => {
  try {
    const book = await Book.updateOne(query, { $set: data });

    return book;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const updateManyBookByQueryService = async (query, data) => {
  try {
    const books = await Book.updateMany(query, { $set: data });

    return books;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const deleteOneBookByQueryService = async (query) => {
  try {
    const book = await Book.deleteOne(query);

    return book;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const deleteManyBookByQueryService = async (query) => {
  try {
    const books = await Book.deleteMany(query);

    return books;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

module.exports = {
  createBookService,
  findByIdBookService,
  findAllBookService,
  findOneBookService,
  distinctBookService,
  aggregationBookService,
  updateOneBookByQueryService,
  updateManyBookByQueryService,
  deleteOneBookByQueryService,
  deleteManyBookByQueryService,
};

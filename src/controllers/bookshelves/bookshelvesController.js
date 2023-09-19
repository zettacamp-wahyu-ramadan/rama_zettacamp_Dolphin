const httpStatus = require('http-status');
const mongoose = require('mongoose');
const {
  createBookshelvesService,
  findByIdBookshelvesService,
  findAllBookshelvesService,
  updateOneBookshelvesByQueryService,
  updateManyBookshelvesByQueryService,
  deleteOneBookshelvesByQueryService,
  deleteManyBookshelvesByQueryService,
  findByBookIdBookshelvesService,
} = require('../../services/bookshelves/bookshelvesService');
const { findByIdBookService } = require('../../services/books/bookService');

const createBookshelvesController = async (req, res) => {
  try {
    let requestBody = req.body;

    requestBody.title = requestBody.title.toUpperCase();
    let books = [];

    if (requestBody.books && requestBody.books.length) {
      const checkingBookId = requestBody.books.map(async (item) => {
        const validBookId = await findByIdBookService(item.bookId);
  
        if (!validBookId) return false;
  
        books.push({ book_id: item.bookId });
        return true;
      });
  
      const resultsBookId = await Promise.all(checkingBookId);
  
      if (resultsBookId.includes(false))
        return res.sendWrapped(`Invalid book ID`, httpStatus.BAD_REQUEST);
    }

    const data = {
      ...requestBody,
      books,
    };

    const bookshelves = await createBookshelvesService(data);

    if (!bookshelves)
      return res.sendWrapped('Fail to create bookshelves', httpStatus.CONFLICT);

    res.sendWrapped(
      `Bookshelves created successfully`,
      httpStatus.CREATED,
      bookshelves
    );
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

const findAllBookshelvesController = async (req, res) => {
  try {
    const { book } = req.query;

    if (book) {
      if (!mongoose.Types.ObjectId.isValid(book))
        return res.sendWrapped(`Invalid ID ${book}`, httpStatus.BAD_REQUEST);

      const bookshelveses = await findAllBookshelvesService({
        books: { $elemMatch: { book_id: book } },
      });

      return res.sendWrapped(
        `Bookshelves with book ID ${book}`,
        httpStatus.OK,
        bookshelveses
      );
    }

    const bookshelveses = await findAllBookshelvesService();

    res.sendWrapped('List of bookshelves', httpStatus.OK, bookshelveses);
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

const findByIdBookshelvesController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.sendWrapped(`Invalid ID ${id}`, httpStatus.BAD_REQUEST);

    const bookshelves = await findByIdBookshelvesService({ _id: id });

    if (!bookshelves)
      return res.sendWrapped(
        `Bookshelves with ID ${id} not found`,
        httpStatus.NOT_FOUND
      );

    res.sendWrapped(`Bookshelves with ID ${id}`, httpStatus.OK, bookshelves);
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

const findByBookIdBookshelvesController = async (req, res) => {
  try {
    const { book } = req.params;

    if (!mongoose.Types.ObjectId.isValid(book))
      return res.sendWrapped(`Invalid ID ${book}`, httpStatus.BAD_REQUEST);

    const bookshelves = await findByBookIdBookshelvesService({
      books: { $elemMatch: { book_id: book } },
    });

    if (!bookshelves)
      return res.sendWrapped(
        `Bookshelves with book ID ${book} not found`,
        httpStatus.NOT_FOUND
      );

    res.sendWrapped(
      `Bookshelves with book ID ${book}`,
      httpStatus.OK,
      bookshelves
    );
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

const updateOneByIdBookshelvesController = async (req, res) => {
  try {
    const { id } = req.params;
    let requestBody = req.body;
    const books = [];

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.sendWrapped(`Invalid ID ${id}`, httpStatus.BAD_REQUEST);

    const bookshelves = await findByIdBookshelvesService(id);

    if (!bookshelves)
      return res.sendWrapped(
        `Bookshelves with ID ${id} not found`,
        httpStatus.NOT_FOUND
      );

    if (requestBody.title) {
      requestBody.title = requestBody.title.toUpperCase();
    }

    if (requestBody.books && requestBody.books.length) {
      const checkingBookId = requestBody.books.map(async (item) => {
        const validBookId = await findByIdBookService(item.bookId);

        if (!validBookId) return false;

        books.push({ book_id: item.bookId });
        return true;
      });

      const resultsBookId = await Promise.all(checkingBookId);

      if (resultsBookId.includes(false))
        return res.sendWrapped(`Invalid book ID`, httpStatus.BAD_REQUEST);
    }

    const data = {
      title: requestBody.title ? requestBody.title : bookshelves.title,
      books,
    };

    const update = await updateOneBookshelvesByQueryService({ _id: id }, data);

    if (update.nModified <= 0)
      return res.sendWrapped(
        `Fail to update bookshelves with ID ${id}`,
        httpStatus.CONFLICT
      );

    res.sendWrapped(
      `Update bookshelves with ID ${id} successfullu`,
      httpStatus.OK,
      update
    );
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

const updateOneByBookIdBookshelvesController = async (req, res) => {
  try {
    const { booksholvesId, bookId } = req.params;

    res.sendWrapped(
      `Update bookshelves with ID ${booksholvesId} and book with ID ${bookId} successfully`,
      httpStatus.OK,
      { booksholvesId, bookId }
    );
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

const deleteByIdBookshelvesController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.sendWrapped(`Invalid ID ${id}`, httpStatus.BAD_REQUEST);

    const bookshelves = await findByIdBookshelvesService(id);

    if (!bookshelves)
      return res.sendWrapped(
        `Fail to delete bookshelves with ID ${id}`,
        httpStatus.CONFLICT
      );

    const deleting = await deleteOneBookshelvesByQueryService({ _id: id });

    if (deleting.deletedCount <= 0)
      return res.sendWrapped(
        `Fail to delete bookshelves with ID ${id}`,
        httpStatus.CONFLICT
      );

    res.sendWrapped(
      `Delete bookshelves with ID ${id} successfully`,
      httpStatus.OK
    );
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

module.exports = {
  createBookshelvesController,
  findAllBookshelvesController,
  findByIdBookshelvesController,
  findByBookIdBookshelvesController,
  updateOneByIdBookshelvesController,
  updateOneByBookIdBookshelvesController,
  deleteByIdBookshelvesController,
};

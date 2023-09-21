const httpStatus = require('http-status');
const moment = require('moment');
const {
  createBookService,
  findAllBookService,
  findByIdBookService,
  updateOneBookByQueryService,
  deleteOneBookByQueryService,
  distinctBookService,
  aggregationBookService,
} = require('../../services/books/bookService');

const createBookController = async (req, res) => {
  try {
    const requestBody = req.body;
    // Set title to uppercase
    const refactorTitle = requestBody.title.toUpperCase();
    // Refactor title in request body to send in service create book
    const data = {
      ...requestBody,
      title: refactorTitle,
    };
    // Call service to create book
    const book = await createBookService(data);
    // Conditional if service book not return data
    if (!book)
      return res.sendWrapped('Fail to create book', httpStatus.CONFLICT);

    res.sendWrapped('Create book successfully', httpStatus.CREATED, book);
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

const findAllBookController = async (req, res) => {
  try {
    const books = await findAllBookService();

    res.sendWrapped('List of books', httpStatus.OK, books);
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

const findByIdBookController = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await findByIdBookService(id);

    if (!book)
      return res.sendWrapped(
        `Book with ID ${id} not found`,
        httpStatus.NOT_FOUND
      );

    res.sendWrapped(`Book with ID ${id}`, httpStatus.OK, book);
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

const distinctBookController = async (req, res) => {
  try {
    const books = await distinctBookService('genre');

    const result = {
      genres: books,
    };

    res.sendWrapped('The list of genre book', httpStatus.OK, result);
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

const aggregateProjectBookController = async (req, res) => {
  try {
    const pipeline = [
      {
        $project: {
          title: 1,
          price: 1,
          stock: 1,
          created_at: 1,
          updated_at: 1,
        },
      },
    ];

    const book = await aggregationBookService(pipeline);

    res.sendWrapped('Book using aggregate', httpStatus.OK, book);
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

const aggregateAddFieldsBookController = async (req, res) => {
  try {
    const pipeline = [
      {
        $addFields: {
          totalTax: {
            $sum: [
              '$price',
              {
                $multiply: [
                  '$price',
                  {
                    $divide: ['$tax', 100],
                  },
                ],
              },
            ],
          },
        },
      },
    ];

    const book = await aggregationBookService(pipeline);

    res.sendWrapped('Book using aggregate', httpStatus.OK, book);
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

const updateByIdBookController = async (req, res) => {
  try {
    const { id } = req.params;
    let requestBody = req.body;

    if (requestBody.title) {
      requestBody.title = requestBody.title.toUpperCase();
    }

    const book = await findByIdBookService(id);

    if (!book)
      return res.sendWrapped(
        `Book with ID ${id} not found`,
        httpStatus.NOT_FOUND
      );

    const update = await updateOneBookByQueryService({ _id: id }, requestBody);

    if (update.nModified <= 0)
      return res.sendWrapped(
        `Fail to update book with ID ${id}`,
        httpStatus.CONFLICT
      );

    res.sendWrapped(
      `Update book with ID ${id} successfully`,
      httpStatus.OK,
      update
    );
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

const deleteByIdBookController = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await findByIdBookService(id);

    if (!book)
      return res.sendWrapped(
        `Fail to delete book with ID ${id}`,
        httpStatus.CONFLICT
      );

    const deleting = await deleteOneBookByQueryService({ _id: id });

    if (deleting.deletedCount <= 0)
      return res.sendWrapped(
        `Fail to delete book with ID ${id}`,
        httpStatus.CONFLICT
      );

    res.sendWrapped(
      `Book with ID ${id} has been deleted`,
      httpStatus.OK,
      deleting
    );
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

module.exports = {
  createBookController,
  findAllBookController,
  findByIdBookController,
  distinctBookController,
  aggregateProjectBookController,
  aggregateAddFieldsBookController,
  updateByIdBookController,
  deleteByIdBookController,
};

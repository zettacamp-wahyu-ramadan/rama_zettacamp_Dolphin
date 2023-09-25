require('dotenv').config();
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

const { NODE_PORT, NODE_SERVER } = process.env;

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
    let { page, limit } = req.query;

    if (!page) {
      page = 1;
    } else if (page < 1) {
      page = 1;
    } else {
      page = Number(page);
    }

    if (!limit) {
      limit = 5;
    } else {
      limit = Number(limit);
    }

    const calculateSkip = (page - 1) * limit;

    // const countDataPipeline = [
    //   {
    //     $group: {
    //       _id: null,
    //       count: { $sum: 1 },
    //     },
    //   },
    // ];

    // const limitAndSkipPipeline = [
    //   {
    //     $skip: calculateSkip,
    //   },
    //   {
    //     $limit: limit,
    //   },
    // ];

    const limitAndSkipPipeline = [
      {
        $facet: {
          books: [
            {
              $sort: {
                updated_at: -1
              }
            },
            {
              $skip: calculateSkip,
            },
            {
              $limit: limit,
            },
          ],
          totalPage: [
            {
              $group: {
                _id: null,
                totalData: { $sum: 1 },
              },
            },
          ],
        },
      },
      {
        $addFields: {
          totalData: { $arrayElemAt: ['$totalPage.totalData', 0] },
        },
      },
      {
        $addFields: {
          calculateTotalPage: {
            $round: [
              {
                $divide: ['$totalData', limit],
              },
            ],
          },
        },
      },
      {
        $addFields: {
          calculateModPage: {
            $cond: {
              if: {
                $and: [
                  { $eq: ['$calculateTotalPage', 1] },
                  { $ne: ['$totalData', limit] },
                ],
              },
              then: 1,
              else: { $mod: ['$totalData', '$calculateTotalPage'] },
            },
          },
        },
      },
      {
        $addFields: {
          totalPage: {
            $cond: {
              if: { $gte: ['$calculateModPage', 1] },
              then: { $add: ['$calculateTotalPage', 1] },
              else: '$calculateTotalPage',
            },
          },
        },
      },
      {
        $addFields: {
          limit: limit,
        },
      },
      {
        $addFields: {
          page: page,
        },
      },
      {
        $addFields: {
          isPrevPage: {
            $cond: {
              if: { $lte: ['$page', 1] },
              then: false,
              else: true,
            },
          },
        },
      },
      {
        $addFields: {
          isNextPage: {
            $cond: {
              if: { $eq: ['$page', '$totalPage'] },
              then: false,
              else: true,
            },
          },
        },
      },
      {
        $addFields: {
          prevPage: {
            $cond: {
              if: { $lte: ['$page', 1] },
              then: null,
              else: `${NODE_SERVER}:${NODE_PORT}/v1/book?limit=${limit}&page=${
                page - 1
              }`,
            },
          },
        },
      },
      {
        $addFields: {
          nextPage: {
            $cond: {
              if: { $eq: ['$page', '$totalPage'] },
              then: null,
              else: `${NODE_SERVER}:${NODE_PORT}/v1/book?limit=${limit}&page=${
                page + 1
              }`,
            },
          },
        },
      },
      {
        $project: {
          books: '$books',
          totalData: '$totalData',
          totalPage: '$totalPage',
          limit: '$limit',
          currentPage: '$page',
          isPrevPage: '$isPrevPage',
          isNextPage: '$isNextPage',
          prevPage: '$prevPage',
          nextPage: '$nextPage',
        },
      },
    ];

    // const countData = await aggregationBookService(countDataPipeline);

    const books = await aggregationBookService(limitAndSkipPipeline);

    // const calculateTotalPage =
    //   countData[0].count % Math.round(countData[0].count / limit) !== 0
    //     ? Math.round(countData[0].count / limit) + 1
    //     : Math.round(countData[0].count / limit);

    // const result = {
    //   books,
    //   page,
    //   limit,
    //   totalPage: calculateTotalPage,
    //   // totalPage: 6%3,
    //   isPrevPage: page <= 1 ? false : true,
    //   isNextPage: page == calculateTotalPage ? false : true,
    //   prevPage:
    //     page <= 1
    //       ? ''
    //       : `${NODE_SERVER}:${NODE_PORT}/v1/book?limit=${limit}&page=${
    //           page - 1
    //         }`,
    //   nextPage:
    //     page == calculateTotalPage
    //       ? ''
    //       : `${NODE_SERVER}:${NODE_PORT}/v1/book?limit=${limit}&page=${
    //           page + 1
    //         }`,
    // };

    res.sendWrapped('List of books', httpStatus.OK, ...books);
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

const aggregateBookController = async (req, res) => {
  try {
    const pipeline = [
      {
        $addFields: {
          // Calculate tax
          calculateTax: {
            $multiply: [
              '$price',
              {
                $divide: ['$tax', 100],
              },
            ],
          },
        },
      },
      {
        $addFields: {
          // Total tax
          totalTax: {
            $sum: ['$price', '$calculateTax'],
          },
        },
      },
      {
        $addFields: {
          // Calculate discount
          calculateDiscount: {
            $multiply: [
              '$totalTax',
              {
                $divide: ['$discount', 100],
              },
            ],
          },
        },
      },
      {
        $addFields: {
          // Total price
          totalPrice: {
            $subtract: ['$totalTax', '$calculateDiscount'],
          },
        },
      },
      {
        $project: {
          // Set return to response
          _id: 1,
          titel: 1,
          price: 1,
          tax: 1,
          calculateTax: 1,
          totalTax: 1,
          discount: 1,
          calculateDiscount: 1,
          totalPrice: 1,
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

const aggregateBookMatchSortConcatController = async (req, res) => {
  try {
    let { match } = req.body;

    if (match) {
      match = match.toUpperCase();
    }

    const pipeline = [
      {
        $match: {
          author: match,
        },
      },
      {
        $sort: {
          updated_at: -1,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          price: 1,
          stock: 1,
          author: 1,
          simpleDisplay: {
            $concat: ['$title', ' - ', '$author'],
          },
          created_at: 1,
          updated_at: 1,
        },
      },
    ];

    const books = await aggregationBookService(pipeline);

    res.sendWrapped(
      'Book with operation match, sort, concat',
      httpStatus.OK,
      books
    );
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
  aggregateBookController,
  aggregateBookMatchSortConcatController,
  updateByIdBookController,
  deleteByIdBookController,
};

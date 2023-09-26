require('dotenv').config();
const httpStatus = require('http-status');
const {
  createSongService,
  findByIdSongService,
  findOneByQuerySongService,
  aggregateSongService,
  updateOneByQuerySongService,
  updateManyByQuerySongService,
  deleteOneByQuerySongService,
  deleteManyByQuerySongService,
} = require('../../services/songs/songService');

const { NODE_SERVER, NODE_PORT } = process.env;

const createSongController = async (req, res) => {
  try {
    const requestBody = req.body;

    const song = await createSongService(requestBody);

    if (!song)
      return res.sendWrapped('Fail to create song', httpStatus.CONFLICT);

    res.sendWrapped('Successfully to create song', httpStatus.CREATED, song);
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

const findByIdSongController = async (req, res) => {
  try {
    const { id } = req.params;

    const song = await findByIdSongService(id);

    if (!song)
      return res.sendWrapped(
        `Song with ID ${id} not found`,
        httpStatus.NOT_FOUND
      );

    res.sendWrapped(`Song with ID ${id}`, httpStatus.OK, song);
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

const aggregateFindAllSongController = async (req, res) => {
  try {
    let { page, limit, genre } = req.query;

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

    let limitAndSkipPipeline = [
      {
        $facet: {
          songs: [
            {
              $sort: {
                updated_at: -1,
              },
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
              else: {
                $cond: {
                  if: { $eq: ['$calculateTotalPage', 0] },
                  then: 1,
                  else: { $mod: ['$totalData', '$calculateTotalPage'] },
                },
              },
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
              else: `${NODE_SERVER}:${NODE_PORT}/v1/song?limit=${limit}&page=${
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
              else: `${NODE_SERVER}:${NODE_PORT}/v1/song?limit=${limit}&page=${
                page + 1
              }`,
            },
          },
        },
      },
      {
        $project: {
          songs: '$songs',
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

    if (genre) {
      limitAndSkipPipeline = [
        {
          $facet: {
            songs: [
              {
                $match: {
                  genre,
                },
              },
              {
                $sort: {
                  updated_at: -1,
                },
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
                $match: {
                  genre,
                },
              },
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
                else: {
                  $cond: {
                    if: { $eq: ['$calculateTotalPage', 0] },
                    then: 1,
                    else: { $mod: ['$totalData', '$calculateTotalPage'] },
                  },
                },
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
                else: `${NODE_SERVER}:${NODE_PORT}/v1/song?limit=${limit}&page=${
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
                else: `${NODE_SERVER}:${NODE_PORT}/v1/song?limit=${limit}&page=${
                  page + 1
                }`,
              },
            },
          },
        },
        {
          $project: {
            songs: '$songs',
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
    }

    const songs = await aggregateSongService(limitAndSkipPipeline);

    res.sendWrapped('List song', httpStatus.OK, ...songs);
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

const playByIdSongController = async (req, res) => {
  try {
    const { id } = req.params;

    const filterToPlay = {
      _id: id,
    };

    const filterToUnplayPlay = {
      $and: [
        {
          _id: { $ne: id },
        },
        {
          is_play: { $eq: true },
        },
      ],
    };

    const dataToPlay = {
      $set: {
        is_play: true,
      },
    };

    const dataToUnplay = {
      $set: {
        is_play: false,
      },
    };

    const song = await findByIdSongService(id);

    if (!song)
      return res.sendWrapped(
        `Song with ID ${id} not found`,
        httpStatus.NOT_FOUND
      );

    const unplayAnotherId = await updateManyByQuerySongService(
      filterToUnplayPlay,
      dataToUnplay
    );

    const playSong = await updateOneByQuerySongService(
      filterToPlay,
      dataToPlay
    );

    if (playSong.nModified < 1)
      return res.sendWrapped(
        `Fail to play song with ID ${id}`,
        httpStatus.CONFLICT
      );

    res.sendWrapped(`Song with ID ${id} played`, httpStatus.OK);
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

const updateOneByQuerySongController = async (req, res) => {
  try {
    const { id } = req.params;
    let requestBody = req.body;

    if ('isPlay' in requestBody) {
      requestBody.is_play = requestBody.isPlay;
      delete requestBody.isPlay;
    }

    const filter = {
      _id: id,
    };
    const data = {
      $set: requestBody,
    };

    const song = await findByIdSongService(id);

    if (!song)
      return res.sendWrapped(
        `Song with ID ${id} not found`,
        httpStatus.NOT_FOUND
      );

    const update = await updateOneByQuerySongService(filter, data);

    if (update.nModified < 1)
      return res.sendWrapped(
        `Fail to update song with ID ${id}`,
        httpStatus.CONFLICT
      );

    res.sendWrapped(
      `Update song with ID ${id} successfully`,
      httpStatus.OK,
      update
    );
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

const deleteOneByQuerySongController = async (req, res) => {
  try {
    const { id } = req.params;

    const filter = {
      _id: id,
    };

    const song = await findByIdSongService(id);

    if (!song)
      return res.sendWrapped(
        `Song with ID ${id} not found`,
        httpStatus.NOT_FOUND
      );

    const deleted = await deleteOneByQuerySongService(filter);

    if (deleted.deletedCount < 1)
      return res.sendWrapped(
        `Fail to delete song with ID ${id}`,
        httpStatus.CONFLICT
      );

    res.sendWrapped(`Song with ID ${id} deleted`, httpStatus.OK, deleted);
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

module.exports = {
  createSongController,
  findByIdSongController,
  aggregateFindAllSongController,
  playByIdSongController,
  updateOneByQuerySongController,
  deleteOneByQuerySongController,
};

require('dotenv').config();
const httpStatus = require('http-status');
const {
  createPlaylistService,
  findByIdPlaylistService,
  findOneByQueryPlaylistService,
  aggregatePlaylistService,
  updateOneByQueryPlaylistService,
  updateManyByQueryPlaylistService,
  deleteOneByQueryPlaylistService,
  deleteManyByQueryPlaylistService,
} = require('../../services/playlists/playlistService');
const { findByIdSongService } = require('../../services/songs/songService');

const { NODE_PORT, NODE_SERVER } = process.env;

const createPlaylistController = async (req, res) => {
  try {
    let requestBody = req.body;

    if ('isRun' in requestBody) {
      requestBody.is_run = requestBody.isRun;
      delete requestBody.isRun;
    }

    if ('songs' in requestBody) {
      const refactorKeySongs = requestBody.songs.map((item) => {
        const data = {
          song_id: item.songId,
        };

        return data;
      });

      requestBody.songs = refactorKeySongs;
    }

    const playlist = await createPlaylistService(requestBody);

    if (!playlist)
      return res.sendWrapped(`Fail to create playlist`, httpStatus.CONFLICT);

    res.sendWrapped(
      'Create playlist successfully',
      httpStatus.CREATED,
      playlist
    );
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

const findByIdPlaylistController = async (req, res) => {
  try {
    const { id } = req.params;

    const playlist = await findByIdPlaylistService(id);

    if (!playlist)
      return res.sendWrapped(
        `Playlist with ID ${id} not found`,
        httpStatus.NOT_FOUND
      );

    res.sendWrapped(`Playlist with ID ${id}`, httpStatus.OK, playlist);
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

const aggregateFindAllPlaylistController = async (req, res) => {
  try {
    let { page, limit, title } = req.query;

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
          playlist: [
            {
              $lookup: {
                from: 'songs',
                localField: 'songs.song_id',
                foreignField: '_id',
                as: 'songs',
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
              else: `${NODE_SERVER}:${NODE_PORT}/v1/playlist?limit=${limit}&page=${
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
              else: `${NODE_SERVER}:${NODE_PORT}/v1/playlist?limit=${limit}&page=${
                page + 1
              }`,
            },
          },
        },
      },
      {
        $project: {
          playlist: '$playlist',
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

    if (title) {
      limitAndSkipPipeline = [
        {
          $facet: {
            playlist: [
              {
                $lookup: {
                  from: 'songs',
                  localField: 'songs.song_id',
                  foreignField: '_id',
                  as: 'songs',
                },
              },
              {
                $match: {
                  title,
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
                $group: {
                  _id: '$_id',
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
                else: `${NODE_SERVER}:${NODE_PORT}/v1/playlist?limit=${limit}&page=${
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
                else: `${NODE_SERVER}:${NODE_PORT}/v1/playlist?limit=${limit}&page=${
                  page + 1
                }`,
              },
            },
          },
        },
        {
          $project: {
            playlist: '$playlist',
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

    const playlists = await aggregatePlaylistService(limitAndSkipPipeline);

    res.sendWrapped('List playlist', httpStatus.OK, ...playlists);
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

const addSongInPlaylistController = async (req, res) => {
  try {
    const { id } = req.params;
    let requestBody = req.body;

    if ('songId' in requestBody) {
      requestBody.songs = { song_id: requestBody.songId };
      delete requestBody.songId;
    }

    const playlist = await findByIdPlaylistService(id);

    if (!playlist)
      return res.sendWrapped(
        `Playlist with ID ${id} not found`,
        httpStatus.NOT_FOUND
      );

    const song = await findByIdSongService(requestBody.songs.song_id);

    if (!song)
      return res.sendWrapped(
        `Song with ID ${requestBody.songs.song_id} not found`,
        httpStatus.NOT_FOUND
      );

    const filter = {
      _id: id,
    };

    const data = {
      $push: requestBody,
    };

    const update = await updateOneByQueryPlaylistService(filter, data);

    if (update.nModified < 1)
      return res.sendWrapped(
        `Fail to add song in playlist`,
        httpStatus.CONFLICT
      );

    res.sendWrapped('Add song in playlist successfully', httpStatus.OK, update);
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

const updateOneByIdPlaylistController = async (req, res) => {
  try {
    const { id } = req.params;
    let requestBody = req.body;

    if ('isRun' in requestBody) {
      requestBody.is_run = requestBody.isRun;
      delete requestBody.isRun;
    }

    const playlist = await findByIdPlaylistService(id);

    if (!playlist)
      return res.sendWrapped(
        `Playlist with ID ${id} not found`,
        httpStatus.NOT_FOUND
      );

    const filter = {
      _id: id,
    };

    const data = {
      $set: requestBody,
    };

    const update = await updateOneByQueryPlaylistService(filter, data);

    if (update.nModified < 1)
      return res.sendWrapped(
        `Fail to update playlist with ID ${id}`,
        httpStatus.CONFLICT
      );

    res.sendWrapped(
      `Update playlist with ID ${id} successfully`,
      httpStatus.OK,
      update
    );
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

const deleteOnePlaylistController = async (req, res) => {
  try {
    const { id } = req.params;

    const playlist = await findByIdPlaylistService(id);
    console.log(playlist);
    if (!playlist)
      return res.sendWrapped(
        `Playlist with ID ${id} not found`,
        httpStatus.NOT_FOUND
      );

    const filter = {
      _id: id,
    };

    const deleted = await deleteOneByQueryPlaylistService(filter);

    res.sendWrapped(
      `Delete playlist with ID ${id} successfully`,
      httpStatus.OK,
      deleted
    );
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

const deleteOneSongInPlaylistController = async (req, res) => {
  try {
    const { idPlaylist, idSong } = req.params;

    const filterFind = {
      $and: [
        {
          _id: idPlaylist,
        },
        {
          songs: { $elemMatch: { song_id: idSong } },
        }
      ]
    };

    const playlist = await findOneByQueryPlaylistService(filterFind);

    if (!playlist)
      return res.sendWrapped(
        `Playlist with ID ${idPlaylist} and song ${idSong} not found`,
        httpStatus.NOT_FOUND
      );

    const data = {
      $pull: { songs: { song_id: idSong } },
    };

    const deleted = await updateOneByQueryPlaylistService(filterFind, data);

    res.sendWrapped(
      `Delete song in playlist ${idPlaylist} and song ${idSong}`,
      httpStatus.OK,
      deleted
    );
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

module.exports = {
  createPlaylistController,
  findByIdPlaylistController,
  aggregateFindAllPlaylistController,
  updateOneByIdPlaylistController,
  addSongInPlaylistController,
  deleteOnePlaylistController,
  deleteOneSongInPlaylistController,
};

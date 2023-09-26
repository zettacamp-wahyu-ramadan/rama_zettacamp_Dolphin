const Playlist = require('../../models/playlists/playlist.model');

const createPlaylistService = async (data) => {
  try {
    const playlist = await Playlist.create(data);

    return playlist;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const findByIdPlaylistService = async (id, options) => {
  try {
    const playlist = await Playlist.findById(id, options).populate('songs.song_id');

    return playlist;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const findOneByQueryPlaylistService = async (filter, options) => {
  try {
    const playlist = await Playlist.findOne(filter, options);

    return playlist;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const aggregatePlaylistService = async (pipeline, options) => {
  try {
    const playlist = await Playlist.aggregate(pipeline, options);

    return playlist;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const updateOneByQueryPlaylistService = async (filter, data, options) => {
  try {
    const playlist = await Playlist.updateOne(filter, data, options);

    return playlist;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const updateManyByQueryPlaylistService = async (filter, data, options) => {
  try {
    const playlist = await Playlist.updateMany(filter, data, options);

    return playlist;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const deleteOneByQueryPlaylistService = async (filter, options) => {
  try {
    const playlist = await Playlist.deleteOne(filter, options);

    return playlist;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const deleteManyByQueryPlaylistService = async (filter, options) => {
  try {
    const playlist = await Playlist.deleteMany(filter, options);

    return playlist;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

module.exports = {
  createPlaylistService,
  findByIdPlaylistService,
  findOneByQueryPlaylistService,
  aggregatePlaylistService,
  updateOneByQueryPlaylistService,
  updateManyByQueryPlaylistService,
  deleteOneByQueryPlaylistService,
  deleteManyByQueryPlaylistService,
};

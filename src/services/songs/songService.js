const Song = require('../../models/songs/song.model');

const createSongService = async (data) => {
  try {
    const song = await Song.create(data);

    return song;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const findByIdSongService = async (id, options) => {
  try {
    const song = await Song.findById(id);

    return song;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const findOneByQuerySongService = async (query, options) => {
  try {
    const song = await Song.findOne(query, options);

    return song;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const aggregateSongService = async (pipeline, options) => {
  try {
    const songs = await Song.aggregate(pipeline, options);

    return songs;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const updateOneByQuerySongService = async (query, data, options) => {
  try {
    const song = await Song.updateOne(query, data, options);

    return song;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const updateManyByQuerySongService = async (query, data, options) => {
  try {
    const songs = await Song.updateMany(query, data, options);

    return songs;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const deleteOneByQuerySongService = async (query, options) => {
  try {
    const song = await Song.deleteOne(query, options);

    return song;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

const deleteManyByQuerySongService = async (query, options) => {
  try {
    const songs = await Song.deleteMany(query, options);

    return songs;
  } catch (error) {
    console.error(`Error catch service: ${error}`);
    throw new Error(error);
  }
};

module.exports = {
  createSongService,
  findByIdSongService,
  findOneByQuerySongService,
  aggregateSongService,
  updateOneByQuerySongService,
  updateManyByQuerySongService,
  deleteOneByQuerySongService,
  deleteManyByQuerySongService,
}
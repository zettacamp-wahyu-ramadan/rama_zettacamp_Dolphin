const httpStatus = require('http-status');

const createUserController = async (req, res) => {
  try {
    res.sendWrapped('Create user successfully', httpStatus.CREATED);
  } catch (error) {
    console.error(`Error catch controller: ${error}`);
    throw new Error(error);
  }
};

module.exports = {
  createUserController,
};

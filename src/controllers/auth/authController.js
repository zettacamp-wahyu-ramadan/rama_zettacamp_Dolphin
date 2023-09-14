require('dotenv').config();
const httpStatus = require('http-status');
const { jwtSign } = require('../../helpers/jwtHelper');

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username !== 'admin')
      return res.sendWrapped('Username invalid', httpStatus.BAD_REQUEST);
    if (password !== 'admin')
      return res.sendWrapped('Password invalid', httpStatus.BAD_REQUEST);

    const data = { username, password };

    const token = await jwtSign(data, { expiresIn: '1h' })
    console.log('TOKEN', token)

    res.sendWrapped('Login successfully', httpStatus.OK, {token});
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  loginController,
};

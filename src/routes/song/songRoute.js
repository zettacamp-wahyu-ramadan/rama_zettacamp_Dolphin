const { Router } = require('express');
const httpStatus = require('http-status');
const {
  groupByArtistController,
  groupByGenreController,
  randomListSongsController,
} = require('../../controllers/song/songController');
const { authorization } = require('../../middlewares/authMiddleware');

const router = Router();

router.get('/group/artist', authorization, groupByArtistController);
router.get('/group/genre', authorization, groupByGenreController);
router.get('/randomlist', authorization, randomListSongsController);

module.exports = router;

const { Router } = require('express');
const {
  createSongController,
  findByIdSongController,
  aggregateFindAllSongController,
  playByIdSongController,
  updateOneByQuerySongController,
  deleteOneByQuerySongController,
} = require('../../controllers/songs/songController');

const router = Router();

router.post('/', createSongController);
router.get('/', aggregateFindAllSongController);
router.get('/:id', findByIdSongController);
router.patch('/play/:id', playByIdSongController);
router.patch('/:id', updateOneByQuerySongController);
router.delete('/:id', deleteOneByQuerySongController);

module.exports = router;

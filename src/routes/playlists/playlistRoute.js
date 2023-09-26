const { Router } = require('express');
const {
  createPlaylistController,
  aggregateFindAllPlaylistController,
  findByIdPlaylistController,
  updateOneByIdPlaylistController,
  addSongInPlaylistController,
  deleteOnePlaylistController,
  deleteOneSongInPlaylistController
} = require('../../controllers/playlists/playlistController');

const router = Router();

router.post('/', createPlaylistController);
router.get('/', aggregateFindAllPlaylistController);
router.get('/:id', findByIdPlaylistController);
router.patch('/add/song/:id', addSongInPlaylistController)
router.patch('/:id', updateOneByIdPlaylistController);
router.delete('/:idPlaylist/song/:idSong', deleteOneSongInPlaylistController);
router.delete('/:id', deleteOnePlaylistController);

module.exports = router;

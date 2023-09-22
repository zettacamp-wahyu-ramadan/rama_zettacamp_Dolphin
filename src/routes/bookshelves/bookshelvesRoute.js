const { Router } = require('express');
const {
  createBookshelvesController,
  findAllBookshelvesController,
  findByIdBookshelvesController,
  findByBookIdBookshelvesController,
  updateOneByIdBookshelvesController,
  deleteByIdBookshelvesController,
  updateOneByBookIdBookshelvesController,
  aggregateBookshelvesController,
} = require('../../controllers/bookshelves/bookshelvesController');

const router = Router();

router.post('/', createBookshelvesController);
router.get('/', findAllBookshelvesController);
router.get('/aggregate', aggregateBookshelvesController);
router.get('/:id', findByIdBookshelvesController);
router.get('/book/:book', findByBookIdBookshelvesController);
router.patch('/:id', updateOneByIdBookshelvesController);
router.patch('/:bookshelvesId/book/:bookId', updateOneByBookIdBookshelvesController)
router.delete('/:id', deleteByIdBookshelvesController)

module.exports = router;

const { Router } = require('express');
const {
  createBookController,
  findAllBookController,
  findByIdBookController,
  updateByIdBookController,
  deleteByIdBookController,
  distinctBookController,
  aggregateBookController,
  aggregateBookMatchSortConcatController,
} = require('../../controllers/books/bookController');

const router = Router();

router.post('/', createBookController);
router.get('/', findAllBookController);
router.get('/genre', distinctBookController);
router.get('/aggregate', aggregateBookController);
router.get('/aggregate/matchsortconcat', aggregateBookMatchSortConcatController);
router.get('/:id', findByIdBookController);
router.patch('/:id', updateByIdBookController);
router.delete('/:id', deleteByIdBookController);

module.exports = router;

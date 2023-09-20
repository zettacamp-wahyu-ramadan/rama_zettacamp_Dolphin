const { Router } = require('express');
const {
  createBookController,
  findAllBookController,
  findByIdBookController,
  updateByIdBookController,
  deleteByIdBookController,
  distinctBookController,
} = require('../../controllers/books/bookController');

const router = Router();

router.post('/', createBookController);
router.get('/', findAllBookController);
router.get('/genre', distinctBookController);
router.get('/:id', findByIdBookController);
router.patch('/:id', updateByIdBookController);
router.delete('/:id', deleteByIdBookController);

module.exports = router;

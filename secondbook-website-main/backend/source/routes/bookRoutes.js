import express from 'express';
import { 
  getRecentBooks, 
  sellBook, 
  getBook, 
  updateBook, 
  deleteBook, 
  getGenres, 
  getBooksByGenre 
} from '../controllers/book.controller.js';

const router = express.Router();

// Genre routes
router.get('/genres', getGenres);
router.get('/genre/:genre', getBooksByGenre);

// Book routes
router.get('/recent', getRecentBooks);
router.post('/', sellBook);
router.get('/:id', getBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;

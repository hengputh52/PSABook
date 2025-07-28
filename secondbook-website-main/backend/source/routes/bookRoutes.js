import express from 'express';
import { 
  getRecentBooks, 
  sellBook, 
  getBookById, 
  updateBook, 
  deleteBook, 
  getGenres, 
  getFilteredBooks,
  getMyBooks,
  uploadBookImages
} from '../controllers/book.controller.js';
import { authenticateToken } from '../middleware/auth.js';
import { uploadBookImages as uploadMiddleware } from '../middleware/bookImageUpload.js';

const router = express.Router();

// Genre routes
router.get('/genres', getGenres);

// Book routes
router.get('/recent', getRecentBooks);
router.get('/my-books', authenticateToken, getMyBooks);  // New endpoint for user's books
router.get('/filer', getFilteredBooks);
router.post('/upload-images', authenticateToken, uploadMiddleware.array('images', 5), uploadBookImages); // Upload multiple images
router.post('/', authenticateToken, sellBook);  // Protected route
router.get('/:id', getBookById);
router.put('/:id', authenticateToken, updateBook);  // Protected route  
router.delete('/:id', authenticateToken, deleteBook);  // Protected route

export default router;

import { Book, BookImage } from "../models/index.js";
import { GENRE_VALUES } from "../utils/genreList.js";

// Get all available genres
export const getGenres = async (req, res) => {
  try {
    const genres = GENRE_VALUES.map(value => ({
      value,
      label: value.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    }));
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create (Sell) a Book
export const sellBook = async (req, res) => {
  try {
    const { images, ...bookData } = req.body;
    
    // Validate genre
    if (bookData.genre && !GENRE_VALUES.includes(bookData.genre)) {
      return res.status(400).json({ 
        error: `Invalid genre. Must be one of: ${GENRE_VALUES.join(', ')}` 
      });
    }
    
    const book = await Book.create(bookData);

    // Handle book images if provided
    if (images && Array.isArray(images)) {
      const imageRecords = images.map((url) => ({
        book_id: book.book_id,
        image_url: url,
      }));
      await BookImage.bulkCreate(imageRecords);
    }

    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a Book by ID (with images)
export const getBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id, {
      include: [{ model: BookImage }]
    });
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a Book
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    await book.update(req.body);
    res.json({ message: "Book updated", book });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a Book
// Get recent books with optional genre filtering
export const getRecentBooks = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 8;
    const offset = Number(req.query.offset) || 0;
    const genre = req.query.genre;
    
    const whereClause = {};
    if (genre && GENRE_VALUES.includes(genre)) {
      whereClause.genre = genre;
    }
    
    const books = await Book.findAll({
      where: whereClause,
      include: [{ model: BookImage }],
      order: [['listed_at', 'DESC']],
      limit,
      offset,
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get books by genre
export const getBooksByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    
    if (!GENRE_VALUES.includes(genre)) {
      return res.status(400).json({ 
        error: `Invalid genre. Must be one of: ${GENRE_VALUES.join(', ')}` 
      });
    }
    
    const books = await Book.findAll({
      where: { genre },
      include: [{ model: BookImage }],
      order: [['listed_at', 'DESC']],
    });
    
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    await book.destroy();
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
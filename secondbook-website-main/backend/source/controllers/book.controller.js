import { Book, BookImage, User } from "../models/index.js";
import { GENRE_VALUES } from "../utils/genreList.js";
import { Op } from "sequelize";
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
    console.log("📚 SELL BOOK REQUEST:");
    console.log("👤 Authenticated User:", req.user);
    console.log("📦 Request Body:", req.body);
    
    // Check if user is properly authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "User authentication failed" });
    }
    
    const { images, ...bookData } = req.body;
    
    // Add seller_id from authenticated token (matches Book model field name)
    bookData.seller_id = req.user.id;
    
    console.log("📊 Final Book Data:", bookData);
    
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

    console.log("✅ Book created successfully:", book.book_id);
    res.status(201).json(book);
  } catch (err) {
    console.error("❌ Error creating book:", err);
    res.status(500).json({ error: err.message });
  }
};


// Get book by ID with images and seller info
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id, {
      include: [
        {
          model: BookImage,
          as: "BookImages",
          attributes: ["image_id", "image_url"],
        },
        {
          model: User,
          as: "Seller",
          attributes: ["user_id", "username", "email", "full_name", "profile_photo", "phone_number"],
        },
      ],
    });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
  } catch (err) {
    console.error("❌ Error fetching book:", err.message);
    res.status(500).json({ error: "Internal server error" });
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
// export const getBooksByGenre = async (req, res) => {
//   try {
//     const { genre } = req.params;
    
//     if (!GENRE_VALUES.includes(genre)) {
//       return res.status(400).json({ 
//         error: `Invalid genre. Must be one of: ${GENRE_VALUES.join(', ')}` 
//       });
//     }
    
//     const books = await Book.findAll({
//       where: { genre },
//       include: [{ model: BookImage }],
//       order: [['listed_at', 'DESC']],
//     });
    
//     res.json(books);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Get books sold by the current user
export const getMyBooks = async (req, res) => {
  try {
    console.log("📚 GET MY BOOKS REQUEST:");
    console.log("👤 Authenticated User:", req.user);
    
    const books = await Book.findAll({
      where: { seller_id: req.user.id },
      include: [{ model: BookImage }],
      order: [['listed_at', 'DESC']],
    });
    
    console.log(`📊 Found ${books.length} books for user ${req.user.id}`);
    res.json(books);
  } catch (err) {
    console.error("❌ Error fetching user's books:", err);
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

// Upload multiple book images
export const uploadBookImages = async (req, res) => {
  try {
    console.log("📷 UPLOAD BOOK IMAGES REQUEST:");
    console.log("📦 Files:", req.files);
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    // Extract image URLs from uploaded files
    const imageUrls = req.files.map(file => file.path);
    
    console.log("✅ Images uploaded successfully:", imageUrls);
    res.status(200).json({ 
      message: "Images uploaded successfully",
      images: imageUrls 
    });
  } catch (err) {
    console.error("❌ Error uploading images:", err);
    res.status(500).json({ error: err.message });
  }
};

// filter book based on genre or price
export const getFilteredBooks = async (req, res) => {
  try {
    const { genre, price } = req.query;
    const where = {};

    if (genre && genre !== "All") {
      where.genre = genre;
    }

    if (price && price !== "All") {
      if (price === "Under $5") where.price = { [Op.lt]: 5 };
      else if (price === "$5 - $10") where.price = { [Op.between]: [5, 10] };
      else if (price === "$10 - $20") where.price = { [Op.between]: [10, 20] };
      else if (price === "Above $20") where.price = { [Op.gt]: 20 };
    }

    const books = await Book.findAll({ 
      include: [{model: BookImage}]
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

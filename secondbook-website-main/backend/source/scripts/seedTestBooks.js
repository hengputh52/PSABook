import sequelize from '../config/database.js';
import Book from '../models/book.js';
import BookImage from '../models/book_image.js';
import User from '../models/user.js';

const testBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "fiction",
    price: 12.99,
    description: "A classic American novel about the Jazz Age",
    contact_info: "555-0123"
  },
  {
    title: "To Kill a Mockingbird", 
    author: "Harper Lee",
    genre: "fiction",
    price: 10.50,
    description: "A gripping tale of racial injustice and childhood",
    contact_info: "555-0123"
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "science-fiction",
    price: 14.99,
    description: "Orwell's dystopian masterpiece",
    contact_info: "555-0123"
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "romance",
    price: 9.99,
    description: "Jane Austen's beloved romance novel",
    contact_info: "555-0123"
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "fantasy",
    price: 13.50,
    description: "Tolkien's adventure in Middle-earth",
    contact_info: "555-0123"
  }
];

export const seedTestBooks = async () => {
  try {
    // Check if books already exist
    const bookCount = await Book.count();
    if (bookCount > 0) {
      console.log(`📚 Database already has ${bookCount} books`);
      return;
    }

    console.log('📖 Seeding test data...');
    
    // Create a test user first
    let testUser;
    const userCount = await User.count();
    if (userCount === 0) {
      testUser = await User.create({
        username: 'admin',
        email: 'admin@test.com',
        password_hash: 'temp_hash', // This would normally be properly hashed
        full_name: 'Admin User',
        phone_number: '555-0123'
      });
      console.log('👤 Created test user');
    } else {
      testUser = await User.findOne();
    }
    
    // Create test books
    for (const bookData of testBooks) {
      const book = await Book.create({
        ...bookData,
        seller_id: testUser.user_id,
        listed_at: new Date()
      });
      
      // Add a default book image
      await BookImage.create({
        book_id: book.book_id,
        image_url: `https://via.placeholder.com/200x300/000000/FFFFFF?text=${encodeURIComponent(book.title)}`,
        is_primary: true
      });
    }
    
    console.log(`✅ Successfully seeded ${testBooks.length} test books`);
  } catch (error) {
    console.error('❌ Error seeding test books:', error);
  }
};

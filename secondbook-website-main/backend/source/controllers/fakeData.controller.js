// backend/source/controllers/fakeData.controller.js
let faker = null;

// Try to import faker, but don't fail if it's not available
try {
  if (process.env.NODE_ENV !== 'production') {
    const fakerModule = await import('@faker-js/faker');
    faker = fakerModule.faker;
  }
} catch (error) {
  console.warn('Faker.js not available, fake data generation will be limited');
}

import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';
import bcrypt from 'bcrypt';
import { User, Book, BookImage } from '../models/index.js';
import { BOOK_GENRES } from '../utils/genreList.js';

// Fallback data for when faker is not available
const fallbackData = {
  names: ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown', 'Charlie Davis'],
  bookTitles: ['The Great Adventure', 'Mystery of the Lost Key', 'Science for Beginners', 'Art of Living', 'Digital Future'],
  authors: ['Stephen King', 'J.K. Rowling', 'Isaac Asimov', 'Agatha Christie', 'Dan Brown'],
  emails: ['user1@example.com', 'user2@example.com', 'user3@example.com'],
  addresses: ['123 Main St', '456 Oak Ave', '789 Pine Rd']
};

// Helper function to get random item from array
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Helper function to generate fake data with or without faker
const generateData = {
  name: () => faker ? faker.person.fullName() : getRandomItem(fallbackData.names),
  email: () => faker ? faker.internet.email().toLowerCase() : getRandomItem(fallbackData.emails),
  username: () => faker ? faker.internet.userName().toLowerCase() : `user${Math.floor(Math.random() * 1000)}`,
  address: () => faker ? faker.location.streetAddress() : getRandomItem(fallbackData.addresses),
  bookTitle: () => faker ? faker.lorem.words({ min: 1, max: 4 }) : getRandomItem(fallbackData.bookTitles),
  author: () => faker ? faker.person.fullName() : getRandomItem(fallbackData.authors),
  price: () => faker ? faker.commerce.price({ min: 5, max: 200 }) : (Math.random() * 195 + 5).toFixed(2),
  description: () => faker ? faker.lorem.paragraphs(2) : 'This is a sample book description with interesting content.',
  isbn: () => faker ? faker.commerce.isbn() : `978-${Math.floor(Math.random() * 1000000000)}`,
  condition: () => getRandomItem(['New', 'Like New', 'Very Good', 'Good', 'Fair']),
  genre: () => getRandomItem(BOOK_GENRES).value
};

// How many items to generate per request
const DEFAULT_USER_COUNT = 10;
const DEFAULT_BOOK_COUNT = 25;

export const generateFakeData = async (req, res) => {
  try {
    // Check if faker is available
    if (!faker) {
      return res.status(503).json({ 
        error: 'Fake data generation is not available in production environment',
        message: 'Please use real data or enable development dependencies'
      });
    }

    // create users
    const userPayload = Array.from({ length: Number(req.query.users) || DEFAULT_USER_COUNT }).map(async () => {
      return {
        username: generateData.username(),
        email: generateData.email(),
        full_name: generateData.name(),
        profile_photo: faker ? await uploadToCloudinary(faker.image.avatar(), { folder: 'profiles' }) : 'https://via.placeholder.com/150',
        address: generateData.address(),
        phone_number: faker ? faker.phone.number('+855 #########').slice(0, 20) : '+855123456789',
        password_hash: bcrypt.hashSync('password', 10),
      };
    });

    const userData = await Promise.all(userPayload);
    const users = await User.bulkCreate(userData, { returning: true });

    // create books
    const bookPayloadPromises = Array.from({ length: Number(req.query.books) || DEFAULT_BOOK_COUNT }).map(async () => ({
      title: generateData.bookTitle(),
      genre: generateData.genre(),
      description: generateData.description(),
      price: generateData.price(),
      seller_username: users[Math.floor(Math.random() * users.length)].username,
      image: faker ? await uploadToCloudinary('https://picsum.photos/300/450', { folder: 'books' }) : 'https://picsum.photos/300/450',
    }));
    const bookPayload = await Promise.all(bookPayloadPromises);

    const books = await Book.bulkCreate(bookPayload, { returning: true });

    // images
    const imageRecordsPromises = books.flatMap((book) => {
      const count = faker ? faker.number.int({ min: 1, max: 3 }) : Math.floor(Math.random() * 3) + 1;
      return Array.from({ length: count }).map(() => ({
        book_id: book.book_id,
        image_url: uploadToCloudinary('https://picsum.photos/300/450', { folder: 'books' }),
      }));
    });
    const imageRecords = await Promise.all(imageRecordsPromises);
    await BookImage.bulkCreate(imageRecords);

    res.json({ message: 'Fake data inserted', users: users.length, books: books.length, images: imageRecords.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

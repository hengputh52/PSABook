// backend/source/controllers/fakeData.controller.js
import { faker } from '@faker-js/faker';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';
import bcrypt from 'bcrypt';
import { User, Book, BookImage } from '../models/index.js';

// How many items to generate per request
const DEFAULT_USER_COUNT = 10;
const DEFAULT_BOOK_COUNT = 25;

export const generateFakeData = async (req, res) => {
  try {
    // create users
    const userPayload = Array.from({ length: Number(req.query.users) || DEFAULT_USER_COUNT }).map(async () => {
      return {
        username: faker.internet.userName().toLowerCase(),
        email: faker.internet.email().toLowerCase(),
        full_name: faker.person.fullName(),
        profile_photo: await uploadToCloudinary(faker.image.avatar(), { folder: 'profiles' }),
        address: faker.location.streetAddress(),
        phone_number: faker.phone.number('+855 #########').slice(0, 20),
        password_hash: bcrypt.hashSync('password', 10),
      };
    });

    const userData = await Promise.all(userPayload);
    const users = await User.bulkCreate(userData, { returning: true });

    // create books
    const bookPayloadPromises = Array.from({ length: Number(req.query.books) || DEFAULT_BOOK_COUNT }).map(async () => ({
      title: faker.commerce.productName(),
      genre: faker.helpers.arrayElement(['Fiction', 'Fantasy', 'Non-Fiction', 'Sci-Fi', 'History']),
      description: faker.lorem.paragraph(),
      price: faker.commerce.price({ min: 2, max: 50 }),
      seller_username: faker.helpers.arrayElement(users).username,
      image: await uploadToCloudinary('https://picsum.photos/300/450', { folder: 'books' }),
    }));
    const bookPayload = await Promise.all(bookPayloadPromises);

    const books = await Book.bulkCreate(bookPayload, { returning: true });

    // images
    const imageRecordsPromises = books.flatMap((book) => {
      const count = faker.number.int({ min: 1, max: 3 });
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

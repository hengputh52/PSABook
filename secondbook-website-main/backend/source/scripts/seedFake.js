// backend/source/scripts/seedFake.js
// Run with: node source/scripts/seedFake.js
// Populates the MySQL database with random Users and Books using Faker.

import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import sequelize from '../config/database.js';
import { User, Book, BookImage } from '../models/index.js';

const USER_COUNT = 15;
const BOOK_COUNT = 40;

async function main() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    // Clear existing data (optional)
    await BookImage.destroy({ where: {} });
    await Book.destroy({ where: {} });
    await User.destroy({ where: {} });

    // --- Users ---
    const userData = Array.from({ length: USER_COUNT }).map(() => ({
      username: faker.internet.userName().toLowerCase(),
      email: faker.internet.email().toLowerCase(),
      password_hash: bcrypt.hashSync('password', 10), // default pwd = "password"
      full_name: faker.person.fullName(),
      profile_photo: faker.image.avatar(),
      address: faker.location.streetAddress(),
      phone_number: faker.phone.number('+855 #########').slice(0, 20),
    }));
    const users = await User.bulkCreate(userData, { returning: true });

    // --- Books ---
    const bookData = Array.from({ length: BOOK_COUNT }).map(() => {
      const seller = faker.helpers.arrayElement(users);
      return {
        seller_id: seller.user_id,
        title: faker.commerce.productName(),
        author: faker.person.fullName(),
        genre: faker.helpers.arrayElement(['Fiction', 'Fantasy', 'Non-Fiction', 'Sci-Fi', 'History']),
        isbn: faker.number.int({ min: 1000000000000, max: 9999999999999 }).toString(),
        price: faker.commerce.price({ min: 2, max: 50 }),
        description: faker.lorem.paragraph(),
        contact_info: seller.phone_number,
      };
    });
    const books = await Book.bulkCreate(bookData, { returning: true });

    // --- Book Images ---
    const imageRecords = books.flatMap((book) => {
      const imageCount = faker.number.int({ min: 1, max: 3 });
      return Array.from({ length: imageCount }).map(() => ({
        book_id: book.book_id,
        image_url: faker.image.urlPicsumPhotos({ width: 300, height: 450 }),
      }));
    });
    await BookImage.bulkCreate(imageRecords);

    console.log(`Seeded ${users.length} users, ${books.length} books, ${imageRecords.length} images.`);
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

main();

import User from "./user.js";
import Book from "./book.js";
import BookImage from "./book_image.js";
import CartItem from "./cart.js";
import Transaction from "./transcation.js";

// User & Book
User.hasMany(Book, { foreignKey: "seller_id", onDelete: "CASCADE" });
Book.belongsTo(User, { foreignKey: "seller_id" });

// Book & BookImage
Book.hasMany(BookImage, { foreignKey: "book_id", onDelete: "CASCADE" });
BookImage.belongsTo(Book, { foreignKey: "book_id" });

// User & CartItem
User.hasMany(CartItem, { foreignKey: "user_id", onDelete: "CASCADE" });
CartItem.belongsTo(User, { foreignKey: "user_id" });

// Book & CartItem
Book.hasMany(CartItem, { foreignKey: "book_id", onDelete: "CASCADE" });
CartItem.belongsTo(Book, { foreignKey: "book_id" });

// Book & Transaction
Book.hasMany(Transaction, { foreignKey: "book_id", onDelete: "CASCADE" });
Transaction.belongsTo(Book, { foreignKey: "book_id" });

// User & Transaction (buyer)
User.hasMany(Transaction, { foreignKey: "buyer_id", as: "Purchases", onDelete: "CASCADE" });
Transaction.belongsTo(User, { foreignKey: "buyer_id", as: "Buyer" });

// User & Transaction (seller)
User.hasMany(Transaction, { foreignKey: "seller_id", as: "Sales", onDelete: "CASCADE" });
Transaction.belongsTo(User, { foreignKey: "seller_id", as: "Seller" });

export { User, Book, BookImage, CartItem, Transaction };
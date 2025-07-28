import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { books } from "./BookList";
import "../styles/BookList.css";

const BookSciFi = () => {
  const [cart, setCart] = useState([]);

  // Filter books for Sci-Fi genre (by title or genre if available)
  const sciFiBooks = books.filter(
    (book) =>
      (book.genre &&
        (book.genre.toLowerCase().includes("science fiction") ||
          book.genre.toLowerCase().includes("sci-fi"))) ||
      book.title.toLowerCase().includes("science fiction") ||
      book.title.toLowerCase().includes("sci-fi")
  );

  useEffect(() => {
    // Fetch cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleAddToCart = (book) => {
    if (!cart.some((b) => b.id === book.id)) {
      const updatedCart = [...cart, book];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      alert(`${book.title} has been added to your cart!`);
    } else {
      alert(`${book.title} is already in your cart.`);
    }
  };

  const isBookInCart = (bookId) => {
    return cart.some((b) => b.id === bookId);
  };

  return (
    <div className="book-list">
      {sciFiBooks.map((book) => (
        <div key={book.id} className="book-card">
          <Link to={`/book/science-fiction/${book.id}`}>
            <img src={book.image} alt={book.title} />
            <h4>{book.title}</h4>
            <p>{book.price}</p>
          </Link>
          <button
            onClick={() => handleAddToCart(book)}
            disabled={isBookInCart(book.id)}
          >
            {isBookInCart(book.id) ? "Already Added" : "Add to Cart"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default BookSciFi;

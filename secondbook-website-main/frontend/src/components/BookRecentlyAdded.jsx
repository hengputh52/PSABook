import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../styles/BookRecentlyAdded.css";
import axios from "axios";

// kept for backward compatibility
export const hardcodedBooks = [];

const BookRecentlyAdded = () => {
  const [recentlyAddedBooks, setRecentlyAddedBooks] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 8;

  useEffect(() => {
    const fetchRecent = async (newOffset = 0, append = false) => {
      try {
        const base = "http://localhost:3000"; // Updated to match backend port
        const res = await axios.get(`${base}/api/books/recent?limit=${limit}&offset=${newOffset}`);
        console.log('Recent books response:', res.data); // Debug log
        setRecentlyAddedBooks(prev => append ? [...prev, ...res.data] : res.data);
      } catch (err) {
        console.error("Failed to load recent books", err);
        // Fallback to localStorage for backward compatibility
        const localBooks = JSON.parse(localStorage.getItem("recentlyAddedBooks")) || [];
        if (localBooks.length > 0) {
          setRecentlyAddedBooks(localBooks.slice(newOffset, newOffset + limit));
        }
      }
    };
    fetchRecent(0, false);
  }, []);

  const handleSeeMore = async () => {
    const newOffset = offset + limit;
    try {
      const base = "http://localhost:3000";
      const res = await axios.get(`${base}/api/books/recent?limit=${limit}&offset=${newOffset}`);
      setRecentlyAddedBooks(prev => [...prev, ...res.data]);
      setOffset(newOffset);
    } catch (err) {
      console.error("Failed to load more books", err);
    }
  };

  const handleAddToCart = (book) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.some((b) => b.id === book.id)) {
      const updatedCart = [...cart, book];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      alert(`${book.title} has been added to your cart!`);
    } else {
      alert(`${book.title} is already in your cart.`);
    }
  };

  const isBookInCart = (bookId) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.some((b) => b.id === bookId);
  };

  return (
    <div className="book-recently-added-container">
      <div className="book-recently-added-list">
        {recentlyAddedBooks.map((book) => (
          <div className="book-card" key={book.book_id || book.id}>
            <Link to={`/book/${book.book_id || book.id}`}>
              <img src={book.image || (book.BookImages && book.BookImages[0]?.image_url)} alt={book.title} className="book-image" />
              <h3>{book.title}</h3>
              <p>${Number(book.price).toFixed(2)}</p>
            </Link>
            <button
              className="add-to-cart-btn"
              onClick={() => handleAddToCart(book)}
              disabled={isBookInCart(book.book_id || book.id)}
            >
              {isBookInCart(book.book_id || book.id) ? "Already Added" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
      {recentlyAddedBooks.length >= limit && (
        <p className="see-more pulse" onClick={handleSeeMore}>see more</p>
      )}
    </div>
  );
};

export default BookRecentlyAdded;
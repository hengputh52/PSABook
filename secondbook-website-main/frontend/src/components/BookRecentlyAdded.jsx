import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/BookRecentlyAdded.css";
import axios from "axios";
import { fetchRecentBooks } from "../service/bookApi";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
const limit = 8;

const BookRecentlyAdded = () => {
  const [recentlyAddedBooks, setRecentlyAddedBooks] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchRecent = async (newOffset = 0, append = false) => {
      try {
        const books = await fetchRecentBooks({ limit, offset: newOffset });
        setRecentlyAddedBooks((prev) => (append ? [...prev, ...books] : books));
      } catch (err) {
        console.error("Failed to load recent books", err);
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
      const moreBooks = await fetchRecentBooks({ limit, offset: newOffset });
      setRecentlyAddedBooks((prev) => [...prev, ...moreBooks]);
      setOffset(newOffset);
    } catch (err) {
      console.error("Failed to load more books", err);
    }
  };

  const handleAddToCart = async (book) => {
    const storedUser = localStorage.getItem("userProfile");

    if (!storedUser) {
      alert("Please log in to add items to your cart.");
      return;
    }

    let user;
    try {
      user = JSON.parse(storedUser);
    } catch (e) {
      alert("User data corrupted. Please log in again.");
      return;
    }

    if (!user || !user.user_id) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      await axios.post(`${API_BASE}/api/cart/add`, {
        user_id: user.user_id,
        book_id: book.book_id || book.id,
      });
      alert(`${book.title} has been added to your cart!`);
    } catch (error) {
      if (error.response?.status === 409) {
        alert(`${book.title} is already in your cart.`);
      } else {
        console.error("Failed to add to cart", error);
        alert("Failed to add book to cart. Please try again.");
      }
    }
  };

  const isBookInCart = (bookId) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.some((b) => b.book_id === bookId || b.id === bookId);
  };

  return (
    <div className="book-recently-added-container">
      <div className="book-recently-added-list">
        {recentlyAddedBooks.map((book) => {
          const bookId = book.book_id || book.id;
          const imageUrl =
            book.image || book.BookImages?.[0]?.image_url || "/default-book.png";

          return (
            <div className="book-card" key={bookId}>
              <Link to={`/book/${bookId}`}>
                <img
                  src={imageUrl}
                  alt={book.title}
                  className="book-image"
                  style={{ marginLeft: 0 }}
                />
                <h3>{book.title}</h3>
                <p>${Number(book.price).toFixed(2)}</p>
              </Link>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(book)}
                disabled={isBookInCart(bookId)}
              >
                {isBookInCart(bookId) ? "Already Added" : "Add to Cart"}
              </button>
            </div>
          );
        })}
      </div>

      {recentlyAddedBooks.length >= limit && (
        <p className="see-more pulse" onClick={handleSeeMore}>
          see more
        </p>
      )}
    </div>
  );
};

export default BookRecentlyAdded;

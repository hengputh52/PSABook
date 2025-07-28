import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../styles/BookRecentlyAdded.css";
import axios from "axios";
import { fetchRecentBooks } from "../service/bookApi";

// kept for backward compatibility
export const hardcodedBooks = [];
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const BookRecentlyAdded = () => {
  const [recentlyAddedBooks, setRecentlyAddedBooks] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 8;

  // useEffect(() => {
  //   const fetchRecent = async (newOffset = 0, append = false) => {
  //     try {
  //       const base = "http://localhost:3000"; // Updated to match backend port
  //       const res = await axios.get(`${base}/api/books/recent?limit=${limit}&offset=${newOffset}`);
  //       console.log('Recent books response:', res.data); // Debug log
  //       setRecentlyAddedBooks(prev => append ? [...prev, ...res.data] : res.data);
  //     } catch (err) {
  //       console.error("Failed to load recent books", err);
  //       // Fallback to localStorage for backward compatibility
  //       const localBooks = JSON.parse(localStorage.getItem("recentlyAddedBooks")) || [];
  //       if (localBooks.length > 0) {
  //         setRecentlyAddedBooks(localBooks.slice(newOffset, newOffset + limit));
  //       }
  //     }
  //   };
  //   fetchRecent(0, false);
  // }, []);

  useEffect(() => {
  const fetchRecent = async (newOffset = 0, append = false) => {
    try {
      const books = await fetchRecentBooks({ limit, offset: newOffset });
      setRecentlyAddedBooks(prev => append ? [...prev, ...books] : books);
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

  // const handleSeeMore = async () => {
  //   const newOffset = offset + limit;
  //   try {
  //     const base = "http://localhost:3000";
  //     const res = await axios.get(`${base}/api/books/recent?limit=${limit}&offset=${newOffset}`);
  //     setRecentlyAddedBooks(prev => [...prev, ...res.data]);
  //     setOffset(newOffset);
  //   } catch (err) {
  //     console.error("Failed to load more books", err);
  //   }
  // };


  const handleSeeMore = async () => {
  const newOffset = offset + limit;
  try {
    const moreBooks = await fetchRecentBooks({ limit, offset: newOffset });
    setRecentlyAddedBooks(prev => [...prev, ...moreBooks]);
    setOffset(newOffset);
  } catch (err) {
    console.error("Failed to load more books", err);
  }
};

const handleAddToCart = async (book) => {
  const user = JSON.parse(localStorage.getItem("userProfile")); // Assumes you store user info after login
  if (!user || !user.id) {
    alert("Please log in to add items to your cart.");
    return;
  }

  try {
    const response = await axios.post(`${API_BASE}/api/cart/add`, {
      user_id: user.id,
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
    return cart.some((b) => b.id === bookId);
  };

  return (
    <div className="book-recently-added-container">
      <div className="book-recently-added-list">
        {recentlyAddedBooks.map((book) => (
          <div className="book-card" key={book.book_id || book.id}>
            <Link to={`/book/${book.book_id || book.id}`}>
              <img src={book.image || (book.BookImages && book.BookImages[0]?.image_url)} alt={book.title} className="book-image"  style={{marginLeft: 0}}/>
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
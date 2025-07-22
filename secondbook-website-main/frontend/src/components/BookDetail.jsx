import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/BookDetail.css";
import { fantasyBooks } from "./Book_fantasy";
import { fictionBooks } from "./Fiction";
import { historyBooks } from "./History";
import { sciFiBooks } from "./BookSciFi";
import { Non_fictionBooks } from "./Non_fiction";
import { books } from "./BookList";
import { hardcodedBooks } from "./BookRecentlyAdded";

// Map genres to their respective book arrays
const genres = {
  fantasy: fantasyBooks,
  fiction: fictionBooks,
  history: historyBooks,
  "non-fiction": Non_fictionBooks,
  "science-fiction": sciFiBooks,
  general: books,
  "recently-added": hardcodedBooks,
};

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [images, setImages] = useState([]);
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const base = import.meta.env.VITE_API_BASE || "http://localhost:3000";
        const res = await axios.get(`${base}/api/books/${id}`);
        setBook(res.data);
        // If book has BookImages array, use those; else fallback to image/bookImage
        if (res.data.BookImages && res.data.BookImages.length > 0) {
          setImages(res.data.BookImages.map(img => img.image_url));
        } else {
          setImages([res.data.image || res.data.bookImage]);
        }
      } catch (err) {
        setBook(null);
      }
    };
    fetchBook();
  }, [id]);

  if (!book) {
    return <p>Book not found!</p>;
  }

  const handlePrevImg = () => {
    setCurrentImg((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const handleNextImg = () => {
    setCurrentImg((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  const handleBuyNow = () => {
    navigate("/payment", { state: { book } });
  };
  const handleAddToCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userProfile"));
      if (!user || !user.user_id) {
        alert("Please log in to add to cart.");
        return;
      }
      const base = import.meta.env.VITE_API_BASE || "http://localhost:3000";
      const res = await axios.post(`${base}/api/cart/add`, {
        user_id: user.user_id,
        book_id: book.book_id || book.id,
        quantity: 1
      });
      alert(res.data.message || "Book added to cart!");
    } catch (err) {
      alert("Failed to add to cart");
    }
  };
  const handleSellerClick = () => {
    navigate(`/profile/${book.sellerId || book.seller}`, { state: { seller: book.seller } });
  };

  return (
    <div className="book-detail">
      <div className="book-detail-container book-detail-flex">
        {/* Left: Image carousel */}
        <div className="book-carousel">
          <button className="carousel-arrow left-arrow" onClick={handlePrevImg}>&lt;</button>
          <img
            src={images[currentImg]}
            alt={book.title || book.bookTitle}
            className="book-image"
          />
          <button className="carousel-arrow right-arrow" onClick={handleNextImg}>&gt;</button>
        </div>
        {/* Right: Book info */}
        <div className="book-info">
          <h2 className="book-title">{book.title || book.bookTitle}</h2>
          <h3 className="book-author">By {book.author || "Unknown"}</h3>
          <h3 className="book-genre">{book.genre}</h3>
          <p className="book-price"><strong>Price:</strong> {book.price}</p>
        </div>
      </div>
      <div className="book-extra-container">
        <div className="book-extra">
          <p>
            <strong>Seller Name:</strong>{" "}
            <span className="seller-link" onClick={handleSellerClick}>
              {book.seller || "Not Available"}
            </span>
          </p>
          <p>
            <strong>Telephone 1:</strong> {book.telephone1 || book.telephone || "Not Available"}
          </p>
          <p>
            <strong>Telephone 2:</strong> {book.telephone2 || "Not Available"}
          </p>
          <p>
            <strong>Address:</strong> {book.address || "Not Available"}
          </p>
        </div>
        <div className="description-section">
          <p><strong>Description:</strong> {book.description || "No description available."}</p>
        </div>
      </div>
      <div className="book-detail-btns">
        <button className="add-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button className="buy-btn" onClick={handleBuyNow}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default BookDetail;

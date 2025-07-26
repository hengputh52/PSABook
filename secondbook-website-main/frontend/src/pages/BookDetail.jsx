import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/BookDetail.css";
import { fetchBookById } from "../service/bookApi";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await fetchBookById(id);
        setBook(data);
        const imageUrls = data.BookImages?.map(img => img.image_url) || [];
        setImages(imageUrls.length > 0 ? imageUrls : ["/placeholder.png"]);
      } catch (err) {
        console.error("Error Loading book:", err.message);
      }
    };
    fetchBook();
  }, [id]);

  if (!book) return <p>Book not found!</p>;

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
        quantity: 1,
      });

      alert(res.data.message || "Book added to cart!");
    } catch (err) {
      alert("Failed to add to cart");
    }
  };

  const handleSellerClick = () => {
    if (book.Seller && book.Seller.user_id) {
      navigate(`/profile/${book.Seller.user_id}`, { state: { seller: book.Seller } });
    }
  };

  return (
    <div className="book-detail">
      <div className="book-detail-container book-detail-flex">
        {/* Left: Image carousel */}
        <div className="book-carousel">
          <button className="carousel-arrow left-arrow" onClick={handlePrevImg}>&lt;</button>
          <img
            src={images[currentImg]}
            alt={book.title || "Book Cover"}
            className="book-image"
          />
          <button className="carousel-arrow right-arrow" onClick={handleNextImg}>&gt;</button>
        </div>

        {/* Right: Book info */}
        <div className="book-info">
          <h2 className="book-title">{book.title || book.bookTitle}</h2>
          <h3 className="book-author">By {book.author || "Unknown"}</h3>
          <h3 className="book-genre">{book.genre}</h3>
          <p className="book-price"><strong>Price:</strong> ${book.price}</p>
        </div>
      </div>

      <div className="book-extra-container">
        <div className="book-extra">
          <p>
            <strong>Seller Name:</strong>{" "}
            {book.Seller ? (
              <span className="seller-link" onClick={handleSellerClick}>
                {book.Seller.full_name || book.Seller.username}
              </span>
            ) : (
              "Not Available"
            )}
          </p>
          <p>
            <strong>Contact Info:</strong>{" "}
            {book.Seller?.email || book.contact_info || "Not Available"}
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            {book.Seller?.phone_number || book.telephone || "Not Available"}
          </p>
          <p>
            <strong>Address:</strong>{" "}
            {book.Seller?.address || book.address || "Not Available"}
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

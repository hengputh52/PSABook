import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../styles/BookList.css";

const Book_fantasy = () => {
  const [cart, setCart] = useState([]);

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
      {fantasyBooks.map((book) => (
        <div key={book.id} className="book-card">
          <Link to={`/book/fantasy/${book.id}`}>
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

export default Book_fantasy;
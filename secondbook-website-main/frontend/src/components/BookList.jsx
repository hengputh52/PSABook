import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/BookList.css";
import { fetchFilteredBooks } from "../service/bookApi";

const BookList = ({ filter, searchTerm, showMore }) => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const filtered = await fetchFilteredBooks(filter.genre, filter.price);
        const result = searchTerm
          ? filtered.filter((book) =>
              book.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : filtered;
        setBooks(result);
        setVisibleCount(6); // Reset visibility on new filter/search
      } catch (err) {
        console.error("Error loading books:", err);
      }
    };

    loadBooks();
  }, [filter, searchTerm]);

  const handleAddToCart = (book) => {
    if (!cart.some((item) => item.id === book.id)) {
      const updatedCart = [...cart, book];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  return (
    <div className="book-list">
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <>
          {books.slice(0, showMore ? books.length : visibleCount).map((book) => (
            
            <div key={book.id} className="book-card">
              <Link to={`/book/${book.genre || "general"}/${book.id}`}>
                <img src={book.image || book.BookImages?.[0]?.image_url || "/default-book.png"} alt={book.title} />
                <h4>{book.title}</h4>
                <p>{book.price}$</p>
              </Link>
              <button
                onClick={() => handleAddToCart(book)}
                disabled={cart.some((item) => item.id === book.id)}
              >
                {cart.some((item) => item.id === book.id)
                  ? "Already Added"
                  : "Add to Cart"}
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default BookList;

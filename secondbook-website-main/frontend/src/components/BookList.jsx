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

  // const handleAddToCart = (book) => {
  //   if (!cart.some((item) => item.id === book.id)) {
  //     const updatedCart = [...cart, book];
  //     setCart(updatedCart);
  //     localStorage.setItem("cart", JSON.stringify(updatedCart));
  //   }
  // };
  const handleAddToCart = async (book) => {
    const storedUser = localStorage.getItem("userProfile");

    if (!storedUser) {
      alert("Please log in to add items to your cart.");
      return;
    }

    let user;
    try {
      user = JSON.parse(storedUser);
    } catch {
      alert("User data corrupted. Please log in again.");
      return;
    }

    if (!user?.user_id) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      await axios.post(`${API_BASE}/api/cart/add`, {
        user_id: user.user_id,
        book_id: book.book_id || book.id,
      });

      const updatedCart = [...cart, book];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

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
    return cart.some((b) => b.book_id === bookId || b.id === bookId);
  };



  return (
    <div className="book-list">
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <>
          {books.slice(0, showMore ? books.length : visibleCount).map((book) => (
            
            <div key={book.id || book.book_id} className="book-card">
              <Link to={`/book/${book.genre || "general"}/${book.id}`}>
                <img src={book.image || book.BookImages?.[0]?.image_url || "/default-book.png"} alt={book.title} />
                <h4>{book.title}</h4>
                <p>{book.price}$</p>
              </Link>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(book)}
                disabled={isBookInCart(book.id || book.book_id)}
              >
                {isBookInCart(book.id || book.book_id) ? "Already Added" : "Add to Cart"}
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default BookList;

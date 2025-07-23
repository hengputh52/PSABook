import React, { useState, useEffect } from "react";
import "../styles/YourCart.css";

const YourCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your entire cart?")) {
      setCart([]);
      localStorage.setItem("cart", JSON.stringify([]));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, book) => {
      const price = parseFloat(book.price.replace("$", ""));
      return total + price;
    }, 0).toFixed(2);
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2 className="section-title">Your Cart</h2>
        {cart.length > 0 && (
          <button className="clear-cart-btn" onClick={handleClearCart}>
            Clear Cart
          </button>
        )}
      </div>

      {cart.length > 0 ? (
        <>
          <div className="table-container">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Book Title</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((book) => (
                  <tr key={book.id}>
                    <td>
                      <img 
                        src={book.image} 
                        alt={book.title}
                        className="cart-book-image"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/60x80?text=No+Image";
                        }}
                      />
                    </td>
                    <td className="book-title">{book.title}</td>
                    <td>{book.author || "N/A"}</td>
                    <td>{book.genre || "N/A"}</td>
                    <td className="book-description">{book.description || "N/A"}</td>
                    <td className="book-price">{book.price}</td>
                    <td>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveFromCart(book.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="cart-summary">
            <div className="total-section">
              <h3>Total: ${calculateTotal()}</h3>
              <button className="checkout-btn">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="empty-cart">
          <div className="empty-cart-content">
            <h3>Your cart is empty</h3>
            <p>Browse our collection and add some books to your cart!</p>
            <a href="/" className="continue-shopping-btn">
              Continue Shopping
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourCart;

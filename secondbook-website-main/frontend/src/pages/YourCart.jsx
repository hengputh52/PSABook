import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/YourCart.css";
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
const YourCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));
  const userId = userProfile?.user_id;
  useEffect(() => {
    if (!userId) return;
    axios.get(`${API_BASE}/api/cart/user/${userId}`)
      .then((res) => {
        setCartItems(res.data);
      })
      .catch((err) => {
        console.error("Error fetching cart:", err);
      });
  }, [userId]);

  const handleRemoveFromCart = (cart_item_id) => {
    axios.delete(`${API_BASE}/api/cart/${cart_item_id}`)
      .then(() => {
        setCartItems(prev => prev.filter(item => item.cart_item_id !== cart_item_id));
      })
      .catch((err) => {
        console.error("Error removing item:", err);
      });
  };

  const handleClearCart = async () => {
    if (window.confirm("Are you sure you want to clear your entire cart?")) {
      for (const item of cartItems) {
        await axios.delete(`${API_BASE}/api/cart/${item.cart_item_id}`);
      }
      setCartItems([]);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.Book?.price || 0);
      return total + price;
    }, 0).toFixed(2);
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2 className="section-title">Your Cart</h2>
        {cartItems.length > 0 && (
          <button className="clear-cart-btn" onClick={handleClearCart}>
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length > 0 ? (
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
                {cartItems.map((item) => {
                  const book = item.Book;
                  const imageUrl = book?.BookImages?.[0]?.image_url;
                  return (
                    <tr key={item.cart_item_id}>
                      <td>
                        <img
                          src={imageUrl || "https://via.placeholder.com/60x80?text=No+Image"}
                          alt={book?.title}
                          className="cart-book-image"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/60x80?text=No+Image";
                          }}
                        />
                      </td>
                      <td className="book-title">{book?.title || "N/A"}</td>
                      <td>{book?.author || "N/A"}</td>
                      <td>{book?.genre || "N/A"}</td>
                      <td className="book-description">{book?.description || "N/A"}</td>
                      <td className="book-price">${book?.price || "0.00"}</td>
                      <td>
                        <button
                          className="remove-btn"
                          onClick={() => handleRemoveFromCart(item.cart_item_id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
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

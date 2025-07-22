import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/PaymentPage.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state || {}; // Get book details from state
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!address || !paymentMethod) {
      setError("Please fill in all fields.");
      return;
    }

    // Simulate order confirmation
    console.log("Order confirmed for:", book.title);
    console.log("Address:", address);
    console.log("Payment Method:", paymentMethod);

    // Redirect to a confirmation page or home
    navigate("/confirmation", { state: { book, address, paymentMethod } });
  };

  if (!book) {
    return <p>No book selected for payment!</p>; // Display a message if no book details are passed
  }

  return (
    <div className="payment-page-container">
      <h2>Complete Your Purchase</h2>
      {book && (
        <div className="book-summary">
          <h3>{book.title}</h3>
          <img src={book.image} alt={book.title} />
          <p><strong>Price:</strong> {book.price}</p>
        </div>
      )}
      <div className="payment-form">
        {error && <p className="error-message">{error}</p>}
        <textarea
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="payment-input"
        />
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="payment-input"
        >
          <option value="">Select Payment Method</option>
          <option value="credit-card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="cash-on-delivery">Cash on Delivery</option>
        </select>
        <button className="submit-btn" onClick={handleSubmit}>
          Confirm Purchase
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
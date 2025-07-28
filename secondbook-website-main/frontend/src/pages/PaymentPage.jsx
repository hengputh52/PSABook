// src/pages/PaymentPage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/PaymentPage.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state || {};
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!address || !paymentMethod) {
      setError("Please fill in all fields.");
      return;
    }

    if (paymentMethod === "credit_card") {
      navigate("/credit-card", { state: { book, address } });
    } else if (paymentMethod === "bank_transfer") {
      navigate("/qr-code", { state: { book, address } });
    }
  };

  if (!book) return <p>No book selected for payment!</p>;

  return (
    <div className="payment-page-container">
      <h2>Complete Your Purchase</h2>
      <div className="book-summary">
        <h3>{book.title}</h3>
        <img src={book.image} alt={book.title} />
        <p><strong>Price:</strong> ${book.price}</p>
      </div>
      <div className="payment-form">
        {error && <p className="error-message">{error}</p>}
        <textarea
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Select Payment Method</option>
          <option value="credit_card">Credit Card</option>
          <option value="bank_transfer">ABA Bank QR Code</option>
        </select>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default PaymentPage;

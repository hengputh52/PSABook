// src/pages/CreditCardPage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/CreditCardPage.css"

const API_BASE = import.meta.env.VITE_API_URL;

const CreditCardPage = () => {
  const { state } = useLocation();
  const { book, address } = state || {};
  const user = JSON.parse(localStorage.getItem("userProfile"));
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!cardNumber || !cvv || !expiry) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/api/transaction`, {
        book_id: book.book_id,
        buyer_id: user.user_id,
        seller_id: book.seller_id,
        amount: book.price,
        address,
        payment_method: "credit_card",
      });

      navigate("/confirmation", { state: res.data });
    } catch (err) {
      setError("Payment failed. Try again.");
    }
  };

  return (
    <div>
      <h2>Enter Credit Card Info</h2>
      {error && <p>{error}</p>}
      <input
        placeholder="Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <input
        placeholder="Expiry Date (MM/YY)"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
      />
      <input
        placeholder="CVV"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
      />
      <button onClick={handleSubmit}>Confirm Payment</button>
    </div>
  );
};

export default CreditCardPage;

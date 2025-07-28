// src/pages/QRCodePage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/QRCodePage.css";

const API_BASE = import.meta.env.VITE_API_URL;

const QRCodePage = () => {
  const { state } = useLocation();
  const { book, address } = state || {};
  const user = JSON.parse(localStorage.getItem("userProfile"));
  const navigate = useNavigate();

  const handleConfirm = async () => {
    try {
      const res = await axios.post(`${API_BASE}/api/transaction`, {
        book_id: book.book_id,
        buyer_id: user.user_id,
        seller_id: book.seller_id,
        amount: book.price,
        address,
        payment_method: "bank_transfer",
      });

      navigate("/confirmation", { state: res.data });
    } catch (err) {
      console.error(err);
      alert("Transaction failed");
      setTimeout(() => navigate("/"), 100);
    }
  };

  return (
    <div class="qr-code-container">
      <h2>Scan to Pay</h2>
      <img src="/qrcode.jpg" alt="ABA QR Code" style={{ width: "300px" }} />
      <button onClick={handleConfirm}>I Have Paid</button>
    </div>
  );
};

export default QRCodePage;

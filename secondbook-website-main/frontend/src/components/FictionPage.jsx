import React from "react";
import BookList from "./BookList";
import "../styles/FictionPage.css";
import Fiction from "./Fiction";

const FictionPage = () => {
  return (
    <div className="fiction-page">
      <div className="fiction-banner">
        <h2>
        “ Fiction reveals truth that reality obscures.”
        </h2>
      </div>

      <section className="book-section">
        <h3>Best Fiction Books</h3>
        <Fiction />
        <p className="see-more">see more</p>
      </section>
    </div>
  );
}

export default FictionPage;
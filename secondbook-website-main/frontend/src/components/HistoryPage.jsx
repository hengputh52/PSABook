import React from "react";
import BookList from "./BookList";
import "../styles/HistoryPage.css";
import Book_fantasy from "./History";

const HistoryPage = () => {
  return (
    <div className="history-page">
      <div className="history-banner">
        <h2>
        “History is who we are and why we are the way we are.”
        </h2>
      </div>

      <section className="book-section">
        <h3>Best History Books</h3>
        <Book_fantasy />
        <p className="see-more">see more</p>
      </section>
    </div>
  );
}

export default HistoryPage;
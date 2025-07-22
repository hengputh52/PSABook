import React from "react";
import BookList from "./BookList";
import "../styles/fantasyPage.css";
import Book_fantasy from "./Book_fantasy";

const Book_fantasyPage = () => {
  return (
    <div className="fantasy-page">
      <div className="fantasy-banner">
        <h2>
        “Fantasy is hardly an escape from reality. It's a way of understanding it.”
        </h2>
      </div>

      <section className="book-section">
        <h3>Best Fantasy Books</h3>
        <Book_fantasy />
        <p className="see-more">see more</p>
      </section>
    </div>
  );
}

export default Book_fantasyPage;
import React from "react";
import BookList from "./BookList";
import "../styles/Non-fictionPage.css";
import Non_fiction from "./Non_fiction";


const NonfictionPage = () => {
  return (
    <div className="nonFiction-page">
      <div className="nonFiction-banner">
        <h2>
        “Non-fiction is not just about facts; it's about understanding the world..”
        </h2>
      </div>

      <section className="book-section">
        <h3>Best Non-Fiction Books</h3>
        <Non_fiction />
        <p className="see-more">see more</p>
      </section>
    </div>
  );
}

export default NonfictionPage;
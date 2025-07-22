import React from "react";
import BookList from "./BookList";
import "../styles/SciFiPage.css";
import BookSciFi from "./BookSciFi";

const SciFiPage = () => {
  return (
    <div className="scifi-page">
      <div className="scifi-banner">
        <h2>
          “The universe is a pretty big place. If it's just us, seems like an awful waste of space.”
        </h2>
      </div>

      <section className="book-section">
        <h3>Best Science Fiction Books</h3>
        <BookSciFi />
        <p className="see-more">see more</p>
      </section>
    </div>
  );
}

export default SciFiPage;
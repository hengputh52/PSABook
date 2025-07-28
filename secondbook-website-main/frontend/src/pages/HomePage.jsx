import React, { useState } from "react";
import BookList from "../components/BookList";
import BookRecentlyAdded from "../components/BookRecentlyAdded";
import "../styles/HomePage.css";

const genres = ["All", "Fiction", "Non-Fiction", "Sci-Fi", "History", "fantasy"];
const prices = ["All", "Under $5", "$5 - $10", "$10 - $20", "Above $20"];

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [filter, setFilter] = useState({ genre: "All", price: "All" });
  const [showMoreBestPick, setShowMoreBestPick] = useState(false);
  const [showMoreRecentlyAdded, setShowMoreRecentlyAdded] = useState(false);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleGenreChange = (e) => {
    const genre = e.target.value;
    setSelectedGenre(genre);
    setFilter((prev) => ({ ...prev, genre }));
  };

  const handlePriceChange = (e) => {
    const price = e.target.value;
    setSelectedPrice(price);
    setFilter((prev) => ({ ...prev, price }));
  };

  return (
    <div className="homepage">
      <div className="header-bg-flex">
        <div className="header-image-side">
          <img
            src="https://www.biblionepal.com/cdn/shop/files/1683364671.png?v=1683365112&width=1946"
            alt="Header Visual"
            className="header-img"
          />
        </div>
        <div className="header-content-side">
          <header className="animated-header">
            <h1>
              <span className="highlight">Second Book</span>
            </h1>
            <p className="subtitle">
              Find your next <span className="highlight2">favorite book</span> or share one you've already read!
            </p>
          </header>
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Search for books..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-bar"
            />
            <button className="search-btn">Search</button>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <select className="filter-select" value={selectedGenre} onChange={handleGenreChange}>
          {genres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
        <select className="filter-select" value={selectedPrice} onChange={handlePriceChange}>
          {prices.map((price) => (
            <option key={price} value={price}>{price}</option>
          ))}
        </select>
      </div>

      <section className="book-section slide-up" style={{ animationDelay: "0.2s" }}>
        <h3 className="section-title" style={{ color: "black" }}>Best Pick</h3>
        <BookList filter={filter} searchTerm={searchTerm} showMore={showMoreBestPick} />
        {!showMoreBestPick && (
          <p className="see-more pulse" onClick={() => setShowMoreBestPick(true)}>see more</p>
        )}
      </section>

      <section className="book-section slide-up" style={{ animationDelay: "0.4s" }}>
        <h3 className="section-title" style={{ color: "black" }}>Recently Added</h3>
        <BookRecentlyAdded filter={filter} searchTerm={searchTerm} showMore={showMoreRecentlyAdded} />
        {!showMoreRecentlyAdded && (
          <p className="see-more pulse" onClick={() => setShowMoreRecentlyAdded(true)}>see more</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;

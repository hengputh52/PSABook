import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookList from "../components/BookList";
import "../styles/HomePage.css";
import BookRecentlyAdded from "../components/BookRecentlyAdded";

const genres = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "History",
  "Fantasy",
  "Recently Added",
];

const prices = [
  "All",
  "Under $5",
  "$5 - $10",
  "$10 - $20",
  "Above $20",
];

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [filter, setFilter] = useState({ genre: "All", price: "All" });
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handlePriceChange = (e) => {
    setSelectedPrice(e.target.value);
  };

  const handleBrowse = () => {
    setFilter({ genre: selectedGenre, price: selectedPrice });
    if (selectedGenre && selectedGenre !== "All") {
      navigate(`/genre/${encodeURIComponent(selectedGenre)}`);
    }
    // Optionally, handle price filter in the route as well
  };

  return (
    <div className="homepage">
      {/* Header + Search Bar with image on left */}
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
              Find your next{" "}
              <span className="highlight2">favorite book</span> or share one
              you've already read!
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

      {/* Filter Section */}
      <div className="filter-section">
        <select
          className="filter-select"
          value={selectedGenre}
          onChange={handleGenreChange}
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <select
          className="filter-select"
          value={selectedPrice}
          onChange={handlePriceChange}
        >
          {prices.map((price) => (
            <option key={price} value={price}>
              {price}
            </option>
          ))}
        </select>
        <button className="browse-btn" onClick={handleBrowse}>
          Browse
        </button>
      </div>
       <section
        className="book-section slide-up"
        style={{ animationDelay: "0.2s" }}
      >
        <h3 className="section-title" style={{color: "black"}}>Best Pick</h3>
        <BookList filter={filter} searchTerm={searchTerm} />
        <p className="see-more pulse">see more</p>
      </section>
    

      {/* Recently Added Section */}
      <section
        className="book-section slide-up"
        style={{ animationDelay: "0.2s" }}
      >
        <h3 className="section-title" style={{color: "black"}}>Recently Added</h3>
        <BookRecentlyAdded filter={filter} searchTerm={searchTerm} />
        <p className="see-more pulse">see more</p>
      </section>
    </div>
  );
};

export default HomePage;

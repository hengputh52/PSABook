import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../styles/BookList.css";
import sapiens from "../assets/Sapiens.jpg";
import educated from "../assets/educated-cover.jpg";
import habit from "../assets/habit_non_fiction.jpg";
import atomic from "../assets/automic.jpg";
import thinking from "../assets/thinking.jpg";
import subtle from "../assets/subtle.png";
import grit from "../assets/grit.png";
import outliers from "../assets/outliers.jpg";
import club from "../assets/club.jpg";
import daring from "../assets/daring.jpg";
import quiet from "../assets/quiet.jpg";
import blink from "../assets/blink.jpg";
import happiness from "../assets/happiness.jpg";
import agreements from "../assets/agreements.jpg";
import meaning from "../assets/meaning.jpg";
import laws from "../assets/laws.jpg";
import alchemist from "../assets/alchemist.jpg";
import richest from "../assets/richest.jpg";
import war from "../assets/war.jpg";
import nature from "../assets/nature.jpg";
import hurt from "../assets/hurt.jpg";
import ownership from "../assets/ownership.png";
import start from "../assets/start.png";
import drive from "../assets/drive.jpg";
import lean from "../assets/lean.jpg";
import measure from "../assets/measure.png";
import stick from "../assets/stick.jpg";
import principles from "../assets/principles.png";
import psychology from "../assets/psychology.jpg";
import intelligent from "../assets/intelligent.jpg";

export const Non_fictionBooks = [
  { id: 1, title: "Sapiens", price: "$15", image: sapiens, description: "A brief history of humankind. (Author: Yuval Noah Harari)" },
  { id: 2, title: "Educated", price: "$18", image: educated, description: "A memoir of a woman who escapes her survivalist family. (Author: Tara Westover)" },
  { id: 3, title: "The Power of Habit", price: "$12", image: habit, description: "Explores the science of habit formation. (Author: Charles Duhigg)" },
  { id: 4, title: "Atomic Habits", price: "$20", image: atomic, description: "Tiny changes that lead to remarkable results. (Author: James Clear)" },
  { id: 5, title: "Thinking, Fast and Slow", price: "$18", image: thinking, description: "Understanding fast and slow thinking processes. (Author: Daniel Kahneman)" },
  { id: 6, title: "The Subtle Art of Not Giving a F*ck", price: "$16", image: subtle, description: "A counterintuitive approach to living a good life. (Author: Ryan Holiday)" },
  { id: 7, title: "Grit", price: "$17", image: grit, description: "The power of passion and perseverance. (Author: Angela Duckworth)" },
  { id: 8, title: "Outliers", price: "$14", image: outliers, description: "What makes high-achievers different? (Author: Malcolm Gladwell)" },
  { id: 9, title: "The 5 AM Club", price: "$18", image: club, description: "The 5 AM Club, a book on productivity. (Author: Robin Sharma)" },
  { id: 10, title: "Daring Greatly", price: "$16", image: daring, description: "How courage builds strong connections. (Author: Brené Brown)" },
  { id: 11, title: "Quiet", price: "$15", image: quiet, description: "The power of introverts in a loud world. (Author: Susan Cain)" },
  { id: 12, title: "Blink", price: "$12", image: blink, description: "The art of thinking without thinking. (Author: Malcolm Gladwell)" },
  { id: 13, title: "The Happiness Project", price: "$14", image: happiness, description: "The pursuit of happiness in different cultures. (Author: Matthieu Ricard)" },
  { id: 14, title: "The Four Agreements", price: "$13", image: agreements, description: "A practical guide to personal freedom. (Author: Don Miguel Ruiz)" },
  { id: 15, title: "Man's Search for Meaning", price: "$11", image: meaning, description: "Man’s search for meaning through suffering. (Author: Viktor Frankl)" },
  { id: 16, title: "The 48 Laws of Power", price: "$19", image: laws, description: "48 laws of power and influence. (Author: Robert Greene)" },
  { id: 17, title: "The Alchemist", price: "$14", image: alchemist, description: "A fable about following your dreams. (Author: Paulo Coelho)" },
  { id: 18, title: "The Richest Man in Babylon", price: "$10", image: richest, description: "Ancient wisdom on wealth-building. (Author: Wallace D. Wattles)" },
  { id: 19, title: "The Art of War", price: "$15", image: war, description: "The timeless strategies of war. (Author: Sun Tzu)" },
  { id: 20, title: "The Nature of Human Nature", price: "$17", image: nature, description: "Understanding human nature and behavior. (Author: Robert Greene)" },
  { id: 21, title: "The Body Keeps the Score", price: "$20", image: hurt, description: "Healing from emotional wounds. (Author: Dr. Guy Winch)" },
  { id: 22, title: "Extreme Ownership", price: "$22", image: ownership, description: "Extreme ownership and leadership principles. (Author: Jocko Willink)" },
  { id: 23, title: "Start with Why", price: "$16", image: start, description: "How to take action and start now. (Author: Jon Acuff)" },
  { id: 24, title: "Drive", price: "$17", image: drive, description: "What really motivates us. (Author: Daniel H. Pink)" },
  { id: 25, title: "The Lean Startup", price: "$18", image: lean, description: "The lean startup methodology. (Author: Eric Ries)" },
  { id: 26, title: "Measure What Matters", price: "$18", image: measure, description: "Measuring what matters in business. (Author: John Doerr)" },
  { id: 27, title: "Made to Stick", price: "$15", image: stick, description: "How ideas stick and spread. (Author: Chip Heath & Dan Heath)" },
  { id: 28, title: "Principles", price: "$20", image: principles, description: "Life and work principles by Ray Dalio. (Author: Ray Dalio)" },
  { id: 29, title: "Influence", price: "$16", image: psychology, description: "The science of influence and persuasion. (Author: Robert B. Cialdini)" },
  { id: 30, title: "Rich Dad Poor Dad", price: "$15", image: intelligent, description: "Understanding financial intelligence. (Author: Robert Kiyosaki)" }
];

const Non_fiction = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleAddToCart = (book) => {
    if (!cart.some((b) => b.id === book.id)) {
      const updatedCart = [...cart, book];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      alert(`${book.title} has been added to your cart!`);
    } else {
      alert(`${book.title} is already in your cart.`);
    }
  };

  const isBookInCart = (bookId) => {
    return cart.some((b) => b.id === bookId);
  };

  return (
    <div className="book-list">
      {Non_fictionBooks.map((book) => (
        <div key={book.id} className="book-card">
          <Link to={`/book/non-fiction/${book.id}`}>
            <img src={book.image} alt={book.title} />
            <h4>{book.title}</h4>
            <p>{book.price}</p>
          </Link>
          <button
            onClick={() => handleAddToCart(book)}
            disabled={isBookInCart(book.id)}
          >
            {isBookInCart(book.id) ? "Already Added" : "Add to Cart"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Non_fiction;

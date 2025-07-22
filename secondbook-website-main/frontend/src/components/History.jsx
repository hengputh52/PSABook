import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../styles/BookList.css";

import khmer from "../assets/khmer1.jpg";
import Cambodian from "../assets/khmer2.jpg";
import father from "../assets/khmer3.jpg";
import life from "../assets/khmer3.webp";
import pol_pot from "../assets/khmer4.webp";
import classes from "../assets/khmer5.webp";
import war_over from "../assets/khmer6.webp";
import khmer_king from "../assets/khmer7.webp";
import rouge from "../assets/khmer8.webp";
import brief from "../assets/brief.jpg";
import revolution from "../assets/revolution.jpg";
import civilization from "../assets/civilization.jpg";
import ancient from "../assets/ancient.jpg";
import kings from "../assets/kings.jpg";
import empire from "../assets/empire.jpg";
import darkage from "../assets/darkage.jpg";
import worldwar from "../assets/worldwar.jpg";
import renaissance from "../assets/renaissance.jpg";
import victorian from "../assets/victorian.jpg";
import industrial from "../assets/industrial.jpg";
import modernity from "../assets/modernity.jpg";
import colonialism from "../assets/colonialism.jpg";
import democracy from "../assets/democracy.jpg";
import revolutionaries from "../assets/revolutionaries.jpg";
import europe from "../assets/europe.jpg";
import exploration from "../assets/exploration.jpg";
import battles from "../assets/battles.jpg";
import migration from "../assets/migration.jpg";
import socialism from "../assets/socialism.jpg";
import independence from "../assets/independence.jpg";
import conflict from "../assets/conflict.jpg";
import empires from "../assets/empires.jpg";
import strategy from "../assets/strategy.jpg";
import warhistory from "../assets/warhistory.jpg";
import worldchange from "../assets/worldchange.jpg";
import nationalism from "../assets/nationalism.jpg";
import conflictresolution from "../assets/conflictresolution.jpg";
import globalhistory from "../assets/globalhistory.jpg";
import industrialrevolution from "../assets/industrialrevolution.jpg";

// Export the historyBooks array
export const historyBooks = [
  { id: 1, title: "The Khmer Empire", price: "14$", image: khmer, description: "A detailed history of the Khmer Empire and its cultural significance." },
  { id: 2, title: "Cambodian History", price: "11$", image: Cambodian, description: "An overview of Cambodia's rich and complex history." },
  { id: 3, title: "First They Killed My Father", price: "15$", image: father, description: "A memoir of survival during the Khmer Rouge regime by Loung Ung." },
  { id: 4, title: "Daily Life of a Khmer Empire Girl", price: "10$", image: life, description: "A fictional account of life in the Khmer Empire through the eyes of a young girl." },
  { id: 5, title: "Pol Pot", price: "20$", image: pol_pot, description: "A biography of Pol Pot, the leader of the Khmer Rouge." },
  { id: 6, title: "Prisoners of Class", price: "21$", image: classes, description: "An analysis of class struggles during the Khmer Rouge era." },
  { id: 7, title: "When The War Was Over", price: "20$", image: war_over, description: "A historical account of Cambodia after the fall of the Khmer Rouge." },
  { id: 8, title: "The Khmers", price: "16$", image: khmer_king, description: "A comprehensive history of the Khmer people and their culture." },
  { id: 9, title: "The Khmer Rouge", price: "19$", image: rouge, description: "An in-depth look at the Khmer Rouge regime and its impact on Cambodia." },
  { id: 10, title: "A Brief History of Time", price: "10$", image: brief, description: "A comprehensive guide to the universe by Stephen Hawking." },
  { id: 11, title: "The History of the French Revolution", price: "15$", image: revolution, description: "An in-depth look at the French Revolution and its impact on the world." },
  { id: 12, title: "The Rise and Fall of Ancient Civilizations", price: "12$", image: civilization, description: "Exploring the rise and fall of the great ancient civilizations." },
  { id: 13, title: "Ancient Rome: A History", price: "14$", image: ancient, description: "A detailed history of Ancient Rome and its lasting influence." },
  { id: 14, title: "Kings and Kingdoms", price: "13$", image: kings, description: "The history of monarchies and the evolution of kingship." },
  { id: 15, title: "The Age of Empires", price: "16$", image: empire, description: "An exploration of the great empires and their global impact." },
  { id: 16, title: "The Dark Ages", price: "11$", image: darkage, description: "A history of Europe during the Dark Ages and its aftermath." },
  { id: 17, title: "World War I", price: "18$", image: worldwar, description: "A comprehensive history of World War I and its impact on the modern world." },
  { id: 18, title: "The Renaissance", price: "14$", image: renaissance, description: "An exploration of the Renaissance period and its cultural significance." },
  { id: 19, title: "Victorian Britain", price: "13$", image: victorian, description: "A history of Victorian Britain, focusing on society, politics, and culture." },
  { id: 20, title: "The Industrial Revolution", price: "16$", image: industrial, description: "An in-depth look at the Industrial Revolution and its global effects." },
  { id: 21, title: "Modernity: A History", price: "17$", image: modernity, description: "A history of the rise of modern society and its cultural shifts." },
  { id: 22, title: "Colonialism and Its Impact", price: "15$", image: colonialism, description: "An exploration of colonialism and its lasting effects on societies worldwide." },
  { id: 23, title: "The Age of Democracy", price: "14$", image: democracy, description: "A history of the rise of democracy around the world." },
  { id: 24, title: "Revolutionaries and their Movements", price: "15$", image: revolutionaries, description: "A study of famous revolutionaries and their influence on history." },
  { id: 25, title: "Europe in the 20th Century", price: "18$", image: europe, description: "An overview of Europe's history throughout the 20th century." },
  { id: 26, title: "Age of Exploration", price: "16$", image: exploration, description: "A history of the great explorers and their voyages of discovery." },
  { id: 27, title: "The Great Battles", price: "20$", image: battles, description: "A look at the most significant battles in history and their outcomes." },
  { id: 28, title: "The Migration of Peoples", price: "14$", image: migration, description: "The history of human migration and its effect on societies." },
  { id: 29, title: "Socialism and its Impact", price: "16$", image: socialism, description: "A history of socialism and its influence on global politics." },
  { id: 30, title: "The Struggle for Independence", price: "18$", image: independence, description: "An in-depth study of movements for independence across the world." },
  { id: 31, title: "Global Conflict", price: "19$", image: conflict, description: "The history of global conflicts and the forces behind them." },
  { id: 32, title: "The Rise and Fall of Empires", price: "20$", image: empires, description: "A look at the rise and eventual collapse of great empires." },
  { id: 33, title: "Military Strategy through the Ages", price: "17$", image: strategy, description: "An exploration of military strategy from ancient to modern warfare." },
  { id: 34, title: "The History of War", price: "25$", image: warhistory, description: "A comprehensive history of war and its impact on human civilization." },
  { id: 35, title: "World Change: The Modern Era", price: "22$", image: worldchange, description: "The history of the modern era and the changes it brought to the world." },
  { id: 36, title: "Nationalism and Its Roots", price: "18$", image: nationalism, description: "A study of nationalism and its historical development." },
  { id: 37, title: "Conflict Resolution in History", price: "16$", image: conflictresolution, description: "An examination of conflict resolution strategies in historical contexts." },
  { id: 38, title: "A Global History", price: "22$", image: globalhistory, description: "A history of the world from a global perspective." },
  { id: 39, title: "The Industrial Revolution and its Consequences", price: "18$", image: industrialrevolution, description: "An analysis of the Industrial Revolution and its impact on the modern world." },
];

const History = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
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
      {historyBooks.map((book) => (
        <div key={book.id} className="book-card">
          <Link to={`/book/history/${book.id}`}>
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

export default History;
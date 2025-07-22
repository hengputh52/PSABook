import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../styles/BookList.css";
import Foundryside from "../assets/Foundryside.jpg";
import JadeCity from "../assets/JadeCity.jpg";
import lies from "../assets/lies_of_locke_lamora.jpg";
import Robin from "../assets/Robin.jpg";
import Dragonbone from "../assets/The_Dragonbone_Chair.jpg";
import Killing_Moon from "../assets/Killing_Moon.jpg";
import Watership_down from "../assets/watership_down.jpg";
import Bush_Ghosts from "../assets/Bush_Ghosts.jpg";
import Woven_Moonlight from "../assets/Woven_Moonlight.jpg";
import Ashes from "../assets/Ashes.jpg";
import Five_Children from "../assets/Five_Children.jpg";
import Gods_Jade from "../assets/Gods_Jade.jpg";
import Children_Blood from "../assets/Children_Blood.jpg";
import The_Hobbit from "../assets/The_Hobbit.jpg";
import Harry_Potter from "../assets/Harry_Potter.jpg";
import Northern_Lights from "../assets/Northern_Lights.jpg";
import Giant_Peach from "../assets/Giant_Peach.jpg";
import Tigana from "../assets/Tigana.jpg";
import Good_Omens from "../assets/Good_Omens.jpg";
import Fourth_Wing from "../assets/Fourth_Wing.jpg";
import The_Lion from "../assets/The_Lion.jpg";
import Buried_Giant from "../assets/Buried_Giant.jpg";
import American_Gods from "../assets/American_Gods.jpg";

// Export the fantasyBooks array
export const fantasyBooks = [
  { id: 1, title: "Foundryside", price: "10$", image: Foundryside, description: "A thrilling fantasy novel set in a world of magical technology by Robert Jackson Bennett." },
  { id: 2, title: "Jade City", price: "12$", image: JadeCity, description: "An epic fantasy novel blending family drama and organized crime, set in a fictional city." },
  { id: 3, title: "The Lies of Locke Lamora", price: "14$", image: lies, description: "A fast-paced fantasy with heists, betrayal, and revenge, by Scott Lynch." },
  { id: 4, title: "Robin Hobb", price: "16$", image: Robin, description: "A collection of stories from Robin Hobb, exploring rich, immersive worlds and deep character studies." },
  { id: 5, title: "The Dragonbone Chair", price: "18$", image: Dragonbone, description: "A classic fantasy tale featuring an epic quest and ancient magic by Tad Williams." },
  { id: 6, title: "The Killing Moon", price: "11$", image: Killing_Moon, description: "A dark, unique fantasy featuring a city ruled by dream magic, by N.K. Jemisin." },
  { id: 7, title: "Watership Down", price: "9$", image: Watership_down, description: "A timeless story about a group of rabbits seeking a new home, filled with adventure and survival." },
  { id: 8, title: "Bush Ghosts", price: "13$", image: Bush_Ghosts, description: "A gripping novel exploring the mystical and mysterious culture of Australia's bush by Peter Watt." },
  { id: 9, title: "Woven in Moonlight", price: "17$", image: Woven_Moonlight, description: "A beautifully written fantasy novel with rich world-building and cultural elements by Isabel Ibañez." },
  { id: 10, title: "Ashes", price: "20$", image: Ashes, description: "A gripping story set in a post-apocalyptic world, where magic is a dying force, by Suzanne Wright." },
  { id: 12, title: "Five Children and It", price: "8$", image: Five_Children, description: "A children's fantasy novel about five children who encounter a magical creature that grants wishes." },
  { id: 13, title: "Gods of Jade and Shadow", price: "14$", image: Gods_Jade, description: "A fantastical journey through Mexican mythology, where gods and monsters collide by Silvia Moreno-Garcia." },
  { id: 14, title: "Children of Blood and Bone", price: "15$", image: Children_Blood, description: "A powerful, magic-filled fantasy set in a world where an oppressed people fight for their rights." },
  { id: 15, title: "The Hobbit", price: "20$", image: The_Hobbit, description: "The classic story of Bilbo Baggins’ adventure through Middle-earth, by J.R.R. Tolkien." },
  { id: 16, title: "Harry Potter", price: "25$", image: Harry_Potter, description: "The magical world of Hogwarts and the story of a boy who must face the dark wizard who killed his parents." },
  { id: 17, title: "Northern Lights", price: "18$", image: Northern_Lights, description: "The first book in Philip Pullman’s groundbreaking trilogy, exploring alternate realities and a coming-of-age tale." },
  { id: 18, title: "James and the Giant Peach", price: "9$", image: Giant_Peach, description: "A whimsical fantasy story about a boy’s adventure in a giant peach, by Roald Dahl." },
  { id: 19, title: "Tigana", price: "22$", image: Tigana, description: "A haunting tale of a forgotten land and its people’s struggle to reclaim their identity by Guy Gavriel Kay." },
  { id: 20, title: "Good Omens", price: "18$", image: Good_Omens, description: "A hilarious and heartwarming tale of an angel and demon teaming up to prevent the apocalypse." },
  { id: 21, title: "Fourth Wing", price: "23$", image: Fourth_Wing, description: "A high-stakes fantasy about survival, loyalty, and betrayal by Rebecca Yarros." },
  { id: 22, title: "The Lion, the Witch and the Wardrobe", price: "12$", image: The_Lion, description: "A beloved classic where four siblings enter a magical land to fight the White Witch in C.S. Lewis’s Narnia." },
  { id: 23, title: "The Buried Giant", price: "17$", image: Buried_Giant, description: "A beautiful and melancholy tale of memory, mystery, and love by Kazuo Ishiguro." },
  { id: 24, title: "American Gods", price: "19$", image: American_Gods, description: "Neil Gaiman’s epic fantasy about the clash between old gods and new, set in modern-day America." },
];

const Book_fantasy = () => {
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
      {fantasyBooks.map((book) => (
        <div key={book.id} className="book-card">
          <Link to={`/book/fantasy/${book.id}`}>
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

export default Book_fantasy;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../styles/BookList.css";
import dune from "../assets/federation.jpg";
import heir from "../assets/heir_gift.jpg";
import hidden from "../assets/hide_and_seek.jpg";
import paul from "../assets/paul_rix.jpg";
import exile from "../assets/the_exile_of_time.jpg";
import outpost from "../assets/the_last_outpost.jpg";
import galaxy from "../assets/galaxy_explorer.jpg";
import starbound from "../assets/starbound_legacy.jpg";
import timewarp from "../assets/timewarp_journey.jpg";
import machine from "../assets/the_machine.jpg";
import alien from "../assets/alien_encounter.jpg";
import gravity from "../assets/gravity_well.jpg";
import voidspace from "../assets/voidspace_heroes.jpg";
import reactor from "../assets/reactor_rising.jpg";
import matrix from "../assets/matrix_virus.jpg";
import mission from "../assets/space_mission.jpg";
import quest from "../assets/quest_of_stars.jpg";
import nebula from "../assets/nubula_wars.jpg";
import moonbase from "../assets/moonbase_zero.jpg";
import alienworlds from "../assets/alienworlds_exploration.jpg";
import stardust from "../assets/stardust_travelers.jpg";
import blackhole from "../assets/blackhole_frontier.jpg";
import discovery from "../assets/planetar_discovery.jpg";
import timeportal from "../assets/timeportal_dreams.jpg";
import cyborg from "../assets/robot_wars.jpg";
import warpgate from "../assets/warpgate_mystery.jpg";
import terra from "../assets/terra_horizon.jpg";
import orbitals from "../assets/orbitals_legacy.jpg";
import hyperspace from "../assets/hyperspace_expedition.jpg";
import android from "../assets/android_dawn.jpg";
import continuum from "../assets/space_continuum.jpg";
import lightyears from "../assets/lightyears_pursuit.jpg";
import stargate from "../assets/stargate_colony.jpg";
import horizon from "../assets/horizon_voyage.jpg";
import galactic from "../assets/galactic_battlefront.jpg";
import terraform from "../assets/terraform_survival.jpg";
import quantum from "../assets/quantum_ventures.jpg";
import warfront from "../assets/warfront_clash.jpg";
import nebulae from "../assets/nebulae_explorers.jpg";

export const sciFiBooks = [
  { id: 1, title: "Dune", price: "11$", image: dune, description: "A science fiction novel by Frank Herbert." },
  { id: 2, title: "Neuromancer", price: "13$", image: heir, description: "A science fiction novel by William Gibson." },
  { id: 3, title: "Snow Crash", price: "15$", image: paul, description: "A science fiction novel by Neal Stephenson." },
  { id: 4, title: "Ender's Game", price: "12$", image: exile, description: "A science fiction novel by Orson Scott Card." },
  { id: 5, title: "The Exile of Time", price: "16$", image: outpost, description: "A science fiction novel by Ray Cummings." },
  { id: 6, title: "The Last Outpost", price: "14$", image: hidden, description: "A science fiction novel by George O. Smith." },
  { id: 7, title: "Galaxy Explorer", price: "18$", image: galaxy, description: "A space exploration novel." },
  { id: 8, title: "Starbound Legacy", price: "17$", image: starbound, description: "A legacy of starbound explorers." },
  { id: 9, title: "Timewarp Journey", price: "19$", image: timewarp, description: "A novel about time travel and discovery." },
  { id: 10, title: "The Machine", price: "21$", image: machine, description: "A story about a machine that changes everything." },
  { id: 11, title: "Alien Encounter", price: "22$", image: alien, description: "An alien encounter in a distant galaxy." },
  { id: 12, title: "Gravity Well", price: "20$", image: gravity, description: "A novel about the pull of gravity in deep space." },
  { id: 13, title: "Voidspace Heroes", price: "23$", image: voidspace, description: "Heroes journey through voidspace." },
  { id: 14, title: "Reactor Rising", price: "25$", image: reactor, description: "The rise of a powerful reactor in a future world." },
  { id: 15, title: "Matrix Virus", price: "27$", image: matrix, description: "A virus threatens the entire virtual reality system." },
  { id: 16, title: "Space Mission", price: "28$", image: mission, description: "A thrilling space mission to an unknown planet." },
  { id: 17, title: "Quest of Stars", price: "29$", image: quest, description: "A quest to find the lost stars." },
  { id: 18, title: "Nebula Wars", price: "30$", image: nebula, description: "A war raging in the nebulae of deep space." },
  { id: 19, title: "Moonbase Zero", price: "31$", image: moonbase, description: "A science fiction novel about life on Moonbase Zero." },
  { id: 20, title: "Alienworlds Exploration", price: "33$", image: alienworlds, description: "Exploring alien worlds in the farthest reaches of space." },
  { id: 21, title: "Stardust Travelers", price: "35$", image: stardust, description: "A group of travelers journey across the stardust." },
  { id: 22, title: "Blackhole Frontier", price: "38$", image: blackhole, description: "The dangerous frontier of blackholes and beyond." },
  { id: 23, title: "Planetary Discovery", price: "40$", image: discovery, description: "The discovery of new planets in the galaxy." },
  { id: 24, title: "Timeportal Dreams", price: "42$", image: timeportal, description: "Time travel brings dreams and dangers." },
  { id: 25, title: "Robot Wars", price: "44$", image: cyborg, description: "The ultimate war between robots and humans." },
  { id: 26, title: "Warpgate Mystery", price: "46$", image: warpgate, description: "A mystery unfolds around the warpgate." },
  { id: 27, title: "Terra Horizon", price: "48$", image: terra, description: "Exploration of a new horizon on Terra." },
  { id: 28, title: "Orbitals Legacy", price: "50$", image: orbitals, description: "The legacy of orbital stations in space." },
  { id: 29, title: "Hyperspace Expedition", price: "52$", image: hyperspace, description: "An expedition through hyperspace into the unknown." },
  { id: 30, title: "Android Dawn", price: "55$", image: android, description: "The dawn of androids and artificial life." },
  { id: 31, title: "Space Continuum", price: "58$", image: continuum, description: "A journey through the space-time continuum." },
  { id: 32, title: "Lightyears Pursuit", price: "60$", image: lightyears, description: "The pursuit of lightyears across galaxies." },
  { id: 33, title: "Stargate Colony", price: "63$", image: stargate, description: "The creation of a colony through the Stargate." },
  { id: 34, title: "Horizon Voyage", price: "65$", image: horizon, description: "A voyage into the distant horizon of the cosmos." },
  { id: 35, title: "Galactic Battlefront", price: "68$", image: galactic, description: "Battles at the front of a galactic war." },
  { id: 36, title: "Terraform Survival", price: "70$", image: terraform, description: "Surviving on a newly terraformed planet." },
  { id: 37, title: "Quantum Ventures", price: "73$", image: quantum, description: "Venture into the quantum realm of possibilities." },
  { id: 38, title: "Warfront Clash", price: "75$", image: warfront, description: "The clash at the warfront of a galactic conflict." },
  { id: 39, title: "Nebulae Explorers", price: "80$", image: nebulae, description: "Exploring the nebulous reaches of space." },
  { id: 40, title: "The Federation", price: "85$", image: dune, description: "The story of a powerful galactic federation." }
];

const BookSciFi = () => {
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
      {sciFiBooks.map((book) => (
        <div key={book.id} className="book-card">
          <Link to={`/book/science-fiction/${book.id}`}>
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

export default BookSciFi;

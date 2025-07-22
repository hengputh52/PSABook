import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../styles/BookList.css";
import Hunger from "../assets/The_Hunger_Games.jpg";
import Thief from "../assets/The_Book_Thief.jpg";
import Shining from "../assets/The_Shining.jpg";
import Lake from "../assets/Tom_Lake.png";
import Charlotte from "../assets/CharlotteWeb.png";
import Lord from "../assets/Lord.jpg";
import City from "../assets/City.jpg"; // Fixed path
import Fahrenheit from "../assets/Fahrenheit.jpg";
import Mice from "../assets/Mice.jpg";
import Purple from "../assets/Purple.jpg";
import Catch from "../assets/Catch.jpg";
import Anna from "../assets/Anna.jpg";
import Prince from "../assets/Prince.jpg";
import Midnight from "../assets/Midnight.jpg";
import Brave from "../assets/Brave.jpg";
import Rabbit from "../assets/Rabbit.jpg";
import Alchemist from "../assets/Alchemist.jpg";
import Mockingbird from "../assets/Mockingbird.jpg";
import Jane from "../assets/Jane.jpg";
import Dream from "../assets/Dream.jpg";
import Moment from "../assets/Moment.jpg";
import Animal from "../assets/Animal.jpg";
import Fourth from "../assets/Fourth_Wing.jpg";
import Cover from "../assets/cover.webp";
import Demon from "../assets/Demon.png";
import Beautiful from "../assets/Beautiful.jpg";
import Watership from "../assets/Watership.jpg";
import Light from "../assets/Light.jpg";
import Bell from "../assets/Bell.jpg";
import Brothers from "../assets/Brothers.jpg";

// Export the fictionBooks array
export const fictionBooks = [
  { id: 1, title: "The Hunger Games", price: "19$", image: Hunger, description: "A Fiction novel by the American writer Suzanne Collins.." },
  { id: 2, title: "The Book Thief", price: "8$", image: Thief, description: "A historical fiction novel by the Australian author Markus Zusak." },
  { id: 3, title: "The Shining", price: "12$", image: Shining, description: "A horror novel by American author Stephen King." },
  { id: 4, title: "Tom Lake", price: "13$", image: Lake, description: "Novel by Ann Patchett." },
  { id: 5, title: "Charlotte's Web", price: "23$", image: Charlotte, description: "Charlotte's Web is a book of children's literature by American author E. B. White and illustrated by Garth William." },
  { id: 6, title: "Lord of the Flies", price: "31$", image: Lord, description: "Novel of British author William Golding." },
  { id: 7, title: "City of Thieves", price: "3$", image: City, description: "City of Thieves is a 2008 historical fiction novel by David Benioff." },
  { id: 8, title: "Fahrenheit 451", price: "3$", image: Fahrenheit, description: "Fahrenheit 451 is a 1953 dystopian novel by American writer Ray Bradbury." },
  { id: 9, title: "Of Mice and Men", price: "3$", image: Mice, description: "Of Mice and Men is a 1937 novella written by American author John Steinbeck." },
  { id: 10, title: "The Color Purple", price: "3$", image: Purple, description: "The Color Purple is a 1982 epistolary novel by American author Alice Walker that won the 1983." },
  { id: 11, title: "Catch-22", price: "3$", image: Catch, description: "Catch-22 is a satirical war novel by American author Joseph Heller." },
  { id: 12, title: "Anna Karenina", price: "3$", image: Anna, description: "A novel by the Russian author Leo Tolstoy." },
  { id: 13, title: "The Little Prince", price: "3$", image: Prince, description: "Novella written and illustrated by French writer and military pilot Antoine de Saint-Exupéry." },
  { id: 14, title: "Midnight's Children", price: "3$", image: Midnight, description: "Midnight's Children is the second novel by Indian-British writer Salman Rushdie." },
  { id: 15, title: "Brave New World", price: "3$", image: Brave, description: "Brave New World is a dystopian novel by English author Aldous Huxley, written in 1931." },
  { id: 16, title: "The Rabbit Hutch", price: "3$", image: Rabbit, description: "The Rabbit Hutch is a 2022 debut novel by American novelist Tess Gunty and winner of the 2022 National Book Award for Fiction." },
  { id: 17, title: "The Alchemist", price: "3$", image: Alchemist, description: "Novel by Brazilian author Paulo Coelho which was first published in 1988." },
  { id: 18, title: "To Kill a Mockingbird", price: "3$", image: Mockingbird, description: "To Kill a Mockingbird is a 1960 Southern Gothic novel by American author Harper Lee." },
  { id: 19, title: "Jane Eyre", price: "3$", image: Jane, description: "Jane Eyre originally published as Jane Eyre: An Autobiography is a novel by the English writer Charlotte Brontë." },
  { id: 20, title: "Dream Count", price: "3$", image: Dream, description: "Dream Count is a novel written by Nigerian writer Chimamanda Ngozi Adichie." },
  { id: 21, title: "Here One Moment", price: "3$", image: Moment, description: "It all begins on a flight from Hobart to Sydney. The flight will be smooth. It will land safely. Everyone who gets on the plane will get off the plane." },
  { id: 22, title: "Animal Farm", price: "3$", image: Animal, description: "Animal Farm is a satirical allegorical novella, in the form of a beast fable by George Orwell." },
  { id: 23, title: "Fourth Wing", price: "3$", image: Fourth, description: "Fourth Wing is a 2023 new adult novel by American author Rebecca Yarros." },
  { id: 24, title: "The Covenant of Water", price: "3$", image: Cover, description: "The Covenant of Water is a 2023 novel by physician and author Abraham Verghese." },
  { id: 25, title: "Demon Copperhead", price: "3$", image: Demon, description: "." },
  { id: 26, title: "Beautiful World, Where Are You", price: "3$", image: Beautiful, description: "Beautiful World, Where Are You is a novel by Irish author Sally Rooney." },
  { id: 27, title: "Watership Down", price: "3$", image: Watership, description: "Watership Down is an adventure novel by English author Richard Adams." },
  { id: 28, title: "All the Light We Cannot See", price: "3$", image: Light, description: "All the Light We Cannot See is a 2014 war novel by American author Anthony Doerr. The novel is set during World War II." },
  { id: 29, title: "The Bell Jar", price: "3$", image: Bell, description: "The Bell Jar is the only novel written by the American writer and poet Sylvia Plath." },
  { id: 30, title: "The Brothers Karamazov", price: "3$", image: Brothers, description: "The last novel by Russian author Fyodor Dostoevsky." },
];

const Fiction = () => {
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
      {fictionBooks.map((book) => (
        <div key={book.id} className="book-card">
          <Link to={`/book/fiction/${book.id}`}>
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

export default Fiction;
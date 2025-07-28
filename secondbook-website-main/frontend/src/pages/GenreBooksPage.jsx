import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookList from "../components/BookList";
import axios from "axios";

const GenreBooksPage = () => {
  const { genreName } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(`/api/books?genre=${encodeURIComponent(genreName)}`)
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch books.");
        setLoading(false);
      });
  }, [genreName]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Books in "{genreName}"</h2>
      <BookList books={books} />
    </div>
  );
};

export default GenreBooksPage;

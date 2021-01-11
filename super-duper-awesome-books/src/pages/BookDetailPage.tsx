import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorText from "../components/ErrorText";
import BookDetail from "../components/BookDetail";
import SearchPage from "./SearchPage";

const BookDetailPage = ({ match }) => {
  const { params: { bookId } } = match;
  const [book, setBook] = useState(null);
  const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const API_BASE_URL = `https://www.googleapis.com/books/v1/volumes`;
    const fetchBook = async () => {
      setError(false);
      try {
        const result = await axios.get(`${API_BASE_URL}/${bookId}`);
        setBook(result.data);
      } catch (error) {
        setError(true);
      }
    };
    fetchBook();
  }, [bookId]);

  return (
    <>
      <div style={{marginRight: '5%'}}>
        <Link to={`/search-page`}>Go back to search books</Link>
        {error && (
          <ErrorText>Some error occurred, while fetching books API</ErrorText>
        )}
        {book && <BookDetail book={book} />}
      </div>
      <SearchPage/>
    </>
  );
};

export default BookDetailPage;
import React, { useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { Container } from "../components/SharedBackGround";
import BookSearchForm from "../components/BookSearchForm";
import BooksList from "../components/BookList";
import ScrollUpButton from "react-scroll-up-button";
import 'react-toastify/dist/ReactToastify.css';


const HeaderContainer = styled(Container)`
  // display: flex;
  margin-left: 78%;
  align-items: center;
`;

const HeaderSearchForm = styled.div`
  margin-left: auto;
`;


const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState({ items: [] });
  const [error, setError] = useState(false);

  const API_BASE_URL = `https://www.googleapis.com/books/v1/volumes`;

  const fetchBooks = async () => {
    setError(false);
    try {
      const result = await axios.get(`${API_BASE_URL}?q=${searchTerm}&maxResults=40`);
      setBooks(result.data);
    } catch (error) {
      setError(true);
    }
  };


  const fetchBooksBySubject = async (searchSubject: any) => {
    setError(false);
    try {
      const result = await axios.get(`${API_BASE_URL}?q=subject:${searchSubject}&maxResults=40`);
      setBooks(result.data);
    } catch (error) {
      setError(true);
    }
  };

  const onInputChange = e => {
    setSearchTerm(e.target.value);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    fetchBooks();
  };



  return (

    <>
        <HeaderContainer>

          <HeaderSearchForm>
            <BookSearchForm
              onSubmitHandler={onSubmitHandler}
              onInputChange={onInputChange}
              searchTerm={searchTerm}
              error={error}
            />
          </HeaderSearchForm>
        </HeaderContainer>
        <Container>
            <ScrollUpButton />
            <BooksList books={books} />
        </Container>
    </>
  );
};

export default SearchPage;
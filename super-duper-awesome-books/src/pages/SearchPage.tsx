import React, { useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { Container } from "../components/SharedBackGround";
import BookSearchForm from "../components/BookSearchForm";
import BooksList from "../components/BookList";
import ScrollUpButton from "react-scroll-up-button";
import { BrowserRouter as Router, Route, Switch, Link, useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import NavigationBar from "../components/navigation/NavigationBar";


const HeaderContainer = styled(Container)`

  margin-left: 25%;
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

  const onInputChange = e => {
    setSearchTerm(e.target.value);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    fetchBooks();
  };

  return (

    <>
      {/* <HeaderContainer>
        <HeaderSearchForm> */}
      {/* <div style={{zIndex: 100}}> */}
      <div style={{marginTop:'2em'}}>
        <BookSearchForm
          onSubmitHandler={onSubmitHandler}
          onInputChange={onInputChange}
          searchTerm={searchTerm}
          error={error}
        />
      </div>
      {/* </div> */}
      {/* </HeaderSearchForm>
      </HeaderContainer> */}

      <Container>
        <ScrollUpButton />
        <BooksList books={books} />
      </Container>

    </>
  );
};

export default SearchPage;
import React from "react";
import styled from "@emotion/styled";
import ErrorText from "./ErrorText";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Input = styled.input`
  outline: 0;
  padding: 0.6rem 1rem;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 3px;
  min-width: 280px;
  &:focus,
  &:active {
    border-color: #85b7d9;
  }
  @media (max-width: 778px) {
    margin-top: 10px;
  }
`;

const Button = styled.button`
  background-color: #28a2b8;
  color: #ffffff;
  text-shadow: none;
  background-image: none;
  padding: 0.6rem 1.5rem;
  margin-left: 15px;
  border-radius: 3px;
  cursor: pointer;
  @media (max-width: 778px) {
    margin-left: 0;
    margin-top: 10px;
  }
`;
const notify = () => toast.info("Loading!!!");

const BookSearchForm = ({
  onSubmitHandler,
  searchTerm,
  onInputChange,
  error
}) => {
  return (
    <form onSubmit={onSubmitHandler}>
      <Input
        type="search"
        placeholder="Search for books"
        value={searchTerm}
        onChange={onInputChange}
        required
      />
      
        <Button type="submit" onClick={notify}>Search</Button>
      
      <ToastContainer position="top-center"
        autoClose={2500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
      {error && (
        <ErrorText>Error occurred while fetching books</ErrorText>
      )}
    </form>
  );
};

export default BookSearchForm;
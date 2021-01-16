import React, { useEffect, useState } from "react";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import NavigationBar from "../components/navigation/NavigationBar";
import { Container } from "../components/SharedBackGround";
import BooksList from "../components/BookList";
import ErrorText from "../components/ErrorText";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

export const SubjectSelectionBox = ({ match }) => {
    const { params: { subjectType } } = match;
    const [books, setBooks] = useState({ items: [] });
    const [error, setError] = useState(false);

    useEffect(() => {
        const API_BASE_URL = `https://www.googleapis.com/books/v1/volumes`;
        const fetchBooks = async () => {
            setError(false);
            try {
                const result = await axios.get(`${API_BASE_URL}?q=subject:${subjectType}&maxResults=40&orderBy=newest`);
                setBooks(result.data);
            } catch (error) {
                setError(true);
                toast.error("Something Went Wrong!")
            }
        };
        fetchBooks();
    }, [subjectType]);

    return (

        <>
            <NavigationBar />
            <div>
                {error && (
                    <ErrorText>Some error occurred, while fetching books API</ErrorText>
                )}
                <Container>
                    {books && <BooksList books={books} />}
                </Container>
            </div>
        </>
    );
};

export default SubjectSelectionBox;
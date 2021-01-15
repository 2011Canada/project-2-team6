import React, { useEffect, useState } from 'react'
import BooksCarousel from './BooksCarousel';
import { Book } from '../Model/Book';
import axios from 'axios';

export const PopularBooks: React.FunctionComponent = (props) => {

    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState(false);

    //let url = props.book.imgUrl

    useEffect(() => {
        const API_BASE_URL = `http://localhost:8080`;
        const retrievePopularBooks = async () => {
          setError(false);
          try {
            const result = await axios.get(`${API_BASE_URL}/popular`);
            setBooks(result.data);
          } catch (error) {
            setError(true);
          }
        };
        retrievePopularBooks();
      }, []);
    
    return (
        <div>
            <BooksCarousel books={books} />
        </div>
    );
}

export default PopularBooks
import React, { SyntheticEvent, useState } from 'react'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Fade, Grid, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core';
import { bookAuthors } from '../utils/authorLogic';
import Rating from '@material-ui/lab/Rating';
import { Link } from "react-router-dom";
import { Bookmark } from '@material-ui/icons';
import { toast } from 'react-toastify';
import axios from 'axios';

const useStyles = makeStyles({
    root: {
        maxWidth: 800,
    },
    media: {
        height: 800,
    },
});

const BookDetail = ({ book }) => {

    const [bookmark, setBookmark] = useState(null);
    const [error, setError] = useState(false);

    const classes = useStyles();

    const createDescMarkup = (description) => { return { __html: description }; };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = () => {
        Bookmark(book);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const newBookMark = {
            bookId: book.id,
            // userId: , 
            bookImage: `http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`,
            bookTitle: book.volumeInfo.title
        }

        console.log(newBookMark)
        try{
            const res = axios.post(`http://localhost:8080/bookmarks`, newBookMark)
            toast.success("Bookmarked!")
            setBookmark(res)
        } catch(error) {
            setError(true);
            toast.error("Something Went Wrong!")
        };
    }
    
    const [value, setValue] = React.useState<number | null>(2);

    return (
        <div>
            <div style={{ marginLeft: '7%' }}>
                <Grid container spacing={0} direction="row" alignItems="center" justify="center">
                    <Grid item xs={4}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                                />
                                <CardContent style={{ textAlign: 'center' }}>
                                    <Typography gutterBottom variant="h5" component="h2" >
                                        {book.volumeInfo.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Book Authors: {bookAuthors(book.volumeInfo.authors)}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Date Published: {book.volumeInfo.publishedDate}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Publisher:  {book.volumeInfo.publisher}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Page Count: {book.volumeInfo.pageCount}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>

                                <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick} style={{ color: '#3e5abb' }}>
                                    Save to Bookmarks
                                </Button>

                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>

            <section>
                <div
                    style={{
                        display: "flex",

                        marginTop: "2em",
                        marginLeft: "37%",
                        width: 600,
                    }}>
                    <div dangerouslySetInnerHTML={createDescMarkup(book.volumeInfo.description)} />
                </div>
            </section>
            {/* <div style={{ marginLeft: '50%' }}> */}
                <div style={{ marginLeft: '47%', marginTop: '1%'}}> 
                    <Box component="fieldset" mb={3} borderColor="transparent">
                        <Typography component="legend">Current Rating</Typography>
                        <Rating name="read-only" value={book.volumeInfo.averageRating} readOnly />
                    </Box>
                </div>
                <div style={{marginLeft:'47%', marginBottom: '10%'}}>
                    <a href={book.volumeInfo.infoLink} target='_blank'><button style={{ transitionDuration: '0.4s', backgroundColor: '#00A7E1', color: 'white' }}>Check it out on Google Books</button></a>
                </div>
            {/* </div> */}
            <section>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "2em",
                    marginLeft: "10%",
                    width: 300,
                }}>

                    {/* <h3>Community Reviews</h3>
                    <br></br> */}

                </div>
                <div style={{ marginLeft: '10%', borderTop: '2px solid lightgrey', borderWidth: 3 }}>

                </div>
                {/* <div style={{ marginLeft: '10%', borderTop: '2px solid lightgrey', borderWidth: 3 }}>
                    <div style={{ marginLeft: '1%' }}>
                        <h1 style={{ fontSize: 17 }}>Start your review of {book.volumeInfo.title} */}
                {/* TODO, user has to be signed in in order to leave a review */}
                {/* <Link to={`/book/${book.id}/user/review`} style={{ marginLeft: 20, alignItems: 'center', textDecoration: 'none' }}>
                                <Button variant="outlined" color="primary">
                                    Write a review
                            </Button>
                            </Link> */}
                {/* </h1> */}
                {/* <section> */}
                {/* <HoverRating /> */}
                {/* </section> */}
                {/* TODO user review starts below */}
                {/* <p>
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                        </p> */}
                {/* </div>
                </div> */}
            </section>
        </div>
    )
};

export default BookDetail;
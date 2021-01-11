import React from 'react'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Fade, Grid, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core';
import { bookAuthors } from '../utils/authorLogic';
import SimpleRating from './book-rating/CurrentRating';
import Rating from '@material-ui/lab/Rating';
import { Link } from "react-router-dom";
import HoverRating from './book-rating/FeedbackRating';
import ScrollUpButton from "react-scroll-up-button";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 550,
    },
});

const BookDetail = ({ book }) => {

    const classes = useStyles();

    const createDescMarkup = (description) => { return { __html: description }; };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    //TODO send data to java
    const handleWantToRead = () => {
        setAnchorEl(null);
    };

    const handleCurrentlyReading = () => {
        setAnchorEl(null);
    };

    const handleRead = () => {
        setAnchorEl(null);
    };

    const [value, setValue] = React.useState<number | null>(2);

    return (
        <div>
            <ScrollUpButton />
            <div style={{ marginLeft: '7%' }}>
                <Grid container spacing={0} direction="row" alignItems="center" justify="center">
                    <Grid item xs={3}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
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
                                    Choose Bookmark Options
                                </Button>
                                <Menu
                                    id="fade-menu"
                                    anchorEl={anchorEl}
                                    getContentAnchorEl={null}
                                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem onClick={handleWantToRead}>Want To Read</MenuItem>
                                    <MenuItem onClick={handleCurrentlyReading}>Currently Reading</MenuItem>
                                    <MenuItem onClick={handleRead}>Read</MenuItem>

                                </Menu>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>

            <section>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "2em",
                        marginLeft: "42%",
                        width: 300,
                    }}>
                    <div dangerouslySetInnerHTML={createDescMarkup(book.volumeInfo.description)} />
                </div>
            </section>
            <div style={{ marginLeft: '50%' }}>
                <div>
                    <Box component="fieldset" mb={3} borderColor="transparent">
                        <Typography component="legend">Current Rating</Typography>
                        <Rating name="read-only" value={book.volumeInfo.averageRating} readOnly />
                    </Box>
                </div>
                <a href={book.volumeInfo.infoLink} target='_blank'><button style={{ transitionDuration: '0.4s', backgroundColor: '#00A7E1', color: 'white', }}>Check it out on Google Books</button></a>
            </div>
            <section>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "2em",
                    marginLeft: "10%",
                    width: 300,
                }}>

                    <h3>Community Reviews</h3>
                    <br></br>

                </div>
                <div style={{ marginLeft: '10%', borderTop: '2px solid lightgrey', borderWidth: 3 }}>

                </div>
                <div style={{ marginLeft: '10%', borderTop: '2px solid lightgrey', borderWidth: 3 }}>
                    <div style={{ marginLeft: '1%' }}>
                        <h1 style={{ fontSize: 17 }}>Start your review of {book.volumeInfo.title}
                            {/* TODO, user has to be signed in in order to leave a review */}
                            <Link to={`/book/${book.id}/user/review`} style={{ marginLeft: 20, alignItems: 'center', textDecoration: 'none' }}>
                                <Button variant="outlined" color="primary">
                                    Write a review
                            </Button>
                            </Link>
                        </h1>
                        <section>
                            <HoverRating />
                        </section>
                        {/* TODO user review starts below */}
                        <p>
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default BookDetail;
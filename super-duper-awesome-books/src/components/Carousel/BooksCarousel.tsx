import React from 'react'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, makeStyles, withStyles } from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@material-ui/core'
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        maxWidth: 350,
    },
    media: {
        height: 300,
    },
});

export const BooksCarousel = ({ books }) => {

    console.log(books);

    return (
        <div style={{ width: '60%', marginLeft: '10%' }}>
            <Carousel>
                {books.map((book, index) => <Book key={index} item={book} />)}
            </Carousel>
        </div>
    )
}

function Book(props) {
    const classes = useStyles();
    return (

        <Paper elevation={20} style={{ height: '10%' }}>

            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia className={classes.media} image={props.item.bookImage} />
                </CardActionArea>
            </Card>
            <Link to={`/book/${props.item.bookId}`} style={{ textDecoration: 'none' }}>
                <Button className="CheckButton">
                    Check it out!
            </Button>
            </Link>
        </Paper>
    )
}

export default BooksCarousel








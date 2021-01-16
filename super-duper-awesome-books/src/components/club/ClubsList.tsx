import React from 'react'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, colors, Grid, makeStyles, Typography, withStyles } from '@material-ui/core'
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        maxWidth: 350,
        height: 150,
    },
    media: {
        height: 300,
    },
});

export const ClubsList = ({ clubs }) => {
    return (
        <div>
            {
                clubs.map((club, index) => {
                    return (
                        <div style={{ marginTop: '2em' }}>
                            <Club club={club} key={index} />
                        </div>
                    );
                })
            }
        </div>
    );
};

function Club(props) {
    const classes = useStyles();
    return (

        // <Paper elevation={20} style={{ height: '10%' }}>

        <Card className={classes.root}>
            <CardActionArea>
                {/* <CardMedia /> */}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.club.clubName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.club.clubDescription}
                    </Typography>

                </CardContent>
                <Link to={`/search-clubs/${props.club.clubId}`} style={{ textDecoration: 'none'}}>
                    <Button variant="outlined" size="small" color="primary">
                        Go to Club
                </Button>
                </Link>
            </CardActionArea>

        </Card>
        /* <Link to={`/book/${props.item.bookId}`} style={{ textDecoration: 'none' }}>
            <Button className="CheckButton">
                Check it out!
        </Button>
        </Link> */
        // </Paper>
    )
}
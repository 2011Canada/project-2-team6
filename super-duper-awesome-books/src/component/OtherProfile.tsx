import { Button, Card, CardActions, CardContent, CardMedia, createStyles, Divider, List, ListItem,ListItemText, makeStyles, Theme, Typography} from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        maxWidth: 345,
        "display": "block",
        "margin-left": "auto",
        "margin-right": "auto",
    },
    root_review: {
        '& .MuiInput-underline': {
            // Remove the ripple effect on input
            '&:after': {
              borderBottom: 'initial',
            },
        },
      width: '100%',
      maxWidth: '100ch',
      backgroundColor: theme.palette.background.paper,


    },
    inline: {
      display: 'inline',
    },
    review_container: {
        "display": "block",
        "margin-left": "auto",
        "margin-right": "auto",
        "margin-top": "5vh",
        "width": "40%",
    },
    editButton: {
        fontSize: "1.5vh",
        float: "right",
        bottom: "0"
    }
  }),
);

//Requirements: Prop user object with username and userid, should be enclosed in an authentication component
export const OtherProfile: React.FunctionComponent<any> = (props) => {
    const [userDescription, changeDescription] = useState("I am the greatest person in the entirety of the universe.")
    const [userReviews, changeReviews] = useState(new Array<any>())
    const [profileImage, changeProfileImage] = useState("")
    const [offset, changeOffset] = useState(0)
    const [limit, changeLimit] = useState(5)
    const [descriptionEditOpened, changeDescriptionEditingStatus] = useState(false)

    //Runs on first load
    useEffect(() => {
        //TODO: Replace example content with content from db, fetched using the user's ID as given by props


        let exampleReviews: Object[] = [
            {
                bookId: 1,
                reviewId: 1,
                reviewTitle: "Absolutely terrible",
                reviewDescription: "This book made my life worse than ever before after reading the first 2 pages, thanks.",
                rating: 0
            },
            {
                bookId: 2,
                reviewId: 2,
                reviewTitle: "Greatest book ever written in the history of the universe.",
                reviewDescription: "You must buy it and read it. Also, buy one for your parents, your siblings, your children, your dog. They will love it and forever love you for buying it for them, I promise you.",
                rating: 10
            },

        ]

        changeReviews(exampleReviews)


        //fetch pfp from db 

        getProfileImage();

    }, [])

    let showPreviousReviews = () => {
        if (limit - 5 > 0) {
            changeOffset(limit - 5)
            changeLimit(limit - 5)
        }

    }

    let showNextReviews = () => {
        if (limit <= userReviews.length) {
            changeOffset(limit)
            changeLimit(limit + 5)
        }


    }

    let getProfileImage = async () => {

        //get image from database
        let res = await axios.get("https://upload.wikimedia.org/wikipedia/commons/c/cc/Tellissaare.JPG",
            { responseType: 'arraybuffer' }
        )
        const base64 = btoa(
            new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                '',
            ),
        );
        changeProfileImage("data:;base64," + base64)


    }


    const classes = useStyles();

    return (
        <div className="content">
            <div className="dashboard">
                <Card className={classes.root}>
                    
                        <CardMedia
                            component="img"
                            alt={props.user.username}
                            height="140"
                            image={profileImage}
                            title={props.user.username}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {props.user.username}
                            </Typography>
                                 
                            <Typography variant="body2" color="textSecondary" component="p">
                                { userDescription}
                            </Typography>
         
                        </CardContent>
                   
                    <CardActions>
                        <Button size="small" color="primary">
                            Add Friend
                    </Button>

                    </CardActions>
                </Card>

            </div>

            <div className={classes.review_container}>

            <List className={classes.root_review}>

                {userReviews.slice(limit - 5, limit).map((review, i) => {
                    return (
                        
                    <div className= "review-element">
                
                    <ListItem alignItems="flex-start">
                
                        <ListItemText
                            primary={review.reviewTitle}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        {"Rating: "+ review.rating}
                                    </Typography>
                                    {" — "+review.reviewDescription}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    </div>
                            
                    )
                }) 
                
                }</List>
                <div><button type="button" onClick={() => showPreviousReviews()}>Previous 10</button></div>
                <div><button type="button" onClick={() => showNextReviews()}>Next 10</button></div>


            </div>
        </div>


    )



}

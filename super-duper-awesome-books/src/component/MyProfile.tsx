import {  Button, Card,  CardActions, CardContent, CardMedia, createStyles, Divider, Link, List, ListItem, ListItemText, makeStyles, TextField, Theme, Typography } from '@material-ui/core'
import axios from 'axios'
import { resolve } from 'dns';
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router';
import {Link as RouterLink} from 'react-router-dom'


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
    media: {
        height: 140,
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
export const MyProfile: React.FunctionComponent<any> = (props) => {
    const [userDescription, changeDescription] = useState("")
    const [userBookmarks, changeBookmarks] = useState(new Array<any>())
    const [profileImage, changeProfileImage] = useState("")
    const [offset, changeOffset] = useState(0)
    const [limit, changeLimit] = useState(5)
    const [descriptionEditOpened, changeDescriptionEditingStatus] = useState(false)

    //Runs on first load
    useEffect( () => {
        //TODO: Replace example content with content from db, fetched using the user's ID as given by props


        let exampleDescription = "I am the greatest person in the entirety of the universe."
        changeDescription(exampleDescription)

        /** 
        let exampleReviews: Object[] = [
            {
                bookId: 1,
                bookTitle: "Harry Potter and the Broken Washing Machine",
                bookImage: "",
            },
            {
                bookId: 2,
                bookTitle: "The Lord of the Ringolos",
                bookImage: "",
            },
            
        ]
        */
       axios.get("http://localhost:8080/bookmarks/"+props.user.userid ).then( res => {
        let data:Array<any> = res.data;
        changeBookmarks(data)
       }

       )



        //TO DO: fetch pfp from db 

        getProfileImage();

    }, [])

    let showPreviousReviews = () => {
        if (limit - 5 > 0) {
            changeOffset(limit - 5)
            changeLimit(limit - 5)
        }

    }

    let showNextReviews = () => {
        if (limit <= userBookmarks.length) {
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

    let toggleEditDescription =  () => {
        changeDescriptionEditingStatus(!descriptionEditOpened)
    }
    let enterKeyPress = (e:React.KeyboardEvent) => {
        if(e.key == 'Enter' && descriptionEditOpened){
           //TO DO: post request to change description
            
            toggleEditDescription()
           
        }
     }
    
    let handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeDescription(event.target.value)
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
                            { !descriptionEditOpened &&
                                    
                                <Typography variant="body2" color="textSecondary" component="p">
                                    { userDescription}
                                </Typography>
                            }
                            { descriptionEditOpened &&
                                <TextField
                                id="outlined-multiline-flexible"
                                multiline
                                rowsMax={4}
                                value={userDescription}
                                onKeyPress = {enterKeyPress}
                                onChange = {handleDescriptionChange}
                                variant="outlined"
                              />
                            }
                            
                            <Button className={classes.editButton} onClick= {toggleEditDescription}>Edit Description</Button>
                        </CardContent>
                   
                    <CardActions>

                    </CardActions>
                </Card>

            </div>

            <div className={classes.review_container}>

            <List className={classes.root_review}>

                {userBookmarks.slice(limit - 5, limit).map((bookmark, i) => {
                    return (
                        
                    <div className= "review-element">
                    <Link underline='none' component={RouterLink} to={"/books/"+bookmark.bookId}>
                    <CardMedia 
                        className={classes.media}
                            image={profileImage}//placeholder
                         title="book image"
                        />
                    </Link>
                    <ListItem alignItems="flex-start">
                        
                        <ListItemText
                        //TODO: Add links to the books
                            primary={bookmark.bookTitle}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                        
                                    >
                                        {"Image goes here: "+ bookmark.bookImage}
                                        
                                    </Typography>
                                    {" — "+bookmark.bookDescription}
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

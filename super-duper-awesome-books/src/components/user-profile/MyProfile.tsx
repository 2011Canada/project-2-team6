import { Button, Card, CardActions, Grid, CardContent, CardMedia, createStyles, Divider, List, ListItem, ListItemText, makeStyles, TextField, Theme, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ScrollUpButton from "react-scroll-up-button";
import Bookshelf from './Bookshelf.jpg'
import { Link } from "react-router-dom";
import ProtectRoute from '../protected-route/ProtectRoute';


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
export const MyProfile: React.FunctionComponent<any> = (props) => {
    const classes = useStyles();
    const [userDescription, changeDescription] = useState("")
    const [userReviews, changeReviews] = useState(new Array<any>())
    const [profileImage, changeProfileImage] = useState("")
    const [offset, changeOffset] = useState(0)
    const [limit, changeLimit] = useState(5)
    const [descriptionEditOpened, changeDescriptionEditingStatus] = useState(false)
    const [bookmarks, changeBookmarks] = useState([])

    //Runs on first load
    useEffect(() => {
        //TODO: Replace example content with content from db, fetched using the user's ID as given by props


        let exampleDescription = "I am the greatest person in the entirety of the universe."
        changeDescription(exampleDescription)



        getProfileImage();
        retrievBookmarksById();


    }, [])



    let retrievBookmarksById = async () => {
        try {
            const API_BASE_URL = `http://localhost:8080`;
            let response: any = await axios.get(`${API_BASE_URL}/bookmarks/${props.User.userId}`);
            let data: any = response.data
            changeBookmarks(data)
        }

        catch (e) {
            console.log(e.stack)
        }

    }
    let deleteBookmark = async () => {
        try {
            const API_BASE_URL = `http://localhost:8080`;
            let response: any = await axios.post(`${API_BASE_URL}/bookmarks/${props.User.userId}/${props.User.bookmark.bookId}`);
            let data: any = response.data
            changeBookmarks(data)
        }

        catch (e) {
            console.log(e.stack)
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

    let toggleEditDescription = () => {
        changeDescriptionEditingStatus(!descriptionEditOpened)
    }
    let enterKeyPress = (e: React.KeyboardEvent) => {
        if (e.key == 'Enter' && descriptionEditOpened) {
            //TO DO: post request to change description

            toggleEditDescription()

        }
    }

    let handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeDescription(event.target.value)
    }


    return (

        <div className="content">
            <div className="dashboard" style={{ marginTop: '6%' }}>
                 <Card className={classes.root}>

                    <CardMedia
                        component="img"
                        alt={props.user.userName} //
                        height="340"
                        image={profileImage}
                        title={props.user.userName}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.user.userName}
                        </Typography>
                        {!descriptionEditOpened &&

                            <Typography variant="body2" color="textSecondary" component="p">
                                {userDescription}
                            </Typography>
                        }
                        {descriptionEditOpened &&
                            <TextField
                                id="outlined-multiline-flexible"
                                multiline
                                rowsMax={4}
                                value={userDescription}
                                onKeyPress={enterKeyPress}
                                onChange={handleDescriptionChange}
                                variant="outlined"
                            />
                        }

                        <Button className={classes.editButton} onClick={toggleEditDescription}>Edit Description</Button>
                    </CardContent>

                    <CardActions>

                    </CardActions>
                </Card> */

            </div>


            <div style={{ backgroundImage: `url(${Bookshelf})`, marginTop: '2%', marginLeft: '1%', marginRight: '1%', display: "flex", padding: "3%" }}>

                {bookmarks.map((bookmark, index) => {
                    return (

                        <div style={{ padding: "1%" }}>
                            <Link to={`/book/${bookmark.bookId}`} style={{ textDecoration: 'none' }}>
                                <img src={bookmark.bookImage} />
                            </Link>
                            <Button onClick={deleteBookmark}>Delete Bookmark</Button>
                        </div>
                    )
                }
                )
                }

            </div>
        </div>

    )



}

export default ProtectRoute(MyProfile)
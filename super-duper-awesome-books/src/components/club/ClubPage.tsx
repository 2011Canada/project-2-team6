import { Button, Card, CardContent, CardMedia, createStyles, Divider, Drawer, GridList, GridListTile, GridListTileBar, IconButton, List, ListItem, ListItemText, ListSubheader, makeStyles, TextField, Theme, Tooltip, Typography, useRadioGroup } from '@material-ui/core'
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useEffect, useState } from 'react'
import NavigationBar from '../navigation/NavigationBar';


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

            backgroundColor: theme.palette.background.paper,
            "display": "block",
            "margin-left": "auto",
            "margin-right": "auto",
            "margin-top": "5vh",
            "width": "40%",
        },
        gridList: {

            width: "500vw",
            height: 400,
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
            height: "50vh",
            width: "40vh",
            "margin-top": "50vh",
            "z-index": "-5"
        },
        bookElement: {

            height: "50vh",
            width: "40%",
            "margin-top": "30vh"
        },
        inline: {
            display: 'inline',
        },
        review_container: {
            "display": "flex",
            "justify-content": "center",
            "margin-left": "auto",
            "margin-right": "auto",
            "margin-top": "5vh",
            "width": "50%",
        },
        editButton: {
            fontSize: "1.5vh",
            float: "right",
            bottom: "0"
        },
        membersList: {

        },
        icon: {
            "z-index": "5000000"
        },
        toolbar: theme.mixins.toolbar,
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
    }),
);

export const Club: React.FunctionComponent<any> = ({match}) => {
    const { params: { clubId }} = match
    const [clubName, changeClubName] = useState("")
    const [clubDescription, changeClubDescription] = useState("")
    const [clubBooks, changeClubBooks] = useState(new Array<any>())
    const [clubMembers, changeMembers] = useState(new Array<any>())
    const [clubComments, changeComments] = useState(new Array<any>())
    const [profileImage, changeProfileImage] = useState("")
    const [bookOffset, changeOffset] = useState(0)
    const [bookLimit, changeLimit] = useState(4)
    const [userIsMember, changeMembership] = useState(false)
    const [hasUser, changeHasUser] = useState(false)
    const [userComment, changeUserComment] = useState("")
    const [currentBook, changeBook] = useState("")

    const loggedInUser = localStorage.getItem('user');

    useEffect(() => {
        let clubName
        let clubDescription
        let clubBooks
        let clubMembers
        let clubComments


        async function fetchClubData() {


            if (loggedInUser) {
                let user = await axios.get(`http://localhost:8080/users/${loggedInUser}`).then((res) => { return res.data })
                if (user) {
                    changeHasUser(true);

                    let members: Array<any> = await axios.get(`http://localhost:8080/clubs/${clubId}/members`).then((res) => { return res.data })
                    console.log(typeof members)
                    members.forEach((member) => {
                        if (member.userId == loggedInUser) {
                            changeMembership(true)
                            console.log(userIsMember)
                        }
                    })

                }
            }


            let { clubName, clubDescription } = await axios.get("http://localhost:8080/clubs/" + clubId).then((res) => {
                return res.data
            })
            let clubBookIds: Array<any> = await axios.get("http://localhost:8080/clubs/" + clubId + "/books").then((res) => { return res.data })
            let clubBooks = await Promise.all(clubBookIds.map(async (bookId) => {
                let result = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
                let book = result.data
                return { bookId: bookId, bookTitle: book.volumeInfo.title, bookImage: `http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`, bookAuthor: book.volumeInfo.authors }
            }))

            let clubMembers: Array<any> = await axios.get("http://localhost:8080/clubs/" + clubId + "/members").then((res) => {
                return res.data
            })
            let clubCommentsRaw = await axios.get("http://localhost:8080/clubs/" + clubId + "/comments").then((res) => { return res.data })
            let clubComments = await Promise.all(clubCommentsRaw.map(async (comment) => {
                let result = await axios.get(`http://localhost:8080/users/${comment.userId}`)
                let commenter = result.data
                return { commentId: comment.commentId, userId: comment.userId, username: commenter.username, comment: comment.comment }
            }))

            changeClubDescription(clubDescription)
            changeClubName(clubName)
            changeClubBooks(clubBooks)
            changeMembers(clubMembers)
            changeComments(clubComments)
        }

        fetchClubData()



    }, [])


    const classes = useStyles();

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

    let showPreviousBooks = () => {
        if (bookLimit - 4 > 0) {
            changeOffset(bookLimit - 4)
            changeLimit(bookLimit - 4)
        }

    }

    let showNextBooks = () => {
        if (bookLimit <= clubBooks.length) {
            changeOffset(bookLimit)
            changeLimit(bookLimit + 4)
        }


    }
    let handleChangeUserComment = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeUserComment(event.target.value)
    }

    let submitUserComment = () => {
        let commentData = {
            clubId: clubId,
            comment: userComment,
            userId: loggedInUser
        }
        axios.post(`http://localhost:8080/clubs/${clubId}/comments`, commentData)
        changeUserComment("")
        window.location.reload();
    }

    let submitJoinClub = () => {
        let joinData = { userId: loggedInUser }
        axios.post(`http://localhost:8080/clubs/${clubId}/members`, joinData)
        window.location.reload();
    }

    let submitLeaveClub = () => {
        axios.delete(`http://localhost:8080/clubs/${clubId}/members`, { data: { userId: loggedInUser } })
        window.location.reload();
    }

    let removeBookFromClub = (bookId: String) => {
        console.log(bookId)
        axios.delete(`http://localhost:8080/clubs/${clubId}/books`, { data: bookId })
        window.location.reload();
    }

    let handleChangeBook = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeBook(event.target.value)
    }
    let submitBook = () => {

        axios.post(`http://localhost:8080/clubs/${clubId}/books`, { bookId: currentBook })
        window.location.reload();
    }

    return (

        <div className="content">
            
            <NavigationBar style={{marginRight:'10%'}}/>
            <div className="dashboard">
                <Card className={classes.root}>

                    <CardMedia
                        component="img"
                        alt={clubName}
                        height="140"
                        image={profileImage}
                        title={clubName}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {clubName}
                        </Typography>

                        <Typography variant="body2" component="p">
                            {clubDescription}
                        </Typography>
                    </CardContent>
                    {(hasUser && !userIsMember) && <Button variant="contained" onClick={submitJoinClub} color="primary">Join Club</Button>}
                    {(hasUser && userIsMember) && <Button variant="contained" onClick={submitLeaveClub} color="secondary">Leave Club</Button>}
                </Card>
            </div>


            <div className={classes.membersList}>

                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="right"
                >
                    <Typography gutterBottom variant="h5" component="h2">
                        Club Members
                    </Typography>
                    <div className={classes.toolbar} />
                    <Divider />
                    <List>
                        {clubMembers.map((member) => (
                            <ListItem button key={member.username}>
                                <ListItemText primary={member.username} />
                            </ListItem>


                        ))}  </List></Drawer>


            </div>
            <div className={classes.review_container}>

                <GridList cellHeight={250} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                        <ListSubheader component="div" style={{ fontSize: '400%' }}>Books</ListSubheader>
                    </GridListTile>
                    {clubBooks.map((book) => (

                        <>
                            <GridListTile key={book.bookImg} style={{ marginLeft: '8%', marginTop: '1%', width:'25%'}}>
                                <a href={`/book/${book.bookId}`}>
                                    <img src={book.bookImage} alt={book.bookTitle} />
                                </a>
                                <GridListTileBar
                                    title={book.bookTitle}
                                    subtitle={<span>by: {book.bookAuthor}</span>}
                                />
                            </GridListTile>
                            {(hasUser && userIsMember) &&


                                <div className={classes.icon}>
                                    <Tooltip title="Delete" >
                                        <IconButton aria-label="delete" >
                                            <DeleteIcon onClick={() => { removeBookFromClub(book.bookId) }} />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            }
                        </>


                    ))}
                </GridList>


            </div>

            <Divider variant="inset" />
            <div style={{ marginTop: '2%' }}> 
                {/* <Button variant="contained"  onClick={() => showPreviousBooks()} style={{ marginRight: '1em' }}>Previous 4</Button>
                <Button variant="contained" onClick={() => showNextBooks()}>Next 4</Button> */}
            </div> 


            <div style={{ marginTop: '1em' }}>

                {(hasUser && userIsMember) &&
                    <React.Fragment>

                        <TextField
                            id="outlined-multiline-flexible"
                            multiline
                            label="Please enter book-id"
                            rowsMax={4}
                            value={currentBook}
                            onChange={handleChangeBook}
                            variant="outlined"
                        />
                        <div style={{ marginTop: '1em' }}>
                            <Button variant="contained" onClick={submitBook}>Submit Book</Button>
                        </div>
                    </React.Fragment>
                }


            </div>

            <div>
                <List className={classes.root}>

                    {clubComments.map((comment) =>
                        <React.Fragment>
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary={comment.comment}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                {comment.username}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </React.Fragment>)}





                </List>

            </div>
            <div style={{ marginBottom: '10%' }}>

                {hasUser &&
                    <React.Fragment>
                        <TextField
                            id="outlined-multiline-flexible"
                            multiline
                            rowsMax={4}
                            value={userComment}
                            onChange={handleChangeUserComment}
                            variant="outlined"
                        />
                        <div style={{marginTop: '2em'}}>
                            <Button variant="contained" onClick={submitUserComment}>Submit Comment</Button>
                        </div>
                    </React.Fragment>
                }


            </div>

        </div>

    )
}
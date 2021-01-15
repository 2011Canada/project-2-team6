import { Button, Card, CardContent, CardMedia, createStyles, Divider, Drawer, GridList, GridListTile, GridListTileBar, IconButton, Link, List, ListItem, ListItemText, ListSubheader, makeStyles, TextField, Theme, Tooltip, Typography, useRadioGroup } from '@material-ui/core'
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useEffect, useState } from 'react'
import {Link as RouterLink} from 'react-router-dom'

interface IClub{
    clubId:number
    userId:number
}

interface IUser {
    "username": String,
    "userId": Number,
    "firstName": String,
    "lastName": String,
    "email": String
}

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
          
        width: "400vw",
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
        width: "25vh",
        "margin-top": "50vh",
        "z-index": "-5"
      },
      bookElement: {
        
        height: "50vh",
        width: "25vh",
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
        "width": "40%",
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

export const Club:React.FunctionComponent<IClub> = (props) => {
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
    
    
    useEffect(() => {
        let clubName
        let clubDescription
        let clubBooks
        let clubMembers
        let clubComments


        async function fetchClubData() {


            if(props.userId) {
                let user = await axios.get(`http://localhost:8080/users/${props.userId}`).then((res)=> {return res.data})
                if(user) {
                    changeHasUser(true);

                    let members:Array<any> = await axios.get(`http://localhost:8080/clubs/${props.clubId}/members`).then((res)=> {return res.data})
                    console.log(typeof members)
                    members.forEach((member) => {
                        if(member.userId === props.userId) {
                            changeMembership(true)
                        }
                    } )

                }
            }


            let {clubName, clubDescription} = await axios.get("http://localhost:8080/clubs/"+props.clubId).then((res) => {
                return res.data
            })
            let clubBookIds:Array<any> =  await axios.get("http://localhost:8080/clubs/"+props.clubId+"/books").then((res) => { return res.data} )
            let clubBooks = await Promise.all(clubBookIds.map(async (bookId) => {
                let result = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
                let book = result.data
                return {bookId: bookId, bookTitle: book.volumeInfo.title, bookImage: `http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`, bookAuthor: book.volumeInfo.authors}
            }))

            let clubMembers:Array<any> =  await axios.get("http://localhost:8080/clubs/"+props.clubId+"/members").then((res) => {
                return res.data
            })
            let clubCommentsRaw =  await axios.get("http://localhost:8080/clubs/"+props.clubId+"/comments").then((res) => { return res.data})
            let clubComments = await Promise.all(clubCommentsRaw.map(async (comment) => {
                let result = await axios.get(`http://localhost:8080/users/${comment.userId}`)
                let commenter = result.data
                return {commentId: comment.commentId, userId: comment.userId, username: commenter.username, comment: comment.comment}
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
            clubId: props.clubId,
            comment: userComment,
            userId: props.userId
        }
        axios.post(`http://localhost:8080/clubs/${props.clubId}/comments`, commentData)
        changeUserComment("")
    }

    let submitJoinClub = () => {
        let joinData = {userId: props.userId}
        axios.post(`http://localhost:8080/clubs/${props.clubId}/members`, joinData)
    }

    let submitLeaveClub = () => {
        axios.delete(`http://localhost:8080/clubs/${props.clubId}/members`, {data:{userId: props.userId}})
    }

    let removeBookFromClub = (bookId:String) => {
        console.log(bookId)
        axios.delete(`http://localhost:8080/clubs/${props.clubId}/books`,  {data: bookId})
    }

    let handleChangeBook = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeBook(event.target.value)
    }
    let submitBook = () => {
        
        axios.post(`http://localhost:8080/clubs/${props.clubId}/books`, {bookId: currentBook})
    }

    return(
        
        <div className="content">
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
                                    { clubDescription}
                                </Typography>
                            </CardContent>
                            {(hasUser&&!userIsMember) && <Button variant="contained" onClick = {submitJoinClub} color="primary">Join Club</Button>}
                            {(hasUser&&userIsMember) && <Button variant="contained" onClick= {submitLeaveClub} color="secondary">Leave Club</Button>}
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
                    <ListSubheader component="div">Books</ListSubheader>
                </GridListTile>
                {clubBooks.slice(bookLimit - 4, bookLimit).map((book) => (
                    
                    <>
                        <GridListTile key={book.bookImg}>
                        <img src={book.bookImage} alt={book.bookTitle}/>
                        
                        <GridListTileBar
                            title={book.bookTitle}
                            subtitle={<span>by: {book.bookAuthor}</span>}
                            
                        />
                        </GridListTile>
                        {(hasUser&&userIsMember) && 
                        
                    
                        <div className={classes.icon}>
                                <Tooltip title="Delete" >
                                <IconButton aria-label="delete" >
                                <DeleteIcon onClick={() => {removeBookFromClub(book.bookId)}}/>
                                </IconButton>
                                </Tooltip>
                            </div>
                            }
                        </>
                        
                    
                ))}
            </GridList>

   
        </div>
        
        <Divider variant="inset" component="li" />
        <div><button type="button" onClick={() => showPreviousBooks()}>Previous 4</button></div>
        <div><button type="button" onClick={() => showNextBooks()}>Next 4</button></div>
        

        <div>

            {(hasUser&&userIsMember) && 
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
                    <div>
                        <Button variant="contained" onClick={submitBook}>Submit Book</Button>
                    </div>
                </React.Fragment>
            }


        </div>

        <div>
        <List className={classes.root}>
            
            {clubComments.map((comment)=>
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
         </React.Fragment>    )}
            



      
    </List>

        </div>
        <div>

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
                    <div>
                    <Button variant="contained" onClick={submitUserComment}>Submit Comment</Button>
                    </div>
                </React.Fragment>
            }


        </div>




    </div>   
                             
    )
}

import { Button, createStyles, makeStyles, TextField, Theme } from '@material-ui/core';
import React, { useState } from 'react'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    buttons: {
        margin: "1vh"
    }
  }),
);


export const ClubRegistration:React.FunctionComponent<any> = (props) => {
    const classes = useStyles();
    const [clubName, changeClubName] = useState("")
    const [clubDescription, changeClubDescription] = useState("")

    let handleClubNameChange = (event: React.ChangeEvent<HTMLInputElement>)  => {
        changeClubName(event.target.value)
    }

    let handleClubDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>)  => {
        changeClubDescription(event.target.value)
    }
    let handleSubmit = () => {
        let clubData = {
            clubName,
            clubDescription
        }
        //post request to create a club using clubData




    }


    return(
        <form className={classes.root} noValidate autoComplete="off">
            <div>
            <TextField required id="standard-required" value = {clubName} label="Club Name" onChange={handleClubNameChange}/>
            </div>
            <div>
            <TextField
            id="standard-multiline-flexible"
            label="Club Description"
            multiline
            rowsMax={4}
            value={clubDescription}
            onChange={handleClubDescriptionChange}
            />
            </div>
            <div>
            <Button className= {classes.buttons} variant="contained" component="label">
                Upload Club Profile Image
            <input type="file" accept='image/*' hidden />
            </Button>
            </div>
            <div>
            <Button className= {classes.buttons} variant="contained" onClick = {handleSubmit} color="primary">
                Submit
            </Button>
            </div>
        </form>

    )

}



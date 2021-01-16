
import { Button, createStyles, makeStyles, TextField, Theme } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react'
import wood from '../../pictures/wood.jpg'
import LoginBorder from '../fancy-border/LoginBorder';
import NavigationBar from '../navigation/NavigationBar';


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


export const ClubRegistration: React.FunctionComponent<any> = (props) => {
    const classes = useStyles();
    const [clubName, changeClubName] = useState("")
    const [clubDescription, changeClubDescription] = useState("")
    const [clubImage, changeClubImage] = useState({})
    let fileInput: React.RefObject<HTMLInputElement> = React.createRef();

    let handleClubNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeClubName(event.target.value)
    }

    let handleClubDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeClubDescription(event.target.value)
    }

    let onFileUpload = e => {
        fileInput.current.click();
        const file: Blob = e.target.files[0];
        var reader = new FileReader();
        var fileByteArray = [];
        reader.readAsArrayBuffer(file);
        reader.onloadend = function (evt) {
            if (evt && evt.target.readyState == FileReader.DONE) {
                var arrayBuffer: any = evt.target.result,
                    array = new Uint8Array(arrayBuffer);
                for (var i = 0; i < array.length; i++) {
                    fileByteArray.push(array[i]);
                }
            }
        }
        changeClubImage(fileByteArray)
    }

    let handleSubmit = () => {
        let clubData = {
            clubName,
            clubDescription,
            clubImage
        }
        //post request to create a club using clubData

        axios.post("http://localhost:8080/clubs", clubData);

    }


    return (
        <div style={{ backgroundImage: `url(${wood})`, backgroundSize: 'cover', height: '100vh' }}>
            <NavigationBar />
            <div style={{ marginLeft: '40%', marginTop: '8%' }}>

                <LoginBorder>
                    <div style={{ marginTop: '20%' }}>
                        <h6 style={{ fontSize: '200%', color: 'grey' }}>Club Register</h6>
                        <form className={classes.root} noValidate autoComplete="off">
                            <div>
                                <TextField required id="standard-required" value={clubName} label="Club Name" onChange={handleClubNameChange} />
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
                            <div style={{marginTop: '10%'}}>
                                <Button className={classes.buttons} variant="contained" component="label">
                                    Upload Club Profile Image
                                    <input type="file" accept='image/*' ref={fileInput} onChange={onFileUpload} hidden />
                                </Button>
                            </div>
                            <div style={{marginTop: '10%'}}>
                                <Button className={classes.buttons} variant="contained" onClick={handleSubmit} color="primary">
                                    Submit
                            </Button>
                            </div>
                        </form>
                    </div>
                </LoginBorder>

            </div>
        </div>
    )

}
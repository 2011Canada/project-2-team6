import React, { SyntheticEvent, useState  } from 'react';
import { Button, Grid, TextField } from '@material-ui/core'



export const Register: React.FunctionComponent<any> = (props) => {
        const [username, changeUsername] = useState("")
        const [password, changePassword] = useState("")
        const [firstname, changeFirstname] = useState("")
        const [lastname, changeLastname] = useState("")
        const [email, changeEmail] = useState("")

        
    
        const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            changeUsername(e.target.value)
        }
        const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            changePassword(e.target.value)
        } 
        const handleFirstnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            changeFirstname(e.target.value)
        }
        const handleLastnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            changeLastname(e.target.value)
        }
        const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            changeEmail(e.target.value)
        }
const handleSubmit = async (e:SyntheticEvent) => {
        e.preventDefault();

        console.log(username)
        console.log(password)
        console.log(firstname)
        console.log(lastname)
        console.log(email)
    }
    // const submitLogin = async (e:SyntheticEvent) => {
    //     //wwhat does submit normally do?
    //     e.preventDefault()
    //     //send username and password to a remote location to get the user info/auth token
    //     try {
    //         let user = await e720Login(username, password)
    //         props.updateCurrentUser(user)
    //     }catch(e){
    //         changePassword("")
    //         toast.error(e.message)
    //     }
    // }
   

    return(
     <div>
         <form onSubmit={handleSubmit}>
         <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
                spacing={2}
            >
                <Grid  item>
                    <div > 
                    <TextField  value={username} onChange={handleUsernameChange} id="username" label="Username" variant="outlined" autoComplete="off" /> &nbsp;
                    <TextField  value={password} onChange={handlePasswordChange} id="password" label="Password" variant="outlined" type="password" />

                    </div>
                </Grid>
                <Grid item>
                    <TextField value={firstname} onChange={handleFirstnameChange} id="firstname" label="Firstname" variant="outlined" />  &nbsp;
                    <TextField value={lastname} onChange={handleLastnameChange} id="lastname" label="Lastname" variant="outlined"  />
                </Grid>
                <Grid item>
                    <TextField value={email} onChange={handleEmailChange} id="email" label="Email" variant="outlined" type="email" />
                </Grid>
                <Grid item>
                    <Button type="submit" variant="outlined">Register</Button>
                </Grid>
                    
            </Grid>
         </form>


     </div>

     
    )
}


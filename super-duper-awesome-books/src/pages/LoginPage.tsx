import React, { useState } from "react";
import { TextField, Button, FormControl } from '@material-ui/core';
import wood from '../pictures/wood.jpg';
import { useHistory } from "react-router-dom";
import { BookStoreLogin } from "../components/bookStore-function";
import LoginBorder from "../components/fancy-border/LoginBorder";
import FooterPage from '../components/footer/Footer';


export const Login: React.FunctionComponent = (props) => {

    const history = useHistory();
    const [user, setUser] = useState();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")



    const onChangeUsername = (event: any) => {
        setUsername(event.target.value);
    }

    const passwordOnChange = (event: any) => {
        setPassword(event.target.value);
    }
    

    const onLogin = async (e) => {
            e.preventDefault();

            try {
                let user = await BookStoreLogin(username, password);
                setUser(user.data)
                localStorage.setItem('user', user.userId)
                localStorage.setItem('username', user.username)
                localStorage.setItem('firstname', user.firstName)
                localStorage.setItem('lastname', user.lastName)
                if (user) {
                    authentication(user);
                } else {
                }
            } catch (e) {
            }
         
    }

    const authentication = (user: any) => {
        if (user !== undefined) {
            history.push({
                pathname: '/home'
            });
        }
    }

    return (
        <div style={{ backgroundImage: `url(${wood})`, backgroundSize: 'cover', height: '100vh', paddingTop: '1%' }}>
            <div style={{ marginLeft: '40%', marginTop: '10%' }}>
                <form onSubmit={onLogin}>
                    <LoginBorder>
                        <div style={{ marginTop: '5%' }}>
                            <h6 style={{ fontSize: '200%', color: 'grey' }}>Login</h6>
                            <div style={{ marginTop: "15%" }}>
                                <FormControl>
                                    <div>
                                        <TextField variant="outlined" margin="normal" required placeholder="Username" name="username" value={username} onChange={onChangeUsername} />
                                    </div>
                                    <div>
                                        <TextField variant="outlined" margin="normal" required type="password" placeholder="Password" value={password} onChange={passwordOnChange} />
                                    </div>
                                    <div style={{marginTop: '10%'}}>
                                        <Button type="submit" fullWidth variant="contained" > Sign In </Button>
                                    </div>
                                    <Button href="/register" variant='contained' color='secondary' style={{ marginTop: "15%" }}>Register New Account!</Button>
                                </FormControl>
                            </div>
                        </div>
                    </LoginBorder>
                    <FooterPage />
                </form>

            </div>
        </div>
    );
}
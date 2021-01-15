import React, { SyntheticEvent, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import LoginBorder from '../components/fancy-border/LoginBorder';
import FooterPage from '../components/footer/Footer';
import { toast } from 'react-toastify'
import { BookStoreLogin } from '../components/remote/bookStore/bookStore-function'
import { Redirect } from "react-router-dom";
import { User } from '../components/Model/User';



interface ILoginProps{
    updateCurrentUser: (u:User) => void
    currentUser:User
}

export const LoginForm: React.FunctionComponent<ILoginProps> = (props) => {
    const [username, changeUsername] = useState("")
    const [password, changePassword] = useState("")
    

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeUsername(e.target.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        changePassword(e.target.value)
    }

    //synthetic even is a type provided by react for standardizing different browser events
        const submitLogin = async (e:SyntheticEvent) => {
        e.preventDefault()
        try {
            let user = await BookStoreLogin(username, password)
            props.updateCurrentUser(user)
        }catch(e){
            changePassword("")
            toast.error(e.message)
        }
    }

        return (
            (props.currentUser) ?
             <Redirect  to='/home'/>
                :
                <form onSubmit={submitLogin}>
                    <LoginBorder>
                        <div id="login-container" style={{ marginTop: "20%" }}>
                            <FormControl>
                                <div className="input-field">
                                    <TextField label="username" variant="outlined" name="user" id="username" onChange={handleUsernameChange} />
                                </div>
                                <div className="input-field" style={{ marginTop: '15%' }}>
                                    <TextField label="Password" variant="outlined" name="password" id="password" onChange={handlePasswordChange}  />
                                
                                </div>
                                <button type="submit" className="btn btn-outline-secondary" onClick={submitLogin} style={{ marginTop: "15%" }}>Login</button>
                            </FormControl>
                        </div>    
                    </LoginBorder>             
                    <FooterPage />
                </form>
                
        )
    }

export default LoginForm

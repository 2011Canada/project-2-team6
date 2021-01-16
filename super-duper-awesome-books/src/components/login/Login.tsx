import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
import LoginBorder from '../fancy-border/LoginBorder';
import FooterPage from '../footer/Footer';
import wood from '../../pictures/wood.jpg';
import { toast } from 'react-toastify';

interface IUserState {
    username: String;
    password: String;
}

export default class LoginPage extends React.Component<any, IUserState> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e: any) {
        e.preventDefault();
        let targetName = e.target.name

        if (targetName === 'user') {
            this.setState({
                username: e.target.value
            })
        } else if (targetName === 'password') {
            this.setState({
                password: e.target.value
            });
        }
    }

    async handleSubmit(e: any) {
        e.preventDefault();
        let credentials: any = {
            username: this.state.username,
            password: this.state.password
        }

        try {

            let response: any = await axios.post("http://localhost:8080/login/verify", credentials);
            let data: any = response.data

            if (data) {
                this.props.updateLoginStatus(true);
                this.props.updateCurrentUser(data);
                console.log(data)
                window.location.href = "localhost:3000/home"
            }

        } catch (e) {
            toast.error("Please Enter Valid Login!")
        }

    }

    render() {

        return (
            <div style={{backgroundImage: `url(${wood})`, backgroundSize: 'cover', height: '100vh', paddingTop: '1%'}}>
                <div style={{marginLeft:'40%', marginTop: '10%'}}>
                    <LoginBorder>
                        <div style={{ marginTop: "20%" }}>
                            <h6 style={{fontSize:'200%', color: 'grey'}}>Login Form</h6>
                            <FormControl>
                                <div className="input-field">
                                    <TextField label="User Name" variant="outlined" name="user" onChange={this.handleChange} />
                                </div>
                                <div className="input-field" style={{ marginTop: '15%' }}>
                                    <TextField label="Password" type="password" variant="outlined" name="password" onChange={this.handleChange} />
                                </div>
                                <button type="submit" className="btn btn-outline-secondary" onClick={this.handleSubmit} style={{ marginTop: "15%" }}>Login</button>
                            </FormControl>
                        </div>
                    </LoginBorder>
                </div>
                <FooterPage />
            </div>
        )
    }

}

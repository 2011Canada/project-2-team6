import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import axios from './axiosconfig';
import LoginBorder from './LoginBorder';
import './login.css';


interface IUserState {
    userName: String;
    password: String;
}

export default class Login extends React.Component<any, IUserState> {
    constructor(props: any){
        super(props);
        this.state = {
            userName: '',
            password: '' 
        }
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
    }

handleChange(e: any){
e.preventDefault();
let targetName = e.target.name

if (targetName==='user'){
this.setState({
    userName: e.target.value
})
} else if (targetName==='password'){
    this.setState({
        password: e.target.value
});
}
}

async handleSubmit(e: any){
e.preventDefault();
let credentials: any = {
    userName: this.state.userName,
    password: this.state.password
}

try {

let response: any = await axios.post("/login/verify", credentials);
let data: any = response.data

if(data){
this.props.updateLoginStatus(true);
this.props.updateCurrentUser(data);
}

} catch(e){
    console.log(e.stack)
}





}

    render(){

return(
    
 <LoginBorder>   
<div id="login-container" style={{marginTop:"10%"}}>
    <FormControl>
        <div className="input-field">
        <TextField label="User Name"  variant="outlined" name="user" onChange={this.handleChange}/>
        </div>
        <div className="input-field">
        <TextField label="Password"  variant="outlined" name="password" onChange={this.handleChange}/>
        </div>
        <button type="submit" className="btn btn-outline-secondary" onClick={this.handleSubmit}>Login</button>
    </FormControl>
</div>
</LoginBorder>
)
    }

}




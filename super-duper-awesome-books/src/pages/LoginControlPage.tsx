import React from 'react';
import Login from '../components/login/Login';




export interface IUser {
    userId: number,
    userName: String,
    firstName: String,
    lastName: String
}

export default class LoginControlPage extends React.Component<any, any> {
    constructor(props: any){
        super(props);
        this.state = {
            loggedIn: false,
            currentUser: null 
        }
        this.updateLoginStatus = this.updateLoginStatus.bind(this)
        this.updateCurrentUser = this.updateCurrentUser.bind(this)
    }

updateLoginStatus(val: any) {
    this.setState({
        loggedIn: val
    })
}

updateCurrentUser(user: any){
    this.setState({
        currentUser: user
    })

}
    render(){
if (!this.state.loggedIn){
    return <Login updateLoginStatus={this.updateLoginStatus} updateCurrentUser={this.updateCurrentUser}/> 
}else{
    return <Login updateLoginStatus={this.updateLoginStatus} updateCurrentUser={this.updateCurrentUser}/> 
}
    }}
// else if (this.state.loggedIn) {
//     return <MyProfile updateLoginStatus={this.updateLoginStatus} updateCurrentUser={this.updateCurrentUser} currentUser={this.state.currentUser}/>
// }}
// }

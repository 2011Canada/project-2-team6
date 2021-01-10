import React, { useState } from 'react';
import {BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import { MyProfile } from './component/MyProfile';
import { OtherProfile } from './component/OtherProfile';


function App() {
  const [user, changeUser] = useState({userid: 1, username: "TheGreatestUsernameEver", firstName: "John", lastName:"Smith"})

  return (
    <div className="App">
      <Router>
          <Route path="/myprofile">
            <MyProfile user={user}/>
          </Route>
          <Route path="/otherprofile">
            <OtherProfile user={user}/>
          </Route>
        </Router>
    </div>
  );
}

export default App;

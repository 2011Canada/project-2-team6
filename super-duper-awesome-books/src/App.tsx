import React, { useState } from 'react';
import {BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import { MyProfile } from './component/MyProfile';
import { OtherProfile } from './component/OtherProfile';
import { ClubRegistration } from './component/ClubRegistration';
import { Club } from './component/Club';


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
          <Route path="/clubregistration">
            <ClubRegistration/>
          </Route>
          <Route path="/club">
            <Club clubId={1}/>
          </Route>
        </Router>
    </div>
  );
}

export default App;

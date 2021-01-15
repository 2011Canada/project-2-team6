import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchPage from './pages/SearchPage';
import BookDetailPage from './pages/BookDetailPage';
import HomePage from './pages/HomePage';
import { MyProfile } from './components/user-profile/MyProfile';
import { OtherProfile } from './components/user-profile/OtherProfile';
import ScrollUpButton from "react-scroll-up-button";
import { Register } from './pages/RegisterPage';
import SubjectSelectionBox from './pages/SubjectSelectionPage';
import Footer from './components/footer/Footer';
import DisplayNav from './components/navigation/NavigationBar'
import { User } from './components/Model/User';
import LoginForm from './pages/LoginPage';

const NoMatchRoute = () => <div>404 Page Not Found</div>;
export const UserContext = React.createContext<any>(undefined)

function App() {
  
  const [User, changeUser] = useState<User>()
  // const [user, changeUser] = useState({ userid: 1, username: "TheGreatestUsernameEver", firstName: "John", lastName: "Smith" })
  console.log(User)

  return (
    
    <div className="App">

      <div>

        <Router>
        <DisplayNav currentUser={User}/>

          <Switch>
            <Route  path="/test">
          <DisplayNav currentUser={User}/>
            </Route>
            <Route path="/myprofile">
              <MyProfile user={User} />
            </Route>
            <Route path="/otherprofile">
              <OtherProfile user={User} />
            </Route>

            <Route path="/home" exact component={HomePage} />
            <Route path="/login">
                <LoginForm currentUser={User} updateCurrentUser={changeUser} />
              </Route>

            <Route path='/register' exact component={Register} />
          
            <Route path="/search-page" exact component={SearchPage} />
            <Route path="/subject-search/:subjectType" exact component={SubjectSelectionBox} />
            <Route path="/book/:bookId" exact component={BookDetailPage} />

            <Route component={NoMatchRoute} />
          </Switch>
        </Router>
        <ScrollUpButton />
      </div>
      <Footer />
      
    </div>

  );

}

export default App;

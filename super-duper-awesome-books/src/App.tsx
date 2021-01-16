import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchPage from './pages/SearchPage';
import BookDetailPage from './pages/BookDetailPage';
import HomePage from './pages/HomePage';
import { useState } from 'react';
import { MyProfile } from './components/user-profile/MyProfile';
import { OtherProfile } from './components/user-profile/OtherProfile';
import ScrollUpButton from "react-scroll-up-button";
import { Register } from './pages/RegisterPage';
import SubjectSelectionBox from './pages/SubjectSelectionPage';
import Footer from './components/footer/Footer';
import { Club } from './components/club/ClubPage';
import { ClubRegistration } from './components/club/ClubRegistrationPage';
import AllClubsPage from './components/club/AllClubsPage';
import { User } from './components/Model/User';
import { Login } from './pages/LoginPage';

const NoMatchRoute = () => <div>404 Page Not Found</div>;

function App() {

  // const [user, changeUser] = useState({ userid: 1, username: "TheGreatestUsernameEver", firstName: "John", lastName: "Smith" })
  // const [user, changeUser] = useState<User>()

  return (

    <div className="App">

      <div>
        <Router>


          <Switch>

            <Route path="/login" exact component={Login} />
            
            <Route path='/register' exact component={Register} />

            <Route path="/home" exact component={HomePage} />
            <Route path='/club-registration' exact component={ClubRegistration} />
            <Route path="/search-page" exact component={SearchPage} />
            <Route path="/subject-search/:subjectType" exact component={SubjectSelectionBox} />
            <Route path="/book/:bookId" exact component={BookDetailPage} />
            <Route path="/search-clubs" exact component={AllClubsPage}/>
            <Route path="/search-clubs/:clubId" exact component={Club} />

            <Route path="/myprofile" exact component={MyProfile}/>
            {/* TODO: future friend function  */}
            {/* <Route path="/otherprofile">
              <OtherProfile user={user} />
            </Route> */}

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

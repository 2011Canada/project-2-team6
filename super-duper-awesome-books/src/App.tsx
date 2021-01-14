import './App.css';
import { BrowserRouter as Router, Route, Switch, useParams } from "react-router-dom";
import SearchPage from './pages/SearchPage';
import BookDetailPage from './pages/BookDetailPage';
import HomePage from './pages/HomePage';
import { useState } from 'react';
import { MyProfile } from './components/user-profile/MyProfile';
import { OtherProfile } from './components/user-profile/OtherProfile';
import ScrollUpButton from "react-scroll-up-button";
import { Register } from './pages/RegisterPage';
import SubjectSelectionBox from './pages/SubjectSelectionPage';
import LoginControlPage from './pages/LoginControlPage';
import wood from './pictures/wood.jpg'
import Footer from './components/footer/Footer';

const NoMatchRoute = () => <div>404 Page Not Found</div>;

function App() {

  const [user, changeUser] = useState({ userid: 1, username: "TheGreatestUsernameEver", firstName: "John", lastName: "Smith" })


  return (

    <div className="App">

      <div>
        <Router>


          <Switch>

            <Route path="/myprofile">
              <MyProfile user={user} />
            </Route>
            <Route path="/otherprofile">
              <OtherProfile user={user} />
            </Route>

            <Route path="/home" exact component={HomePage} />
            <Route path="/login" exact component={LoginControlPage} />

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

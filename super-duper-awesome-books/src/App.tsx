import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchPage from './pages/SearchPage';
import BookDetailPage from './pages/BookDetailPage';
import { useState } from 'react';
import { MyProfile } from './components/user-profile/MyProfile';
import { OtherProfile } from './components/user-profile/OtherProfile';

const NoMatchRoute = () => <div>404 Page Not Found</div>;

function App() {

  const [user, changeUser] = useState({ userid: 1, username: "TheGreatestUsernameEver", firstName: "John", lastName: "Smith" })

  return (
    <div className="App">
      <Router>
        <Switch>
          {/* add main page routing here */}
          {/* profile */}
          <Route path="/myprofile">
            <MyProfile user={user}/>
          </Route>
          <Route path="/otherprofile">
            <OtherProfile user={user} />
            {/* search */}
          </Route>
          <Route path="/search-page" exact component={SearchPage} />
          <Route path="/book/:bookId" exact component={BookDetailPage} />
          <Route component={NoMatchRoute} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

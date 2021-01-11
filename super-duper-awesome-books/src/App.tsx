import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { Register } from '../src/components/register/Register'
import { NavigationPreLogin } from '../src/components/navigation/NavigationPreLogin'
import { FooterPage } from '../src/components/footer/Footer'



function App() {
  return (
    <div className="App">
      <header className="App-header">
      <NavigationPreLogin/>

        <Router>
        <Switch>
        <Route path="/register" component={Register} ></Route>


        </Switch>
        </Router>
      
      
      <FooterPage/>
      </header>
    </div>
  );
}

export default App;

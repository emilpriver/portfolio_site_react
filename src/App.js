import React, { Component } from 'react';
import { BrowserRouter, Route , Switch} from 'react-router-dom';
//components
import Home from './components/home'
import Missions from './components/missions'
import About from './components/about'
import Single_project from './components/single_work'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}  />
          <Route exact path="/missions" component={Missions}  />
          <Route path="/about" component={About}  />
          <Route path="/works/:slug" component={Single_project}  />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

import React, {Component} from 'react';
import { Route , Switch,BrowserRouter} from 'react-router-dom';
//components
import Home from './components/home'
import Missions from './components/missions'
import About from './components/about'
import Single_project from './components/single_work'
import error from './components/error'
import Menu from './modules/menu'

//react transitions
import { Transition, TransitionGroup } from 'react-transition-group'
import ReactGA from 'react-ga'

ReactGA.initialize('UA-72822877-6');

class App extends Component {
  //variables
  render() {
    return(
      <BrowserRouter>
        <div className="app">
          <Menu white_background={true} />
          <Route render={({ location }) => {
            return (
                <TransitionGroup component={null}>
                  <Transition 
                  timeout={false}>
                    <Switch location={location}>
                      <Route exact path="/" component={Home}  />
                      <Route exact path="/missions" component={Missions}  />
                      <Route path="/about" component={About}  />
                      <Route path="/works/:slug" component={Single_project}  />
                      <Route component={error} />
                    </Switch>
                  </Transition>
                </TransitionGroup>
            ); 
          }}/>
        </div>
      </BrowserRouter>
    )
  }
}
export default App;


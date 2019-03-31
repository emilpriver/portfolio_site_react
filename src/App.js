import React from 'react';
import {withRouter, Route , Switch} from 'react-router-dom';
//components
import Home from './components/home'
import Missions from './components/missions'
import About from './components/about'
import Single_project from './components/single_work'
import error from './components/error'
//react transitions
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import ReactGA from 'react-ga'

ReactGA.initialize('UA-72822877-6');

const App = ({ location }) => {
  //variables
  const currentKey = location.pathname.split('/')[1] || '/'
  const timeout = { enter: 500, exit: 500 }
  return (
      <TransitionGroup component="main" className="page-main">
        <CSSTransition key={currentKey} unmountOnExit timeout={timeout} classNames="transition" appear>
          <Switch location={location}>
            <Route exact path="/" component={Home}  />
            <Route exact path="/missions" component={Missions}  />
            <Route path="/about" component={About}  />
            <Route path="/works/:slug" component={Single_project}  />
            <Route component={error} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
  ); 
}

export default withRouter(App)

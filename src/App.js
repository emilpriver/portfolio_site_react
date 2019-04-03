import React, {Component} from 'react';
import { Route , Switch,BrowserRouter} from 'react-router-dom';
//components
import Home from './components/home'
import Footer from './modules/footer'
import Missions from './components/missions'
import About from './components/about'
import Single_project from './components/single_work'
import error from './components/error'
import Menu from './modules/menu'
import { TweenLite } from "gsap"
//react transitions
import { Transition, TransitionGroup } from 'react-transition-group'
import ReactGA from 'react-ga'

ReactGA.initialize('UA-72822877-6');

//GSAP
const play = node => {
  TweenLite.set(node, {
    x: "100%",
    opacity: 0,
    scale: .7
  });
  TweenLite.to(node, .5, {
    x: "0%",
    opacity: 1,
    scale: 1
  });
}
const exit = node => {
  TweenLite.set(node, {
    x: "0%",
    opacity: 1,
    scale: 1
  });
  TweenLite.to(node, .5, {
    x: "-100%",
    opacity: 0,
    scale: .7
  });
}       

class App extends Component {
  //variables
  render() {
    return(
      <BrowserRouter>
        <main role="document">
          <Menu white_background={true} />
          <Route render={({ location }) => {
            const { key } = location;
            return (
                <TransitionGroup component={null}>
                  <Transition 
                    key={key}
                    mountOnEnter={true}
                    unmountOnExi={true}
                    onEnter={play}
                    onExit={exit}
                    timeout={1500}
                  >
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
          <Footer />
        </main>
      </BrowserRouter>
    )
  }
}
export default App;


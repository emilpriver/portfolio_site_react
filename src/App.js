import React, {Component} from 'react';
import { Route , Switch,BrowserRouter} from 'react-router-dom';
//components
import Home from './components/home'
import Missions from './components/missions'
import About from './components/about'
import Single_project from './components/single_work'
import error from './components/error'
import article from './components/single_article'
import Menu from './modules/menu'
import Footer from './modules/footer'
import { play, exit } from './timelines'

//react transitions
import { Transition, TransitionGroup } from 'react-transition-group'
import ReactGA from 'react-ga'

ReactGA.initialize('UA-72822877-6');

class App extends Component {
  //variables
  render() {
    return(
      <BrowserRouter>
        <main role="document">
          <Menu white_background={true} />
          <Route render={({ location }) => {
            const { pathname, key } = location;
            return (
                <TransitionGroup component={null}>
                  <Transition 
                    key={key}
                    appear={true}
                    onEnter={(node, appears) => play(pathname, node, appears)}
                    onExit={(node, appears) => exit(node, appears)}
                    timeout={{enter: 750, exit: 150}}
                  >
                    <Switch location={location}>
                      <Route exact path="/" component={Home}  />
                      <Route exact path="/missions" component={Missions}  />
                      <Route exact path="/about" component={About}  />
                      <Route path="/works/:slug" component={Single_project}  />
                      <Route path="/article/:slug" component={article}  />
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


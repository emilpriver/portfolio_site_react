import React, { Component } from 'react'
import $ from 'jquery';
import ReactGA from 'react-ga'
//modules
import Singleproject from '../modules/single_project'

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
          works: [],
          works_loaded: false,
        }    
    }
    componentDidMount() {   
         //scroll to top
         window.scrollTo(0, 0) 
        //fetch data
        fetch('https://api.emilpriver.com/wp-json/wp/v2/works/')
        .then(async (response) => {return await response.json()})
        .then(works => {
            this.setState({
                works: works,
                works_loaded: true
            })
        })
        .catch(err => {})
   
        //google analytics
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    componentDidUpdate(){
        //add listener to scroll
        window.addEventListener('scroll', this.onScroll);
    }
    
  onScroll = (event) => {
    var current = $('.project').first();
    $.noConflict();
    $(document).scroll(function () {
      if (current.length) {
          var y = window.scrollY - current.position().top
          if (!$(current).is('.project:last')) {
              if (y > -900) {
                  $(current).addClass('come-in')
                  current = current.next('.project');
              }
          } else {
              if (y > -900) {
                  $(current).addClass('come-in')
              }
          }
      }
    })
}
    

  render() {
    return (
        <div>
            <section id="works" className="works_page">
                <div className="con content">
                    <h2> Portfolio </h2>
                    <div className="projects content--inner">
                        {this.state.works_loaded ? 
                        //map the works
                        this.state.works.map((element,index) => <Singleproject key={index} element={element} />)
                        : <div className="spinner"><div></div></div>}
                    </div>
                </div>
            </section>
        </div>
    );
  }
}



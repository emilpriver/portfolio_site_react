import React, { Component } from 'react'
import $ from 'jquery';
import ReactGA from 'react-ga'
//modules
import Nav from '../modules/menu'
import Footer from '../modules/footer'
import Hero from '../modules/hero'
import Singleproduct from '../modules/single_product'

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
          works: [],
          works_loaded: false,
        }    
    }
    componentDidMount() {    
        //fetch data
        fetch('https://cdn.emilpriver.com/wp-json/wp/v2/works/?per_page=4')
        .then(async (response) => {return await response.json()})
        .then(works => {
            setTimeout(() => {
                this.setState({
                    works: works,
                    works_loaded: true
                })
            },500)
        })
        .catch(err => {})
   
        //google analytics
        ReactGA.initialize('UA-72822877-6');
        ReactGA.pageview(window.location.pathname + window.location.search);
        //add listener to scroll
        window.addEventListener('scroll', this.onScroll);
    }
    componentWillUnmount() {
    //remove listener to scroll
    window.removeEventListener('scroll', this.onScroll);
    }
    
  onScroll = (event) => {
    var current = $('.project').first();
    $.noConflict();
    $(document).scroll(function () {
      if (current.length) {
          var y = window.scrollY - current.position().top
          if (!$(current).is('.project:last')) {
              if (y > -500) {
                  $(current).addClass('come-in')
                  current = current.next('.project');
              }
          } else {
              if (y > -500) {
                  $(current).addClass('come-in')
              }
          }
      }
    })
}
    

  render() {
    return (
        <div>
            <Nav />
            <Hero />
            <section id="works">
                <div className="con">
                    <h1>My projects</h1>
                    <h2>Made with passion</h2>
                    <div className="projects">
                        {this.state.works_loaded ? 
                            this.state.works.map((data,key) => <Singleproduct key={key} element={data} /> )
                        : <div className="spinner"><div></div></div>  }
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
  }
}



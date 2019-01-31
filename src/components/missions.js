import React, { Component } from 'react'
import $ from 'jquery';
import ReactGA from 'react-ga'
import { Link } from 'react-router-dom'
//modules
import Nav from '../modules/menu'
import Footer from '../modules/footer'

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
        fetch('https://cdn.emilpriver.com/wp-json/wp/v2/works/')
        .then(async (response) => {return await response.json()})
        .then(works => {
            this.setState({
                works: works,
                works_loaded: true
            })
        })
        .catch(err => {})
   
        //google analytics
        ReactGA.initialize('UA-72822877-6');
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
            <section id="works_page">
                <div className="con">
                    <div className="title">
                        <h1>All works.</h1>
                        <h2>Made with passion.</h2>
                    </div>
                    {this.state.works_loaded ? 
                    //map the works
                    this.state.works.map((element,index) => 
                        <div key={index} className="project">
                            <Link to={'/works/' + element.slug}><div className="project_thumbnail" style={{backgroundImage: `url(${element.thumb_full_url})`}}></div></Link>
                            <Link to={'/works/' + element.slug}>
                                <div className="project_info">
                                    <div className="wrapper">
                                        <h3>{element.title.rendered}</h3>
                                        <span>{element.project_info}</span>
                                    </div>
                                </div> 
                            </Link>
                        </div>
                    )
                    : <div className="spinner"><div></div></div>}
                </div>
            </section>
            <Footer />
        </div>
    );
  }
}


import React from 'react'
import { Link } from 'react-router-dom'
import ReactGA from 'react-ga';
import axios from 'axios'
import moment from 'moment'
import jsonAdapter from 'axios-jsonp'
//modules
import Menu from '../modules/menu'
import Footer from '../modules/footer'


export default class About extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            works_loaded: false,
            works: '',
            clients:'',
            clients_loaded: false,
            instagram: '',
            instagram_loaded: false,
            repos: '',
            repos_loaded: false
        }
    }

    async componentDidMount(){
        //scroll to top
        window.scrollTo(0, 0)
        //Google analytics
        ReactGA.initialize('UA-72822877-6');
        ReactGA.pageview(window.location.pathname + window.location.search);

        //fetch instagram
        await axios({
            method: 'get',
            url: process.env.REACT_APP_instagram_url,
            adapter: jsonAdapter
        })
        .then(response => {
            this.setState({
                instagram_loaded: true,
                instagram: response.data.data,
            })              
        })
        .catch(err => console.log(err))        
        //fetch works
        fetch('https://cdn.emilpriver.com/wp-json/wp/v2/works?per_page=3')
        .then(response =>  response.json())
        .then(works => {
            this.setState({
                works: works,
                works_loaded: true
            })
        })
        .catch(err => {})
        //fetch clients
        fetch('https://cdn.emilpriver.com/wp-json/wp/v2/clients')
        .then(response =>  response.json())
        .then(works => {
            this.setState({
                clients: works,
                clients_loaded: true
            })
        })
        .catch(err => {})
        //fetch github public repos
        fetch('https://api.github.com/users/emilpriver/repos?sort=updated')
        .then(async response => { return await response.json()})
        .then(async response => {
            if(await response.length){
                this.setState({
                    repos: await response,
                    repos_loaded: true
                })
            }
        })
        .catch(err => console.log(err))
    }

     render(){
          return(
            <div>
               <Menu white_background={true} />
                    <section id="about">

                         <div id="section_hero">
                              <div className="wrapper">
                                   <h1>Technic student and developer based in Borås, Sweden</h1>                                   
                                   <div className="span_wrapper">
                                        <i className="fas fa-long-arrow-alt-down"></i>
                                   </div>
                              </div>
                         </div>

                         <div id="content">                              
                            {this.state.works_loaded && this.state.clients_loaded && this.state.instagram_loaded ?
                                <div className="con"> 

                                   <div className="project_placeholder">
                                        {this.state.works.map((element,index) => 
                                            <Link key={index} to={'/works/' + element.slug}>
                                                <div className="column" style={{backgroundImage: `url(${element.thumb_full_url})`}} />
                                            </Link>
                                        )}
                                   
                                   </div>

                                   <div className="experience_col">
                                        <h1>Experience.</h1>
                                        <div className="time">
                                            <span>2018 - Now</span>
                                            <p><strong>Heroic</strong> - Stockholm</p>
                                        </div>
                                        <div className="time">
                                            <span>2018 - January 2019</span>
                                            <p><strong>Rafflestore</strong> - Stockholm</p>
                                        </div>
                                        <div className="time">
                                            <span>2018 - December 2018</span>
                                            <p><strong>Team Property</strong> - Stockholm</p>
                                        </div>                                       
                                   </div>

                                   <div className="instagram">
                                   <h1>Instagram.</h1>
                                        {this.state.instagram.map((element,index) => 
                                                <div key={index} className="element">
                                                    <a  href={element.link} rel="noopener noreferrer" target="_blank">
                                                        <div className="instagram_thumb" style={{backgroundImage: `url(${element.images.standard_resolution.url})`}} />
                                                    </a>                                   
                                                </div>
                                            )
                                        }                                
                                    </div>

                                    <div className="partners">
                                        <h1>Partners.</h1>
                                        <div className="wrapper">
                                            {this.state.clients.map((element,index) => 
                                                    <div key={index} className="column">
                                                        <img src={element.thumb_full_url} alt={element.slug} />
                                                    </div>
                                                )
                                            }                                        
                                        </div>
                                    </div> 

                                    <div className="github">
                                        <h1>Github</h1>
                                        <div className="wrapper">
                                            <div className="col">
                                                <h3>Title</h3>
                                                <span className="description">Description</span>
                                                <span>Language</span>
                                                <span>Created At</span>
                                            </div>
                                            {   
                                                this.state.repos.length ? 
                                                this.state.repos.map((element,key) => {
                                                return(
                                                        <div key={key} className="col">
                                                            <h3><a href={element.html_url} rel="noopener noreferrer" target="_blank">{element.name}</a></h3>
                                                            <span className="description"><a href={element.html_url} rel="noopener noreferrer" target="_blank">{element.description} </a></span>
                                                            <span>{element.language}</span>
                                                            <span>{moment(element.created_at).format('LL')}</span>
                                                        </div>
                                                    )
                                                })
                                                : ''
                                            }
                                        </div>
                                    </div>

                                </div>
                            : <div className="spinner"><div></div></div> }    
                                             
                         </div>
                    </section>
               <Footer />
          </div>
            
        )
    }
}



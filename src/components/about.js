import React from 'react'
import { Link } from 'react-router-dom'
import { setup } from 'axios-cache-adapter'
import ReactGA from 'react-ga';
import localforage from 'localforage'
import memoryDriver from 'localforage-memoryStorageDriver'

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
            instagram_loaded: false

        }
    }

    async componentDidMount(){
        //Google analytics
        ReactGA.initialize('UA-72822877-6');
        ReactGA.pageview(window.location.pathname + window.location.search);

        //fetcj instagram
        const store = localforage.createInstance({

            driver: [
                    localforage.INDEXEDDB,
                    localforage.LOCALSTORAGE,
                    memoryDriver
            ],
            // Prefix all storage keys to prevent conflicts
            name: 'instagram_cache'
        })
        const api = setup({
                cache: {
                    maxAge: 15 * 60 * 1000,
                    store
                }
        })
        //fetch instagram
        await api({
                url: process.env.REACT_APP_instagram_url,
                method: 'get'
        })
        .then(response => {
            this.setState({
                instagram_loaded: true,
                instagram: response.data.data
            })              
        })
        .catch(err => console.log(err))        

        fetch('https://cdn.emilpriver.com/wp-json/wp/v2/works?per_page=3')
        .then(response =>  response.json())
        .then(works => {
            this.setState({
                works: works,
                works_loaded: true
            })
        })
        .catch(err => {})


        fetch('https://cdn.emilpriver.com/wp-json/wp/v2/clients')
        .then(response =>  response.json())
        .then(works => {
            this.setState({
                clients: works,
                clients_loaded: true
            })
        })
        .catch(err => {})
    }

     render(){
          return(
            <div>
               <Menu />
                    <section id="about">
                         <div id="section_hero">
                              <div className="wrapper">
                                   <h1>Emil Privér</h1>                                   
                                   <div className="span_wrapper">
                                        <span>Front End developer based in Borås, Sweden.</span>
                                        <span>I code stuff I belive people like.</span>
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
                                             )}                                  
                                   
                                   </div>

                                   <div className="partners">
                                        <h1>Partners.</h1>

                                        <div className="wrapper">
                                             {this.state.clients.map((element,index) => 
                                                  <div key={index} className="column">
                                                       <img src={element.thumb_full_url} alt={element.slug} />
                                                  </div>
                                             )}                                        
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



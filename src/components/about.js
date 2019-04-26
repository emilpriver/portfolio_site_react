import React from 'react'
import { NavLink } from 'react-router-dom'
import ReactGA from 'react-ga';
import axios from 'axios'
import moment from 'moment'
import jsonAdapter from 'axios-jsonp'



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
        ReactGA.pageview(window.location.pathname + window.location.search);

        //fetch instagram
        await axios({
            method: 'get',
            url: 'https://api.instagram.com/v1/users/514085920/media/recent/?access_token=514085920.87e6616.a536c234a15b488392cb280e966d43b2&count=6',
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
        fetch('https://api.emilpriver.com/wp-json/wp/v2/works?per_page=3')
        .then(response =>  response.json())
        .then(works => {
            this.setState({
                works: works,
                works_loaded: true
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
                <section id="about">

                        <div id="section_hero">
                            <div className="wrapper">

                                <h1><strong>Technic</strong> student and <strong>developer</strong> based in <strong>Borås, Sweden.</strong></h1>  

                                <p>
                                    I'm an <strong>developer</strong> based in <strong>Borås, Sweden.</strong> I studied a Systemdeveloper degree in <strong>Varberg, Sweden</strong> and are now studying to become an <strong>IT technician</strong> in <strong>Borås, Sweden.</strong> I have been working at startups and fully established companys. I love creating innovative websites and how we can use website to create business. 
                                </p>

                                <p>
                                    Since I was a little <strong>boy</strong>, I've been fascinated by how we use technology and interact with things that happen on screen. I got my first <strong>computer</strong> when i was very young, It was an old computer with windows 1998 OS installed. Even if the performance was poor and the startup took up to 10 minutes, did I love to use the computer. I played games, explored stuff on the computer, even had some talk with <strong>Office Assistant.</strong> I still have this interest today. I work daily with a <strong>computer</strong> in different ways, set up systems for website or apps, build and modify components in my computer. I also read a lot of articles about how companies develop the technology and the future.
                                </p>

                                <p>
                                    I love programming and how programming develops ours <strong>society</strong> and what we can do with programming to create awesome stuff. How we can use programming in school to create system that evolve the students knowledge of different stuff. I daily read alot of information how companys work to develop the society into a better place and I love it.
                                </p>  

                            </div>
                        </div>

                        <div id="content" className="content">
                            <div className="content--inner">                              
                                {this.state.works_loaded ?
                                    <div className="con"> 

                                        <div className="project_placeholder">
                                            {this.state.works.map((element,index) => 
                                                <NavLink key={index} to={'/works/' + element.slug}>
                                                    <div className="column" style={{backgroundImage: `url(${element.thumb_full_url})`}} />
                                                </NavLink>
                                            )}
                                        
                                        </div>

                                        <div className="experience_col">
                                            <h1>Experience.</h1>
                                            <div className="time">
                                                <span>2019 - Now</span>
                                                <p><strong>Rivercode</strong> - Borås</p>
                                            </div>
                                            <div className="time">
                                                <span>2018 - 2019</span>
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
                                            {   
                                                this.state.instagram_loaded ?
                                                this.state.instagram.map((element,index) => 
                                                    <div key={index} className="element">
                                                        <a  href={element.link} rel="noopener noreferrer" target="_blank">
                                                            <div className="instagram_thumb" style={{backgroundImage: `url(${element.images.standard_resolution.url})`}} />
                                                        </a>                                   
                                                    </div>
                                                )
                                                : 'Instagram images loading'
                                            }                                
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
                                            
                        </div>
                </section>
          </div>
            
        )
    }
}



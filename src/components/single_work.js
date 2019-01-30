import React from 'react'
import Menu from '../modules/menu'
import Footer from '../modules/footer'
//import jquery
import ReactGA from 'react-ga'


export default class single_work extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            project: '',
            project_loaded: false
        }
    }
  async componentDidMount(){
    ReactGA.initialize('UA-72822877-6');
    ReactGA.pageview(window.location.pathname + window.location.search);
    const { slug } = this.props.match.params
    await fetch('https://cdn.emilpriver.com/wp-json/wp/v2/works?slug=' + slug )
    .then(async response => await response.json() )
    .then(response => {        
        this.setState({
            project: response[0],
            project_loaded: true
        })
    })
    .catch(err =>  console.log(err))
  }



    render(){
        let work = this.state.project
        return(            
            <div>
            <Menu />
            <section id="single_work">
                {this.state.project_loaded ? 
                    <div className="con">
                        <div id="work_hero" style={{backgroundImage: `url(${work.thumb_full_url})`}}  ></div>
                        <div id="content">
                            <div className="con">
                                <div className="project_info">
                                    <span>{work.project_info}</span>
                                    <h1>{work.title.rendered}</h1>
                                    <div className="product_description" dangerouslySetInnerHTML={{__html : work.content.rendered}}></div>
                                </div>       
                                {(work.blocks && work.blocks.length > 0) ?
                                <div className="project_blocks">
                                    {work.blocks.map((element,index) => 
                                        <div className="block" key={index} >
                                            <div className="block_image"><img src={element.blocksimage} alt={work.title.rendered} /></div>
                                            <div className="block_info"><div className="wrapper" dangerouslySetInnerHTML={{__html : element.blockstext}}></div></div>
                                        </div>
                                    )}
                                
                                </div>
                                : ''}                                
                            </div>                
                        </div>    
                    </div>
            
             :  <div className="spinner"><div></div></div> }
            </section>
            <Footer />
            </div>
            
        )
    }
}



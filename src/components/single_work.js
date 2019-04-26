import React from 'react'
//import jquery
import ReactGA from 'react-ga'


export default class single_work extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            project: '',
            project_loaded: false,
        }
    }

    async componentDidMount() {
        //scroll to top
        window.scrollTo(0, 0)
        //setup  Analytics
        ReactGA.pageview(window.location.pathname + window.location.search);
        //fetch data
        const { slug } = this.props.match.params
        await fetch('https://api.emilpriver.com/wp-json/wp/v2/works?slug=' + slug)
            .then(async response => await response.json())
            .then(response => {
                if(response.length){
                    this.setState({
                        project: response[0],
                        project_loaded: true
                    })
                }else{
                    return window.location = '/404'
                }
            })
            .catch(err => {return window.location = '/404'})
            
    }
    render(){
        let work = this.state.project
        return(            
            <div>
                <div className="con content">
                    <div className="content--inner">
                        <section id="single_work">
                            {this.state.project_loaded ? 
                                <div className="con">
                                    <div id="work_hero">
                                        <div className="con">
                                            <h1>{work.title.rendered}</h1>
                                            <div className="small_content" dangerouslySetInnerHTML={{__html: work.content.rendered}}></div>
                                            <div className="links">
                                                <a rel="noopener noreferrer" target="_blank" href={work.website_url}><i className="fas fa-link"></i> {work.website_url}</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="content">
                                        <div className="con">    
                                            
                                            {(work.blocks && work.blocks.length > 0) ?
                                            <div className="project_blocks">
                                                {work.blocks.map((element,index) => 
                                                    <div className="block" key={index} >
                                                        <div className="fade_in_block block_image"><img src={element.blocksimage} alt={work.title.rendered} /></div>
                                                        <div className="fade_in_block block_info"><div className="wrapper"><span dangerouslySetInnerHTML={{__html : element.blockstext}}></span></div></div>
                                                    </div>
                                                )}
                                            
                                            </div>
                                            : ''}                                
                                        </div>                
                                    </div>   
                                </div>             
                        :  <div className="spinner"><div></div></div> }
                    </section>
                </div>
            </div>
        </div>
            
        )
    }
}



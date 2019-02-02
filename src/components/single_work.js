import React from 'react'
import Menu from '../modules/menu'
import Footer from '../modules/footer'
import $ from 'jquery'
//import jquery
import ReactGA from 'react-ga'


export default class single_work extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            project: '',
            project_loaded: false
        }
    }

    async componentDidMount() {
        //scroll to top
        window.scrollTo(0, 0)
        //setup  Analytics
        ReactGA.initialize('UA-72822877-6');
        ReactGA.pageview(window.location.pathname + window.location.search);
        //fetch data
        const { slug } = this.props.match.params
        await fetch('https://cdn.emilpriver.com/wp-json/wp/v2/works?slug=' + slug)
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
        //listen to scroll
        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        //remove listener to scroll
        window.removeEventListener('scroll', this.onScroll);
    }

    onScroll = (event) => {
        var current = $('.block').first();
        $.noConflict();
        $(document).scroll(function () {
            if (current.length) {
                var y = window.scrollY - current.position().top
                if (!$(current).is('.block:last')) {
                    if (y > -500) {
                        $(current).addClass('come-in')
                        current = current.next('.block');
                    }
                } else {
                    if (y > -500) {
                        $(current).addClass('come-in')
                    }
                }
            }
        })
    }
    
    render(){
        let work = this.state.project
        return(            
            <div>
            <Menu />
            <section id="single_work">
                {this.state.project_loaded ? 
                    <div className="con">
                        <div id="work_hero" style={{backgroundImage: `url(${work.thumb_full_url})`}}  >
                            <h1>{work.title.rendered}</h1>
                        </div>
                        <div id="content">
                            <div className="con">
                                <div className="project_info">
                                    <h2>{work.project_info}</h2>
                                    <div className="product_description" dangerouslySetInnerHTML={{__html : work.content.rendered}}></div>
                                    <a rel="noopener noreferrer" target="_blank" href={work.website_url}>Visit Site</a>
                                </div>       
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
            <Footer />
            </div>
            
        )
    }
}



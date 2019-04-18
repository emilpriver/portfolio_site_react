//import react
import React from 'react'
import ReactGA from 'react-ga'

export default class article extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            article: null,
            article_loaded: false,
            article_thumb: ''
        }
    }

    async componentDidMount() {
        //scroll to top
        window.scrollTo(0, 0)
        //setup  Analytics
        ReactGA.pageview(window.location.pathname + window.location.search);
        const { slug } = this.props.match.params
        await fetch('https://cdn.emilpriver.com/wp-json/wp/v2/posts/?slug=' + slug)
            .then(async response => await response.json())
            .then(response => {
                if(response.length){
                    this.setState({
                        article: response[0],
                        article_loaded: true,
                    })

                    if(response[0].thumb_full_url){
                        this.setState({
                            article_thumb: response[0].thumb_full_url 
                        })
                    }
                }else{
                    return window.location = '/404'
                }
            })
            .catch(err => {return window.location = '/404'})

    }

    render() {
        let article = this.state.article
        return (
            <div>
                <div className="con content">
                    <div className="content--inner">
                        <section id="single_article">
                            {this.state.article_loaded ? 
                                <article>
                                    <div className="article-hero" style={{backgroundImage:'url('+this.state.article_thumb+')'}}>
                                        <h1>{article.title.rendered}</h1>
                                    </div>
                                    <div className="article-content">
                                        <div className="con" dangerouslySetInnerHTML={{__html: article.content.rendered}}></div>
                                    </div>
                                </article>
                            :  <div className="spinner"><div></div></div> }
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}
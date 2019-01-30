//import react
import React from 'react'
import { Link } from 'react-router-dom'

export default class work_loop_item extends React.Component{

    render() {
        let element = this.props.element
        return (
                <div className="project">
                    <div className="project_image">
                        <Link to={element.link}>
                            <img src={element.thumb_full_url} alt={element.title.rendered}  />
                        </Link>
                    </div>

                    <div className="project_info">
                        <div className="inner">
                            <Link to={element.link}><span>{element.project_info}</span></Link>
                            <Link to={element.link}><h1>{element.title.rendered}</h1></Link>
                            <Link to={element.link}><span dangerouslySetInnerHTML={{ __html: element.content.rendered }}></span></Link>
                            <Link to={element.link} className="explore">Explore.</Link>
                        </div>
                    </div>
            </div>
        )
    }
}
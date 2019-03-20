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
                        <Link className="" to={element.link}><h1 >{element.title.rendered}</h1></Link>
                        <Link className="" to={element.link}><span >{element.project_info}</span></Link>
                    </div>
            </div>
        )
    }
}
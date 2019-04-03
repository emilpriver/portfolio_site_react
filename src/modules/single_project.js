//import react
import React from 'react'
import { NavLink } from 'react-router-dom'

export default class work_loop_item extends React.Component{

    render() {
        let element = this.props.element
        return (
                <div className="project">
                
                    <div className="project_image">
                        <NavLink to={element.link}>
                            <img src={element.thumb_full_url} alt={element.title.rendered}  />
                        </NavLink>
                    </div>

                    <div className="project_info">
                        <NavLink className="" to={element.link}><h2 >{element.title.rendered}</h2></NavLink>
                        <NavLink className="" to={element.link}><span >{element.project_info}</span></NavLink>
                    </div>
            </div>
        )
    }
}
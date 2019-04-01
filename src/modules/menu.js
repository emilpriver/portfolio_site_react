//import react
import React from 'react'
import { NavLink } from 'react-router-dom'

export default class Menu extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            header_menu_con: '',
            handle_menu_open_class: '',
            white_background: this.props.white_background ? this.props.white_background : false
        }
        this.handle_menu_open = this.handle_menu_open.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    onScroll = () => {
        if (window.scrollY > 50) {
            this.setState({
                header_menu_scrolled: true
            })
        } else {
            this.setState({
                header_menu_scrolled: false
            })
        }
    }
    handle_menu_open = () => {
        this.setState(prevState => ({
            handle_menu_open_class: !prevState.handle_menu_open_class
        }))
    }

    render() {
        return (
                <header className={(this.state.header_menu_scrolled ? 'scrolled' : '' ) + (this.state.white_background ? ' white_background' : '')}>
                    <div className="con">
                        <div className="headerlogo">
                            <NavLink to="/" exact>
                                {
                                    this.state.white_background ? 
                                        this.state.header_menu_scrolled ?
                                            <img className="header_img" src="/images/vitlogotyp.png" alt="Emil Privér logotyp" />
                                        : 
                                            <img className="header_img" src="/images/logo.png" alt="Emil Privér logotyp" />
                                    :
                                        <img className="header_img" src="/images/vitlogotyp.png" alt="Emil Privér logotyp" />
                                }
                            </NavLink>
                        </div>
                        <div className="menu_con">
                            <div className="wrapper" onClick={this.handle_menu_open}>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <div className={'menu ' + (this.state.handle_menu_open_class ? 'open': '')}>
                            <ul>
                                <li>
                                    <NavLink to="/" exact>Home.</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/missions" exact>Missions.</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/about" exact>About.</NavLink>
                                </li>
                            </ul>
                            <a rel="noopener noreferrer" href="https://twitter.com/emil_priver" target="_blank">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a rel="noopener noreferrer" href="https://facebook.com/emilpriver" target="_blank">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a rel="noopener noreferrer" href="https://www.instagram.com/emil_priver" target="_blank">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a rel="noopener noreferrer" href="https://github.com/emilpriver" target="_blank">
                                <i className="fab fa-github"></i>
                            </a>
                            <a  rel="noopener noreferrer" href="https://www.linkedin.com/in/emilpriver/" target="_blank">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>
                </header>
        )
    }
}

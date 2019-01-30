//import react
import React from 'react'
import { Link } from 'react-router-dom'

export default class Menu extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            header_menu_con: '',
            handle_menu_open_class: ''
        }
        this.handle_menu_open = this.handle_menu_open.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    onScroll = (event) => {
        if (window.scrollY > 50) {
            this.setState({
                header_menu_con: 'scrolled'
            })
        } else {
            this.setState({
                header_menu_con: ''
            })
        }
    }
    handle_menu_open = (event) => {
        this.setState(prevState => ({
            handle_menu_open_class: !prevState.handle_menu_open_class
        }))
    }

    render() {
        return (
                <header className={this.state.header_menu_con + ' faster animated fadeInDown'}>
                    <div className="con">
                        <div className="headerlogo">
                            <a href="/"> 
                                <img className="header_img" src="/images/vitlogotyp.png" alt="Emil Privér logotyp" />
                            </a>
                        </div>
                        <div className="menu_con">
                            <div className="wrapper" onClick={this.handle_menu_open}>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <div className={'menu ' + (this.state.handle_menu_open_class ? 'open': '')}>
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
                                <ul>
                                    <li>
                                        <Link to="/">Home.</Link>
                                    </li>
                                    <li>
                                        <Link to="/works">Works.</Link>
                                    </li>
                                    <li>
                                        <Link to="/about">About.</Link>
                                    </li>
                                </ul>
                        </div>
                    </div>
                </header>
        )
    }
}

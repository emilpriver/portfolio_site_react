//import react
import React from 'react'

export default class Footer extends React.Component{

    render() {
        return (
            <footer>
                <div className="inner">
                    <div className="col contact">
                    <h1>Contact me</h1>
                        <a rel="noopener noreferrer" href="mailto:hello@emilpriver.com">hello@emilpriver.com</a>
                    </div>
                    <div className="col socials">
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

                        <a rel="noopener noreferrer" href="https://www.linkedin.com/in/emilpriver/" target="_blank">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </footer>
        )
    }
}

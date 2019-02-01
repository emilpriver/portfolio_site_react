import React from 'react'

//modules
import Menu from '../modules/menu'
import Footer from '../modules/footer'


export default class About extends React.Component{

     render(){
          return(
            <div>
               <Menu />
                    <section id="error">
                        <div className="con">
                            <div className="col">
                                <img src="/images/jackjack.png" alt="jack jack" />
                            </div>

                            <div className="col">                                
                                <div className="wrapper">
                                    <h1>AWWW...DON’T CRY.</h1>
                                    <span>It's just a 404 Error! </span>
                                    <span>What you’re looking for may have been misplaced in Long Term Memory.</span>
                                </div>
                            </div>
                        </div>
                    </section>
               <Footer />
          </div>
            
        )
    }
}



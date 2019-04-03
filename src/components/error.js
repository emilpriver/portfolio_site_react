import React from 'react'

export default class About extends React.Component{

    componentDidMount(){
        //jump to top
        window.scrollTo(0, 0)
    }

     render(){
          return(
            <div>
                <div className="content">
                    <div className="content--inner">
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
                        </div>
                    </div>
          </div>
            
        )
    }
}



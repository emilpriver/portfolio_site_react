import React from 'react'

//modules
import Menu from '../modules/menu'
import Footer from '../modules/footer'


export default class Pos extends React.Component{

     render(){
          return(
            <div>
               <Menu />
                    <section id="single-post">
                        <div className="post_thumbnail">
                            <h1></h1>
                        </div>
                        <div className="con">
                            
                        </div>
                    </section>
               <Footer />
          </div>
            
        )
    }
}



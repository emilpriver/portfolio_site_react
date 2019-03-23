//hero image
import React from 'react'
import Typing from 'react-typing-animation';
export default class Menu extends React.Component{
    render(){
        return(
            <div className="hero">
                <div className="con">
                    <div className="wrapper faster">
                        <div className="text"> 
                            <h1>
                                <Typing> 
                                    <Typing.Backspace count={10}/>
                                    <span>Hello, My name is Emil, <br /></span>
                                    <Typing.Delay ms={2500}/>
                                    <span>I am a devloper<Typing.Backspace delay={500} count={6}/>veloper based in Borås,Sweden.</span>
                                    <Typing.Backspace delay={1500} count={37}/>
                                    <span> create modern websites.</span>
                                    <Typing.Backspace delay={1500} count={27}/>
                                    <span> Contact me at hello@emilpriver.com </span>
                                </Typing>
                            </h1>
                        </div>   
                    </div>
                </div>
            </div>
        )
    }
}

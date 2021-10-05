import React, { Component} from "react"
import { render } from "react-dom"

export default class App extends Component{
    render(){
        return(
            <div>
                <h1>Hello, this is from React</h1>
            </div>
        )
    }
}
const divApp = document.getElementById("app") 


render(<App/>, divApp)


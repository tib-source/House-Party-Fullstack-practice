import React, { Component } from "react"
import { render } from "react-dom"
import HomePage from "./HomePage"




export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>Hello, this is from React</h1>
                <HomePage />
            </div>
        )
    }
}

const divApp = document.getElementById("app")

render(<App />, divApp)


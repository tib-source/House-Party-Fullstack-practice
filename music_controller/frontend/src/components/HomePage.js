import React, { Component } from "react";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom"

export default class HomePage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/"> <p> This is the Home Page</p></Route>
                    <Route path="/join"> <p> This is the Join Page</p></Route>
                    <Route path="/create"> <p> This is the Create Page</p></Route>
                    {/* <Route path="/join" component={RoomJoinPage} />
                    <Route path="/create" component={CreateRoomPage} /> */}
                </Switch>
            </Router>
        )
    }
}
import React, { Component } from "react";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import { Grid, Typography, Button, ButtonGroup } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Room from "./Room";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: null,
    };
  }

  clearCode = () => {
    this.setState({
      roomCode: null,
    });
  };

  componentDidMount() {
    fetch("/api/user-in-room/")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return this.setState({
          roomCode: null,
        });
      })
      .then((data) =>
        this.setState({
          roomCode: data["code"],
        })
      );
  }

  renderHomePage() {
    return (
      <Grid container spacing={3} align="center">
        <Grid item xs={12}>
          <Typography component="h3" variant="h3">
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              Join a Room
            </Button>
            <Button color="secondary" to="/create" component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              this.state.roomCode ? (
                <Redirect to={`/room/${this.state.roomCode}`} />
              ) : (
                this.renderHomePage()
              )
            }
          />
          <Route path="/join" component={RoomJoinPage} />
          <Route path="/create" component={CreateRoomPage} />
          <Route
            path="/room/:roomCode"
            render={(props) => {
              return <Room {...props} leaveRoom={this.clearCode} />;
            }}
          />
        </Switch>
      </Router>
    );
  }
}

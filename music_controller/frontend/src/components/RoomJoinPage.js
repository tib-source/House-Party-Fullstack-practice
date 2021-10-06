import React, { Component } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class RoomJoinPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomCode: "",
      error: "",
    };

    this.verifyCode = this.verifyCode.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  verifyCode() {
    fetch("/api/get-room/?code=" + this.state.roomCode)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          this.setState({
            error: "Invalid Room Code",
          });
        }
      })
      .then((data) => {
        return this.props.history.push("/room/" + data.code);
      });
  }

  handleInput(e) {
    this.setState({
      roomCode: e.target.value,
    });
  }

  render() {
    return (
      <Grid container align="center" spacing={1}>
        <Grid item xs={12}>
          <Typography component="h4" variant="h4">
            Join a Room
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={this.state.error.length > 0}
            label="Code"
            placeholder="Enter a Room Code"
            onChange={this.handleInput}
            value={this.state.roomCode}
            helperText={this.state.error}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={this.verifyCode} color="primary">
            Enter Room
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" to="/" component={Link} color="primary">
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }
}
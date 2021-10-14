import React, { Component } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { Redirect, Link } from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
export class Room extends Component {
  constructor(props) {
    super(props);

    this.state = {
      votesToSkip: 2,
      guestCanPause: false, 
      isHost: false,
      redirect: false,
      showSetting: false,
    };

    this.roomCode = this.props.match.params.roomCode;
    this.getRoomDetails()
  }

  getRoomDetails =() => {
    fetch("/api/get-room/" + "?code=" + this.roomCode)
      .then((response) => {
        if (!response.ok) {
          this.props.history.push("/");
        }
        return response.json();
      })
      .then((data) => {
        return this.setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      });
  }

  updateShowSetting = (bool) => {
    this.setState({
      showSetting: bool,
    });
  };

  renderSettingButton = () => {
    return (
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.updateShowSetting(true)}
        >
          Setting
        </Button>
      </Grid>
    );
  };

  executeLeaveOrder = () => {
    this.props.leaveRoom();
    fetch("/api/leave/", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      this.props.history.push("/");
    });
  };

  renderSetting = () => {
    return (
      <Grid container align="center" spacing={1}>
        <Grid item xs={12}>
          <CreateRoomPage
            update={true}
            votesToSkip={this.state.votesToSkip}
            guestCanPause={this.state.guestCanPause}
            roomCode={this.roomCode}
            updateCallBack={this.getRoomDetails}
            updateState={this.setState}
            childHistory = {this.props.history}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.updateShowSetting(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  };

  render() {
    if (this.state.showSetting) {
      return this.renderSetting();
    }
    return (
      <Grid container align="center" spacing={1}>
        {this.state.redirect && <Redirect push to="/"></Redirect>}
        <Grid item xs={12}>
          <Typography variant="h4" component="h4">
            Code : {this.roomCode}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="h6">
            Votes : {this.state.votesToSkip}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="h6">
            guestCanPause : {this.state.guestCanPause.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="h6">
            isHost : {this.state.isHost.toString()}
          </Typography>
        </Grid>
        {this.state.isHost && this.renderSettingButton()}
        <Grid item xs={12}>
          <Button
            color="secondary"
            variant="contained"
            onClick={this.executeLeaveOrder}
          >
            Leave Room
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default Room;
// <div>
//   <h2>{this.roomCode}</h2>
//   <p>votesToSkip: {this.state.votesToSkip}</p>
//   <p>guestCanPause: {this.state.guestCanPause.toString()}</p>
//   <p>isHost: {this.state.isHost.toString()}</p>
// </div>
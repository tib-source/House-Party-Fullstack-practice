import React, { Component } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Collapse,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";

export default class CreateRoomPage extends Component {
  static defaultProps = {
    votesToSkip: 2,
    guestCanPause: true,
    update: false,
    roomCode: null,
    updateCallBack: () => {},
  };
  constructor(props) {
    super(props);

    this.state = {
      guestCanPause: false,
      votesToSkip: 2,
      errorMsg: "",
      successMsg: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVotesChange = this.handleVotesChange.bind(this);
    this.handleGuestChange = this.handleGuestChange.bind(this);
  }

  handleVotesChange(e) {
    this.setState({
      votesToSkip: e.target.value,
    });
  }

  handleGuestChange(e) {
    this.setState({
      guestCanPause: e.target.value === "true" ? true : false,
    });
  }

  handleSubmit() {
    fetch("/api/create-room/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guest_can_pause: this.state.guestCanPause,
        votes_to_skip: this.state.votesToSkip,
      }),
    })
      .then((response) => response.json())
      .then((data) => this.props.history.push("/room/" + data.code));
  }

  renderButtons = () => {
    <>
      <Grid item xs={12} align="center">
        <Button color="primary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </>;
  };

  updateRoom = () => {
    fetch("/api/update-room/", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guest_can_pause: this.state.guestCanPause,
        votes_to_skip: this.state.votesToSkip,
        code: this.props.roomCode,
      }),
    }).then((response) => {
      if (response.ok) {
        this.setState({
          successMsg: "Room Successfully Updated.",
        });
      } else {
        this.setState({
          errorMsg: "Room Update Failed.",
        });
      }
      this.props.updateCallBack();
    });
  };

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Collapse
            in={this.state.errorMsg != "" || this.state.successMsg != ""}
          >
            {this.state.successMsg != "" ? (
              <Alert
                severity="success"
                onClose={() => {
                  this.setState({
                    successMsg: "",
                  });
                }}
              >
                {this.state.successMsg}
              </Alert>
            ) : (
              <Alert
                severity="error"
                onClose={() => {
                  this.setState({
                    errorMsg: "",
                  });
                }}
              >
                {this.state.errorMsg}
              </Alert>
            )}
          </Collapse>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            {this.props.update ? "Update Room" : "Create A Room"}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText component="h6">
              <div align="center">Guest Controll of Playback State</div>
            </FormHelperText>
            <RadioGroup
              row
              onChange={this.handleGuestChange}
              defaultValue={this.props.guestCanPause}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              ></FormControlLabel>
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
              ></FormControlLabel>
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            required={true}
            onChange={this.handleVotesChange}
            type="number"
            defaultValue={this.props.votesToSkip}
            inputProps={{ min: 1, style: { textAlign: "center" } }}
          ></TextField>
          <FormHelperText component="h6">
            <div align="center"> Votes Required to Skip Song</div>
          </FormHelperText>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="secondary"
            variant="contained"
            onClick={() =>
              this.props.update ? this.updateRoom() : this.handleSubmit()
            }
          >
            {this.props.update ? "Save" : "Create Room"}
          </Button>
        </Grid>
        {!this.props.update && this.renderButtons()}
      </Grid>
    );
  }
}

 
// `
// creat spotify applicatin
//   has client id 
//   has client secret

// request authorization to access data ->
//  displays prompt for user to log in ->
//   redirect to our website
  
// recieved code -> allows to request token -> shows authorization 

// token used to make requests 
//   -> returns access and refresh tokens

//   acess token -> gives access to spotify api -> expired in 1 hour
//   refresh token -> used to get new access token if access token is expired
// `
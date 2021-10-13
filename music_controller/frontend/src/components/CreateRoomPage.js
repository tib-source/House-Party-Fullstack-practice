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
} from "@material-ui/core";
import { Link } from "react-router-dom";

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
    console.log("Room Updated");
    this.props.history.push(`/room/${this.props.roomCode}`);
  };
  render() {
    return (
      <Grid container spacing={1}>
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
              defaultValue="true"
              onChange={this.handleGuestChange}
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
            defaultValue={this.state.votesToSkip}
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

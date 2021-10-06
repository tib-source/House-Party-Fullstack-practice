import React, { Component } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
export class Room extends Component {
  constructor(props) {
    super(props);

    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
    };

    this.roomCode = this.props.match.params.roomCode;
  }

  componentDidMount() {
    fetch("/api/get-room" + "?code=" + this.roomCode)
      .then((response) => response.json())
      .then((data) => {
        return this.setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      });
  }

  render() {
    return (
      <Grid container align='center' spacing={1}>
        <Grid item xs={12} >
          <Typography variant='h4' component='h4'>
            Code : {this.roomCode}
          </Typography>
        </Grid>
        <Grid item xs={12} >
        <Typography variant='h6' component='h6'>
            Votes : {this.state.votesToSkip}
          </Typography>
        </Grid>
        <Grid item xs={12} >
        <Typography variant='h6' component='h6'>
            guestCanPause : {this.state.guestCanPause.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} >
        <Typography variant='h6' component='h6'>
            isHost : {this.state.isHost.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} >
          <Button color='secondary' variant='contained' to='/' component={Link}>
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
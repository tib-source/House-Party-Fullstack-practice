import React, { Component } from "react";

export class Room extends Component {
  constructor(props) {
    super(props);

    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
    };

    this.roomCode = this.props.match.params.roomCode;
    this.getRoom();
  }

  getRoom() {
    fetch("/api/get-room" + "?code=" + this.roomCode)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      });
  }

  render() {
    return (
      <div>
        <h2>{this.roomCode}</h2>
        <p>votesToSkip: {this.state.votesToSkip}</p>
        <p>guestCanPause: {this.state.guestCanPause.toString()}</p>
        <p>isHost: {this.state.isHost.toString()}</p>
      </div>
    );
  }
}

export default Room;

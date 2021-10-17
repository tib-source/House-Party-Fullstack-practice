import React, { Component } from "react";
import {
  Grid,
  Typography,
  Card,
  LinearProgress,
  IconButton,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PauseIcon from "@material-ui/icons/Pause";

export default class MusicPlayer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const songProgress = (this.props.time / this.props.duration) * 100;
    return (
      <Card>
        <Grid container alignitems="center">
          <Grid item xs={4} align="center">
            <img
              src={this.props.image_url}
              heigh="100%"
              width="100%"
              alt="album cover"
            />
          </Grid>
          <Grid item xs={8} align="center">
            <Typography component="h5" variant="h5">
              {this.props.title}
            </Typography>
            <Typography
              color="textSecondary"
              component="h5"
              variant="subtitle1"
            >
              {this.props.artist}
            </Typography>
            <div>
              <IconButton>
                {this.props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton>
                <SkipNextIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <LinearProgress variant="determinate" value={songProgress} />
      </Card>
    );
  }
}
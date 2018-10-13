import React, { Component } from 'react';
import { TextField, Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import UploadPhoto from './UploadPhoto';

const style = () => ({
  root: {
    margin: '20px 1px',
  },
  grid: {
    marginBottom: '10px',
  },
  textField: {
  }
})

class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      caption: '',
      imgFile: '',
      isCat: false
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid className={classes.root} container>
        <Grid className={classes.grid} xs={12} item>
          <UploadPhoto></UploadPhoto>
        </Grid>
        <Grid className={classes.grid} xs={12} item>
          <TextField
            className={classes.textField}
            label="Name"
            placeholder="Please enter your nameow"
            name="name"
            variant="outlined"
            value={this.state.name}
            onChange={this.onChange}
          />
        </Grid>
        <Grid className={classes.grid} xs={12} item>
          <TextField
            label="Caption"
            placeholder="Please enter the captioneoww"
            name="caption"
            variant="outlined"
            multiline
            value={this.state.caption}
            onChange={this.onChange}
            rows="5"
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(style)(Upload);

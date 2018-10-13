import React, { Component } from 'react';
import { TextField, Grid, Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import * as _ from 'lodash';
import {retrieveTags , checkCat} from '../services/VisionService';
import fire from '../fire';
import uuid from 'uuid/v1';

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
    this.onFileChange = this.onFileChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  onClick = (e) => {
    if (!this.isCat && (this.state.name === '' || this.state.caption === '' || this.state.imgFile === '')) {
      console.log("sowwy pwease weupwoad your photo uwu");
    } else {
      var str = uuid();
      fire.storage().ref().child('images/' + str).put(this.state.imgFile).then(function(snapshot) {
        console.log('Fiwe upwoaded');
      })
      fire.database().ref('posts/').push({
        name: this.state.name,
        caption: this.state.caption,
        image: str
      });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid className={classes.root} container>
          <Grid className={classes.grid} xs={12} item>
            <input
            id="my-file-selector"
            type="file"
            name="file"
            onChange={ this.onFileChange }
            style={{display: 'none'}}
            accept="image/*"
            />
            <label htmlFor="my-file-selector">
              <Button component="span">
                <Typography variant="h6">Upload Cat</Typography>
              </Button>
            </label>

            { this.state.isCat ? (<h1> IS CAT </h1>) : (<h1> IS NOT CAT </h1>)}
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
          <Grid className={classes.grid} xs={12} item>
            <Button
              label="Upload"
              name="Upload"
              onClick={this.onClick} 
            ><Typography variant='h6'>Submit</Typography>
            </Button>
            <Button
              label="Return"
              name="Return"
              href="/"
            ><Typography variant='h6'>Return</Typography>
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }

  onFileChange(e) {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) {
        console.log('no files');
    }
    retrieveTags(files).then((tags) => {
      console.dir(tags);
      _(tags).forEach( (tag) => console.log(tag.name) );
    });
    checkCat(files).then((res) => {
      this.setState(() => ({
        imgFile : files[0],
        isCat : res
      }));
    })
  }
}


export default withStyles(style)(Upload);

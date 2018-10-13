import React, { Component } from 'react';

import * as _ from 'lodash';
import {retrieveTags , checkCat} from '../services/VisionService';
import { Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const style = () => ({
  uploadBth: {
    background: 'red',
  }
})

class UploadPhoto extends Component {

  constructor(props) {
    super(props);
    this.state = {
        isCat: false,
    };
    this.onFileChange = this.onFileChange.bind(this);
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
        isCat : res
      }));
    })
  }
  
  render() {
    const { classes } = this.props;

    return (
      <div>
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
            <Typography variant="h6">Upload</Typography>
          </Button>
        </label>

        { this.state.isCat ? (<h1> IS CAT </h1>) : (<h1> IS NOT CAT </h1>)}
      </div>
    );
  }
}

export default withStyles(style)(UploadPhoto);

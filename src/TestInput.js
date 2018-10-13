import React, { Component } from 'react';
import './App.css';

import * as _ from 'lodash';
import {retrieveTags , isCat} from './services/VisionService';

class TestInput extends Component {

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
    
    isCat(files).then(() => {
      this.setState(() => ({
        isCat : isCat(files)
      }));
    
    })

  }
  
  render() {
    return (
      <div>
        <input id="my-file-selector" type="file" name="file" onChange = { this.onFileChange }></input>  
        { this.state.isCat ? (<h1> IS CAT </h1>) : (<h1> IS NOT CAT </h1>)}
      </div>
    );
  }
}

export default TestInput;

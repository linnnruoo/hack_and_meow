import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import { TextField, Grid, Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import * as _ from 'lodash';
import {retrieveTags , checkCat} from '../services/VisionService';
import fire from '../fire';
import uuid from 'uuid/v1';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function nyan(str) {
  var arr = str.split('');
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === 'l' || arr[i] === 'r') {
      console.log("hello");
      arr[i] = 'w';
    }
  }

  for (var i = 0; i < arr.length - 1; i++) {
    if (arr[i] === 'n' && arr[i+1] === 'a') {
      arr = arr.slice(0, i+1)
                .concat(['y'])
                .concat(arr.slice(i+1, arr.length));
    }
  }
  
  return arr.join("");
}

const style = () => ({
  root: {
    margin: '20px 1px',
  },
  grid: {
    marginBottom: '10px',
  },
  textField: {
    width: 300
  },
  uploadBtn: {
    background: '#855A5C'
  }
})

class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      caption: '',
      imgFile: '',
      isCat: false,
      alertlevel: 0,
      pass: false
    }
    this.onFileChange = this.onFileChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  onClick = (e) => {
    var owos = ["owo", "uwu", "OwO", "UwU", "^w^"]
    if (this.state.name === '' || this.state.caption === '' || this.state.imgFile === '') {
      this.setState({alertlevel : 1, pass : false});
    }
    else if(this.state.pass) {
      if (!this.state.isCat) {
        this.setState({alertlevel: 2, pass : false});
      } else {
        var str = uuid();

        var newCaption = nyan(this.state.caption);
        var newName = nyan(this.state.name);
        var appendedCaption = (Math.random() > 0.4) ? 
        (" " + owos[Math.round(Math.random()*owos.length)]) : "";
        console.log(newName);
        console.log(newCaption);

        fire.storage().ref().child('images/' + str).put(this.state.imgFile).then((snapshot) =>{
          console.log('Fiwe upwoaded');
            
          fire.database().ref('posts/').push({
            name: newName,
            caption: `${newCaption} ${appendedCaption}`,
            image: str
          }, () => {
            this.setState({alertlevel : 0, pass : false});
            window.location.href = "/";
          });

        })
      }
    }

  }

  handleClose(e) {
    this.setState({alertlevel : 0});
  }

  render() {
    const error_messages = [
      "Sowething went wrong with MeowMeow uwu", 
      "Sowwy pwease enter youw infowmation uwu", 
      "Sowwy pwease upwoad a cat photo uwu"
    ]

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
              <Button component="span" color="primary" fullWidth>
                <Typography variant="h6">Upload Cat Here</Typography>
              </Button>
            </label>
            {/* this.state.isCat ? (<h1> IS CAT </h1>) : (<h1> IS NOT CAT </h1>) */}
          </Grid>
          <Grid className={classes.grid} xs={12} item>
            <TextField
              className={classes.textField}
              label="Name"
              placeholder="Pwease enter youw nameow"
              name="name"
              variant="outlined"
              value={this.state.name}
              onChange={this.onChange}
            />
          </Grid>
          <Grid className={classes.grid} xs={12} item>
            <TextField
              className={classes.textField}
              label="Caption"
              placeholder="Pwease enter the captioneoww"
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
              color="primary"
            ><Typography variant='h6'>Submit</Typography>
            </Button>
            <Button
              label="Return"
              name="Return"
              href="/"
              color="primary"
            ><Typography variant='h6'>Return</Typography>
            </Button>
          </Grid>
        </Grid>
        <Dialog
          open={(this.state.alertlevel>0) ? true : false}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogContentText variant="subtitle1" id="alert-dialog-slide-description">
              {error_messages[this.state.alertlevel]}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Okay uwu
            </Button>
          </DialogActions>
        </Dialog>
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
      //console.log(res);
      this.setState(() => ({
        imgFile : files[0],
        isCat : res,
        pass : true
      }));
    })
  }
}


export default withStyles(style)(Upload);

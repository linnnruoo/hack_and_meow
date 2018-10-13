import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Nav from './Nav';
import { Card, Divider, CardMedia, CardContent, Typography } from '@material-ui/core';
import Skeleton from 'react-loading-skeleton';
import imageLoader from '../image/placeholder4.png';
import fire from '../fire';

const style = theme => ({
  cardGroup: {
    marginTop: '65px',
    marginBottom: '10px'
  },
  card: {
    maxWidth: 310,
    margin: '5px 0px'
  },
  media: {
    height: '250px',
    width: '100%',
    objectFit: 'cover',
  },
  typography: {
    textAlign: 'left'
  },
  divider: {
    margin: '0px 10px'
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      posts : []
    }
  }

  componentDidMount() {
    var data = [];
    const storeRef = fire.storage().ref().child('images/');
    const dbRef = fire.database().ref('/posts');
    dbRef.once('value', function(snapshot) {
      snapshot.forEach(function(child) {
        console.log(storeRef.child(child.val().image));
        child.val().image = storeRef.child(child.val().image);
        data.push(child.val());
      })
    })
    console.log(data);
    //console.log("test", this.state.posts);
  }

  render() {
    const { classes } = this.props;

    if (this.state.posts.length > 0) {
      console.log("settled");
    }
    return (
      <div>
        <Nav />
        <Grid
          className={classes.cardGroup}
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={8}
          container
        >
          {[1,2,3,4,5].map((card, index) => {
            return (
              <Grid key={index} item>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={card.imageUrl || imageLoader}
                  />
                  <CardContent>
                    <Typography variant="h6" className={classes.typography}>
                      {card.caption || <Skeleton count={4} />}
                    </Typography>
                  </CardContent>
                  <Divider className={classes.divider} light />
                  <CardContent>
                    <Typography variant="h6" className={classes.typography}>Posted by {card.name || <Skeleton width={200} />}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </div>
    );
  }
}

export default withStyles(style)(Home);

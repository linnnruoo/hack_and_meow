import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Card, Divider, CardMedia, CardContent, Typography } from '@material-ui/core';
import Skeleton from 'react-loading-skeleton';
import imageLoader from '../image/placeholder4.png';

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

class CardLoader extends Component {

  render() {
    const { classes } = this.props;

    return (
      <div>
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
                    image={imageLoader}
                  />
                  <CardContent>
                    <Typography variant="h6" className={classes.typography}>
                      {<Skeleton count={4} />}
                    </Typography>
                  </CardContent>
                  <Divider className={classes.divider} light />
                  <CardContent>
                    <Typography variant="h6" className={classes.typography} style={{fontSize: '15px'}}>Posted by {<Skeleton width={200} />}</Typography>
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

export default withStyles(style)(CardLoader);

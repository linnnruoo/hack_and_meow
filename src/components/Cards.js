import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Card, Divider, CardMedia, CardContent, Typography } from '@material-ui/core';
import Skeleton from 'react-loading-skeleton';
import imageLoader from '../image/placeholder4.png';

const style = theme => ({
  cardGroup: {
    marginTop: '65px',
    marginBottom: '10px',
  },
  card: {
    height: 'auto',
    width: '100%',
    maxWidth: '15.6em',
    margin: '5px 0px'
  },
  media: {
    height: 250,
    objectFit: 'cover',
  },
  typography: {
    textAlign: 'left',
  },
  divider: {
    margin: '0px 10px'
  }
});

class Cards extends Component {
  render() {
    const { classes, posts } = this.props;

    return (
      <Grid
        className={classes.cardGroup}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        container
      >
        {(posts).map((card, index) => {
          return (
            <Grid key={index} xs={12} sm={4} md={3} lg={2} item container justify="center">
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={card.image || imageLoader}
                />
                <CardContent>
                  <Typography variant="h6" className={classes.typography}>
                    {card.caption || <Skeleton count={4} />}
                  </Typography>
                </CardContent>
                <Divider className={classes.divider} light />
                <CardContent>
                  <Typography variant="h6" className={classes.typography} style={{fontSize: '15px'}}>Posted by {card.name || <Skeleton width={200} />}</Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    );
  }
}

export default withStyles(style)(Cards);

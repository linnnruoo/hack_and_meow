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
    minWidth: 310,
    margin: '5px 0px'
  },
  media: {
    height: '250px',
    width: '100%',
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
  constructor() {
    super();

    this.state = {
      imgReady: false
    }
  }
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
          {(this.props.posts).map((card, index) => {
            return (
              <Grid key={index} item>
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
      </div>
    );
  }
}

export default withStyles(style)(Cards);

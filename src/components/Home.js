import React, { Component } from 'react';
import Nav from './Nav';
import fire from '../fire';
import Cards from './Cards';
import CardLoader from './CardLoader';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts : []
    }
  }

  componentDidMount = async() => {
    let temp = [];
    const storeRef = fire.storage().ref().child('images/');
    const dbRef = fire.database().ref('/posts');
    let childPromises = [];
    dbRef.once('value').then((snapshot) => {
      snapshot.forEach((child) => {
        childPromises.push(storeRef.child(child.val().image).getDownloadURL());
        temp.push(child.val());
      });

      // sort by time
      childPromises = childPromises.reverse();
      temp = temp.reverse();

      Promise.all(childPromises).then((response) => {
        for (let i = 0; i< response.length; i++){
          temp[i].image = response[i];
        }
        this.setState(() => ({
          posts: temp,
        }));
      });
    });
  }

  render() {
    return (
      <>
        <Nav />
        <div>
        {
          (this.state.posts.length>0)
          ? <Cards posts={this.state.posts} />
          : <CardLoader />
        }
        </div>
      </>
    );
  }
}

export default Home;

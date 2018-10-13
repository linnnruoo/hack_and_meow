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

  async componentDidMount() {
    var temp = [];
    const storeRef = fire.storage().ref().child('images/');
    const dbRef = fire.database().ref('/posts');

    dbRef.once('value').then((snapshot) => {
      snapshot.forEach((child) => {
        storeRef.child(child.val().image).getDownloadURL().then((url) => {
          child.val().image = url;
          temp.push(child.val());
        })
      });

      console.log(temp);
      this.setState(() => ({
        posts: temp
      }));
    })
  }

  render() {

    return (
      <div>
        <Nav />
        {
          (this.state.posts.length>0)
          ? <Cards posts={this.state.posts}></Cards>
          : <CardLoader></CardLoader>
        }  
      </div>
    );
  }
}

export default Home;

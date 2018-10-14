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
    var childPromises = [];
    dbRef.once('value').then((snapshot) => {
      snapshot.forEach((child) => {
        childPromises.push(storeRef.child(child.val().image).getDownloadURL());
        temp.push(child.val());
      });
      
      // sort by time
      childPromises = childPromises.reverse();
      temp = temp.reverse();

      Promise.all(childPromises).then((response) => {
        //console.log(response);
        for (var i = 0; i< response.length; i++){
          temp[i].image = response[i];
        }
        //console.log(temp);
        this.setState(() => ({
          posts: temp,
        }));
      });
    });
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

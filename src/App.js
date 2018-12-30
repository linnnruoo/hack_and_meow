import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Upload from './components/Upload';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Mali"'
  },
  palette: {
    primary: { main: '#66101F'},
    secondary: { main: '#66101F'},
  },
})

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <Route exact path="/" component={ Home } />
            <Route exact path="/upload" component={ Upload } />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;

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
    primary: {
      light: '#66101F',
      main: '#66101F',
      dark: '#66101F',
    },
    secondary: {
      light: '#66101F',
      main: '#66101F',
      dark: '#66101F',
    },
  },
})

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <div className="children">
              <Route exact path="/" component={ Home } />
              <Route exact path="/upload" component={ Upload } />
            </div>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;

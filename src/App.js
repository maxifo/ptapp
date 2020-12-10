import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Router from './components/Router';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="subtitle1">
            PT App
          </Typography>
        </Toolbar>
      </AppBar>
      <Router />
    </div>
  );
}

export default App;
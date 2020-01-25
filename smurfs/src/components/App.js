import React, { Component } from "react";
import "./App.css";
import {Display, AddSmurf} from './addSmurf'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>SMURFS!</h1>
        <div>or whatever you want...</div>
        <Display />
        <AddSmurf />
      </div>
    );
  }
}

export default App;
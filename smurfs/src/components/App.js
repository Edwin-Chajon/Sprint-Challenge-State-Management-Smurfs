import React, { Component } from "react";
import "./App.css";
import axios from 'axios'

import smurfContext from '../smurfContext/smurfContext'



class App extends Component {

  state = {
    smurfs: [],
    smurfsText: ''
  };

  componentDidMount(){
    axios.get('http://localhost:3333/smurfs').then(response => {
      this.setState({smurfs: response.data})
    })
    window.addEventListener('resize', this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    return (
      <div className="App">
        <h1>SMURFS! 2.0 W/ Redux</h1>
        <div>Welcome to your state management version of Smurfs!</div>
        <div className="players">
        {this.state.smurfs.map(smurf=>(
          <div>
          <h2>{smurf.name}</h2>
          <h3>{smurf.age}</h3>
          <h3>{smurf.height}</h3>
          </div>
        ))}
      </div>
      </div>
    );
  }
}

export default App;

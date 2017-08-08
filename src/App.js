import React, { Component } from 'react';
import './App.css';
import {Game} from './components/Game';
import {LandingPage} from './components/LandingPage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isGameActive: false,
      test: {}
    }
  }
  render() {
    if (this.state.isGameActive) {
      return <Game test={this.state.test}/>
    }
    else {
      return <LandingPage chooseText={(textOption) => this.loadTest(textOption)} />
    }
  }

  loadTest(textOption) {
    this.setState({
      isGameActive: true,
      test: textOption
    })
  }
}

export default App;

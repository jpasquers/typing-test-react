import React, { Component } from 'react';
import './App.css';
import {Game} from './components/Game';
import {LandingPage} from './components/LandingPage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isGameActive: false,
      previousScore: {},
      previouslyPlayed: false,
      test: {}
    }
  }
  render() {
    if (this.state.isGameActive) {
      return <Game 
        test={this.state.test}
        endGame={(score) => this.loadScore(score)}/>
    }
    else {
      return <LandingPage 
        previouslyPlayed={this.state.previouslyPlayed} 
        previousScore={this.state.previousScore} 
        chooseText={(textOption) => this.loadTest(textOption)} />
    }
  }

  loadScore(score) {
    this.setState({
      isGameActive: false,
      previousScore: score,
      previouslyPlayed: true
    })
  }

  loadTest(textOption) {
    this.setState({
      isGameActive: true,
      test: textOption
    })
  }
}

export default App;

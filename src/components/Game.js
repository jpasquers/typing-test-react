import React, { Component } from 'react';
import {Observable} from 'rxjs/Rx';
import './Game.css';
import {CustomKey} from '../util/CustomKey';

export class Game extends Component {
    previousKeyDown;

    constructor(props) {
        super(props);
        var words = this.props.test.text.split(" ");
        var inputString = "";
        this.state = {
            words: words,
            inputString: inputString,
            currIndex: 0,
            started: false,
            totalTime: 60,
            currTime: 60
        }

        this.previousKeyDown = -1;
    }

    render() {
        return(
            <div className="container">
                {this.renderTime()}
                <h1>{this.props.test.label}</h1>
                {this.renderWords()}
                <div className="input-container">
                    {this.renderInputVisible()}
                    {this.renderInputActual()}
                </div>

            </div>
        )
    }

    initTimer() {
        this.setState({
            started:true
        })
        var obs = Observable.timer(0, 1000).take(this.state.totalTime);
        var observe = obs.subscribe(() => {
            this.setState({
                currTime: this.state.currTime - 1
            })
        }, () => {

        }, () => {
            var playerScore = this.calculateScore();
            this.props.endGame(playerScore);
        })
    }

    calculateScore() {
        var correctWords = 0;
        var incorrectWords = 0;
        var expectedWords = this.state.words;
        var actualWords = this.state.inputString.split(" ").filter((word) => {
            return word.length !== 0;
        })
        var len = Math.min(actualWords.length, expectedWords.length);
        for (var i=0; i< len; i++) {
            actualWords[i] === expectedWords[i] ? correctWords++ : incorrectWords++;
        }
        return {
            correctWords: correctWords,
            incorrectWords: incorrectWords
        }
    }

    renderInputVisible() {
        
        var inputWords = this.state.inputString.split(" ");
        var inputWordsFiltered = inputWords.filter((word, i) => {
            return word.length !== 0 || i == inputWords.length - 1;
        });
        return (<div onClick={this.visibleFocus} className="input input-visible">
            {
                inputWordsFiltered.map((word, i) => {
                    if (word == this.state.words[i] ) {
                        return (<span key={i}>{word} </span>)
                    }
                    else if (i == inputWordsFiltered.length - 1) {
                        return (<span key={i}>{word}</span>)
                    }
                    return (<span className="error" key={i}>{word} </span>)
                })
            }
            <span className="blinking-cursor">|</span>
        </div>)
        
    }

    visibleFocus() {
        document.querySelector(".input-actual").focus();
    }

    renderInputActual() {
        var inputWords = this.state.inputString.split(" ");
        return(<input className="input input-actual" onChange={(event) => this.inputChange(event)}>
            </input>)     
    }

    inputChange(event) {
        if (!this.state.started) {
            this.initTimer();
        }
        var newInputString = event.target.value;
        var newInputwords = newInputString.split(" ");
        var len = newInputwords.filter((str,i) => {
            return str.length !== 0 || i == newInputwords.length - 1;
        }).length;

        this.setState({
            inputString: event.target.value,
            currIndex: len - 1
        })


    }

    renderTime() {
        var mins = Math.floor(this.state.currTime / 60);
        var secs = this.state.currTime % 60;
        if (secs == 0) secs = "00";
        return (<div className="time">
            {mins}:{secs}
            </div>)
    }

    renderWords() {
        return(<p>
            {this.state.words.map((word, i) => {
                if (i === this.state.currIndex) {
                    return(<span key={i} className="active-word">{word}&nbsp;</span>)
                }
                else {
                    return(<span key={i}>{word}&nbsp;</span>)
                }
            })}
            
            </p>)
    }
}
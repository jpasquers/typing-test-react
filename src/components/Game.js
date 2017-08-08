import React, { Component } from 'react';
import {Observable} from 'rxjs/Rx';
import './Game.css';

export class Game extends Component {

    constructor(props) {
        super(props);
        var words = this.props.test.text.split(" ");
        this.state = {
            words: words,
            currIndex: 0,
            started: false,
            totalTime: 60,
            currTime: 60
        }
    }

    render() {
        return(
            <div className="container">
                {this.renderTime()}
                <h1>{this.props.test.label}</h1>
                {this.renderWords()}
                <input onKeyDown={(event) => this.keyDown(event)}/>
            </div>
        )
    }

    keyDown(event) {
        if (!this.state.started) {
            this.state = Object.assign({}, this.state, {
                started: true
            })
            var obs = Observable.timer(0, 1000).take(totalTime);
            var observe = obs.subscribe(() => {
                this.state = Object.assign({}, this.state, {
                    currTime: this.state.currTime - 1
                })
            })
        }


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
                    return(<span className="active-word">{word}&nbsp;</span>)
                }
                else {
                    return(<span>{word}&nbsp;</span>)
                }
            })}
            
            </p>)
    }
}
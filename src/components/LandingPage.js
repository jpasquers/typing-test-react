import React, { Component } from 'react';
import './LandingPage.css';

export class LandingPage extends Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            textOptions: []
        }

        this.loadTextOptions();
    }
    render() {
        return(
            <div className="landing-container">
                <div className="landing">
                    <div className="choose-text">
                        Choose which text to test on:    
                    </div>
                    {this.renderTextOptions()}
                </div>
            </div>
        )
    }

    renderTextOptions() {
        if (!this.state.loading) {
            return (<div className="options">
                    { this.state.textOptions.map((textOption, i) => {
                        return (<div key={i}
                            onClick={() => this.props.chooseText(textOption)} 
                            className="option">
                                {textOption.label}
                            </div>);
                    })}
                </div>)
           
        }
    }

    loadTextOptions() {
        //for the moment load statically
        this.state = Object.assign({}, this.state, {
            loading: false,
            textOptions: [
                {
                    label: "Aesop's fables",
                    text: "here is a list of aesop's fables. This is a test text"
                },
                {
                    label: "A second label",
                    text: "this is a second text option. Testing testing testing this is not a good test"
                },
                {
                    label: "A second label",
                    text: "this is a second text option. Testing testing testing this is not a good test"
                },
                {
                    label: "A second label",
                    text: "this is a second text option. Testing testing testing this is not a good test"
                },
                {
                    label: "A second label",
                    text: "this is a second text option. Testing testing testing this is not a good test"
                },
                {
                    label: "A second label",
                    text: "this is a second text option. Testing testing testing this is not a good test"
                }
            ]
        })
        
    }
}
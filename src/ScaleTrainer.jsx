// @flow
import React, {Component} from 'react';
import ScaleQuestion from './ScaleQuestion';
import {getRandomQuestion} from './music/random';
import type {Question} from './music/question';
import './ScaleTrainer.scss';
import {keyToString} from './music/key';

type State = {
    question: ?Question,
    includeModes: boolean,
    includeHarmonicMinor: boolean,
    includeMelodicMinor: boolean
};

export default class ScaleTrainer extends Component<void, State> {
    state = {
        question: undefined,
        includeModes: true,
        includeHarmonicMinor: true,
        includeMelodicMinor: true
    };

    componentWillMount() {
        this._updateQuestion();
    }

    _handleNextClick = () => {
        this._updateQuestion();
    };

    _handleOptionChange = (e: any) => {
        const option = e.target.value;
        this.setState({
            [option]: !this.state[option]
        }, this._updateQuestion);
    };

    _updateQuestion = () => {
        this.setState(state => ({
            question: getRandomQuestion(state.includeModes, state.includeHarmonicMinor, state.includeMelodicMinor)
        }));
    };

    renderOptions() {
        return (
            <div className="scaleTrainer__options">
                <label htmlFor="includeModes">
                    <input type="checkbox" name="includeModes" value="includeModes" checked={this.state.includeModes}
                        onChange={this._handleOptionChange}/>
                    Modes
                </label>
                <label htmlFor="includeHarmonicMinor">
                    <input type="checkbox" name="includeHarmonicMinor" value="includeHarmonicMinor"
                        checked={this.state.includeHarmonicMinor}
                        onChange={this._handleOptionChange}/>
                    Harmonic Minor
                </label>
                <label htmlFor="includeMelodicMinor">
                    <input type="checkbox" name="includeMelodicMinor" value="includeMelodicMinor"
                        checked={this.state.includeMelodicMinor}
                        onChange={this._handleOptionChange}/>
                    Melodic Minor
                </label>
            </div>
        );
    }

    render() {
        const question = this.state.question;
        return (
            <>
                {this.renderOptions()}
                {question && question.type === 'scale'
                    ? <ScaleQuestion key={_questionToString(question)} question={question}
                        onNextClick={this._handleNextClick}/>
                    : <div>Loading...</div>}
            </>
        );
    }
}

function _questionToString(question: Question): string {
    return `${question.type}${keyToString(question.key)}`;
}
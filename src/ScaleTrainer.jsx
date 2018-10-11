// @flow
import React, {Component} from 'react';
import ScaleQuestion from './components/ScaleQuestion/ScaleQuestion';
import type {ScaleOptions} from './music/random';
import {getRandomQuestion} from './music/random';
import type {Question} from './music/question';
import './ScaleTrainer.scss';
import type {ScaleName} from './music/scale';
import {
    MAJOR_SCALE,
    Scale,
    SCALES
} from './music/scale';

type State = {
    question: ?Question,
    options: {
        includeAccidentals: boolean,
        includeModes: boolean,
        scales: ScaleOptions
    }
};

const DEFAULT_SCALES = SCALES.reduce((scales: ScaleOptions, scale: Scale) => ({...scales, [scale.name]: true}), {});

export default class ScaleTrainer extends Component<void, State> {
    state = {
        question: undefined,
        options: {
            includeAccidentals: _getBooleanFromLocalStorage('includeAccidentals'),
            includeModes: _getBooleanFromLocalStorage('includeModes'),
            scales: _getObjectFromLocalStorage('scales', DEFAULT_SCALES)
        }
    };

    componentWillMount() {
        this._updateQuestion();
    }

    _handleNextClick = () => {
        this._updateQuestion();
    };

    _handleOptionChange = (e: any) => {
        const option = e.target.value;
        const value = !this.state.options[option];
        this.setState(_updateOption(option, value), this._updateQuestion);
    };

    _handleScaleOptionChange = (e: any) => {
        const scale = e.target.value;
        const value = !this.state.options.scales[scale];
        this.setState(_updateScaleOption(scale, value), this._updateQuestion);
    };

    _updateQuestion = () => {
        this.setState(state => {
            return ({
                question: getRandomQuestion(
                    state.options.includeAccidentals,
                    state.options.includeModes,
                    state.options.scales
                )
            });
        });
    };

    get _onlyMajorScaleSelected(): string {
        const scales = this.state.options.scales;
        const numberOfScales = Object.keys(scales)
            .reduce((numberOfScales: number, scale: ScaleName) => scales[scale] ? numberOfScales + 1 : numberOfScales,
                0);
        return numberOfScales === 1 && scales[MAJOR_SCALE.name];
    }

    renderOptions() {
        const onlyMajorScaleSelected = this._onlyMajorScaleSelected;
        return (
            <div className="scaleTrainer__options">
                <fieldset>
                    <legend>Notes</legend>
                    <label htmlFor="includeAccidentals">
                        <input
                            type="checkbox"
                            id="includeAccidentals"
                            name="includeAccidentals"
                            value="includeAccidentals"
                            checked={this.state.options.includeAccidentals}
                            onChange={this._handleOptionChange}/>
                        Accidentals
                    </label>
                </fieldset>
                <fieldset>
                    <legend>Scales</legend>
                    <div className="scaleTrainer__scales">
                        {SCALES.map((scale: Scale) => (
                            <label htmlFor={scale.name} key={scale.name}>
                                <input
                                    type="checkbox"
                                    id={scale.name}
                                    name={scale.name}
                                    value={scale.name}
                                    checked={this.state.options.scales[scale.name]}
                                    disabled={onlyMajorScaleSelected && scale.name === MAJOR_SCALE.name}
                                    onChange={this._handleScaleOptionChange}/>
                                {scale.name}
                            </label>
                        ))}
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Modes</legend>
                    <label htmlFor="includeModes">
                        <input
                            type="checkbox"
                            id="includeModes"
                            name="includeModes"
                            value="includeModes"
                            checked={this.state.options.includeModes}
                            onChange={this._handleOptionChange}/>
                        Modes
                    </label>
                </fieldset>
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

function _updateOption(option: string, value: boolean) {
    return (state: State) => {
        localStorage.setItem(option, value);
        return {
            ...state,
            options: {
                ...state.options,
                [option]: value
            }
        };
    };
}

function _updateScaleOption(scale: string, value: boolean) {
    return (state: State) => {
        const scales = {...state.options.scales};
        scales[scale] = value;
        const zeroScalesSelected = !Object.keys(scales).some(s => scales[s]);
        if (zeroScalesSelected) {
            scales[MAJOR_SCALE.name] = true;
        }
        localStorage.setItem('scales', JSON.stringify(scales));
        return {
            ...state,
            options: {
                ...state.options,
                scales
            }
        };
    };
}

function _questionToString(question: Question): string {
    return `${question.type}${question.key}`;
}

function _getBooleanFromLocalStorage(key: string, defaultValue = true): boolean {
    const value = localStorage.getItem(key);
    if (value === null || typeof value === 'undefined') {
        return defaultValue;
    }
    return value === 'true';
}

function _getObjectFromLocalStorage(key: string, defaultValue = {}): boolean {
    const value = localStorage.getItem(key);
    if (value === null || typeof value === 'undefined') {
        return defaultValue;
    }
    return {
        ...defaultValue,
        ...JSON.parse(value)
    };
}
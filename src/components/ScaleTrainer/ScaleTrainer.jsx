// @flow
import React, {Component} from 'react';
import ScaleQuestion from '../ScaleQuestion/ScaleQuestion';
import type {ScaleOptions} from '../../music/random';
import {getRandomQuestion} from '../../music/random';
import type {Question} from '../../music/question';
import type {ScaleName} from '../../music/scale';
import {
    MAJOR_SCALE,
    Scale,
    SCALES
} from '../../music/scale';
import type {Options} from '../Menu/Menu';
import Menu from '../Menu/Menu';
import MenuBar from '../Menu/MenuBar';
import './ScaleTrainer.scss';

type State = {
    isMenuOpen: boolean,
    question: ?Question,
    options: Options
};

const DEFAULT_SCALES = SCALES.reduce((scales: ScaleOptions, scale: Scale) => ({...scales, [scale.name]: true}), {});

const INITIAL_STATE = {
    isMenuOpen: false,
    question: undefined,
    options: {
        includeAccidentals: _getBooleanFromLocalStorage('includeAccidentals'),
        includeModes: _getBooleanFromLocalStorage('includeModes'),
        scales: _getObjectFromLocalStorage('scales', DEFAULT_SCALES)
    }
};

export default class ScaleTrainer extends Component<void, State> {
    state = INITIAL_STATE;

    componentWillMount() {
        this._updateQuestion();
    }

    _handleNextClick = () => {
        this._updateQuestion();
    };

    _handleOptionChange = (option: string, isEnabled: boolean) => {
        this.setState(_updateOption(option, isEnabled), this._updateQuestion);
    };

    _handleScaleOptionChange = (scale: ScaleName, isEnabled: boolean) => {
        this.setState(_updateScaleOption(scale, isEnabled), this._updateQuestion);
    };

    _handleMenuButtonClick = () => {
        this.setState(_toggleMenu());
    };

    _updateQuestion = () => {
        this.setState(_setRandomQuestion());
    };

    renderQuestion() {
        const question = this.state.question;
        if (question && question.type === 'scale') {
            return (
                <ScaleQuestion
                    key={_questionToString(question)}
                    isEnabled={!this.state.isMenuOpen}
                    question={question}
                    onNextClick={this._handleNextClick}/>
            );
        }
        return (
            <div>Loading...</div>
        );
    }

    render() {
        return (
            <div className="scaleTrainer">
                <Menu
                    isOpen={this.state.isMenuOpen}
                    onClose={this._handleMenuButtonClick}
                    onOptionChange={this._handleOptionChange}
                    onScaleOptionChange={this._handleScaleOptionChange}
                    options={this.state.options}/>
                <MenuBar onOpen={this._handleMenuButtonClick}/>
                {this.renderQuestion()}
            </div>
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
        const scales = _selectRequiredScales({
            ...state.options.scales,
            [scale]: value
        });
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

function _selectRequiredScales(scales: ScaleOptions) {
    const zeroScalesSelected = !Object.keys(scales).some(s => scales[s]);
    return zeroScalesSelected ? {
        ...scales,
        [MAJOR_SCALE.name]: true
    } : scales;
}

function _toggleMenu() {
    return (state: State) => ({
        isMenuOpen: !state.isMenuOpen
    });
}

function _setRandomQuestion() {
    return (state: State) => ({
        question: getRandomQuestion(
            state.options.includeAccidentals,
            state.options.includeModes,
            state.options.scales
        )
    });
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
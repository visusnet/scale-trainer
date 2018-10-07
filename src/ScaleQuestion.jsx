// @flow
import React, {Component} from 'react';
import type {ScaleQuestion} from './music/question';
import type {Key} from './music/key';
import {
    applyModeToConstruction,
    keyToNotes,
    keyToString
} from './music/key';
import type {
    Accidental,
    Pitch
} from './music/note';
import {
    ACCIDENTALS,
    areNoteArraysEqual,
    NATURAL_ACCIDENTAL,
    noteToString,
    PITCHES
} from './music/note';
import './ScaleQuestion.scss';

type Props = {
    question: ScaleQuestion,
    onNextClick: () => void
}

type State = {
    pitches: {[number]: Pitch},
    accidentals: {[number]: Accidental},
    isAnswered: boolean,
    isCorrect: boolean,
    showHint: boolean
}

export default class ScaleQuestionComponent extends Component<Props, State> {
    state = {
        pitches: {},
        accidentals: {},
        isAnswered: false,
        isCorrect: false,
        showHint: false
    };

    get _canBeAnswered(): boolean {
        const numberOfPitches = Object.keys(this.state.pitches).length;
        const requiredNumberOfAnswers = this.props.question.key.scale.construction.length - 1;
        return numberOfPitches === requiredNumberOfAnswers;
    }

    _handleAnswer = (e: any) => {
        e.preventDefault();
        if (this._canBeAnswered) {
            this.setState(_setAnswered());
        }
    };

    _handleHintClick = (e: any) => {
        e.preventDefault();
        this.setState(_showHint());
    };

    _handleNextClick = (e: any) => {
        e.preventDefault();
        this.props.onNextClick();
    };

    _createHandlePitchChange = (noteIndex: number) => (e: any) => {
        e.preventDefault();
        this.setState(_updatePitch(noteIndex, _toPitch(e.target.value.toUpperCase())));
    };

    _createHandleAccidentalChange = (noteIndex: number, accidental: Accidental) => (e: any) => {
        this.setState(_updateAccidental(noteIndex, accidental));
    };

    _getPitch(noteIndex: number): ?string {
        if (this.state.pitches[noteIndex]) {
            return this.state.pitches[noteIndex];
        }
        return '';
    }

    _getAccidental = (noteIndex: number): Accidental => {
        if (this.state.accidentals[noteIndex]) {
            return this.state.accidentals[noteIndex];
        }
        return NATURAL_ACCIDENTAL;
    };

    renderAccidentalInputs(noteIndex: number, key: Key) {
        return ACCIDENTALS.map((accidental: Accidental, accidentalIndex: number) => {
                const accidentalKey = `note-${noteIndex}-accidental`;
                const isRoot = noteIndex === 0 || noteIndex === 7;
                const isCurrentAccidental = isRoot
                    ? key.root.accidental === accidental
                    : this._getAccidental(noteIndex) === accidental;
                return (
                    <div className="scaleQuestion__accidental" key={`${accidentalKey}-${accidentalIndex}`}>
                        <label
                            htmlFor={accidentalKey}>
                            <input
                                type="radio"
                                name={accidentalKey}
                                value={accidental}
                                checked={isCurrentAccidental}
                                onChange={this._createHandleAccidentalChange(noteIndex, accidental)}
                                disabled={isRoot}
                            />
                            {accidental}
                        </label>
                    </div>
                );
            }
        );
    }

    renderScaleInputs(key: Key) {
        const numberOfNotes = key.scale.construction.length + 1;
        return (
            <div className="scaleQuestion__notes">
                {_range(numberOfNotes).map(noteIndex => {
                    const isRoot = noteIndex === 0 || noteIndex === 7;
                    const pitch = isRoot
                        ? key.root.pitch
                        : this._getPitch(noteIndex);
                    return (
                        <div className="scaleQuestion__note" key={`note-${noteIndex}`}>
                            <div className="scaleQuestion__pitch">
                                <input
                                    type="text"
                                    name={`note-${noteIndex}-pitch`}
                                    value={pitch}
                                    disabled={isRoot}
                                    tabIndex={noteIndex}
                                    autoFocus={noteIndex === 1}
                                    onChange={this._createHandlePitchChange(noteIndex)}
                                    maxLength={1}
                                />
                            </div>
                            <div className="scaleQuestion__accidentals">
                                {this.renderAccidentalInputs(noteIndex, key)}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    renderHint(key: Key) {
        return (
            <div className="scaleQuestion__hint">
                <h1>Hint</h1>
                <p>{applyModeToConstruction(key.scale, key.mode).join('-')}</p>
            </div>
        );
    }

    renderSolution(key: Key) {
        const notes = keyToNotes(key);
        const modifier = this.state.isCorrect ? 'correct' : 'wrong';
        const className = `scaleQuestion__solution scaleQuestion__solution--${modifier}`;
        return (
            <div className={className}>
                <h1>Solution</h1>
                {this.state.isCorrect
                    ? <p>Your solution is correct!</p>
                    : <p>Sorry, that's not correct.</p>}
                <p>{notes.map(noteToString).join(', ')}</p>
            </div>
        );
    }

    render() {
        const key = this.props.question.key;
        return (
            <div className="scaleQuestion">
                <p>Complete this scale:</p>
                <h1>{keyToString(key)}</h1>
                <form onSubmit={this._handleAnswer}>
                    {this.renderScaleInputs(key)}
                    <button
                        onClick={this._handleAnswer}
                        disabled={!this._canBeAnswered && !this.state.isAnswered}>
                        Answer
                    </button>
                    <button
                        onClick={this._handleHintClick}>
                        Hint
                    </button>
                    <button onClick={this._handleNextClick}>Next</button>
                    {this.state.showHint && this.renderHint(key)}
                    {this.state.isAnswered && this.renderSolution(key)}
                </form>
            </div>
        );
    }
}

function _toPitch(value: string): Pitch | '' {
    const pitchCandidate: any = value.toUpperCase();
    return PITCHES.includes(pitchCandidate)
        ? pitchCandidate
        : '';
}

function _updatePitch(noteIndex: number, pitch: Pitch | '') {
    return (state: State) => {
        const pitches = {
            ...state.pitches,
            [noteIndex]: pitch
        };
        if (pitch === '') {
            delete pitches[noteIndex];
        }
        return {
            ...state,
            pitches
        };
    };
}

function _updateAccidental(noteIndex: number, accidental: Accidental) {
    return (state: State) => ({
        ...state,
        accidentals: {
            ...state.accidentals,
            [noteIndex]: accidental
        }
    });
}

function _setAnswered() {
    return (state: State, props: Props) => {
        const actualNotes = keyToNotes(props.question.key);
        const root = actualNotes[0];
        const answeredNotes = Object.keys(state.pitches).map((pitchIndex: string) => ({
            pitch: state.pitches[Number(pitchIndex)],
            accidental: state.accidentals[Number(pitchIndex)] || NATURAL_ACCIDENTAL
        }));
        const answeredNotesWithRoot = [root, ...answeredNotes, root];
        return {
            ...state,
            isAnswered: true,
            isCorrect: areNoteArraysEqual(actualNotes, answeredNotesWithRoot)
        };
    };
}

function _showHint() {
    return (state: State) => ({
        ...state,
        showHint: true
    });
}

function _range(length: number): number[] {
    return Array.from(Array(length).keys());
}
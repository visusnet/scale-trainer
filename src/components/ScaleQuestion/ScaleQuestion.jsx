// @flow
import React, {Component} from 'react';
import type {ScaleQuestion} from '../../music/question';
import type {Key} from '../../music/key';
import {
    applyModeToConstruction,
    keyToNotes,
    keyToString
} from '../../music/key';
import {Note} from '../../music/note';
import {
    ACCIDENTALS,
    areNoteArraysEqual,
    NATURAL_ACCIDENTAL,
    noteToString,
    PITCHES
} from '../../music/note';
import './ScaleQuestion.scss';
import {
    AUGMENTED_DIMINISHED_INTERVALS,
    relativeIntervalsToRootIntervals
} from '../../music/interval';
import NoteInput from '../NoteInput/NoteInput';

type Props = {
    question: ScaleQuestion,
    onNextClick: () => void
}

type State = {
    notes: {[number]: $Shape<Note>},
    isAnswered: boolean,
    isCorrect: boolean,
    showHint: boolean,
    hintIndex: number
}

const DEFAULT_NOTE: $Shape<Note> = {
    accidental: NATURAL_ACCIDENTAL
};

export default class ScaleQuestionComponent extends Component<Props, State> {
    state = {
        notes: {},
        isAnswered: false,
        isCorrect: false,
        showHint: false
    };

    get _canBeAnswered(): boolean {
        const noteIndices = Object.keys(this.state.notes);
        const numberOfNotes = noteIndices.length;
        const requiredNumberOfAnswers = this.props.question.key.scale.construction.length - 1;
        const areAllNotesComplete = noteIndices.some(noteIndex => {
            const note = this.state.notes[noteIndex];
            return note.pitch && PITCHES.includes(note.pitch)
                && note.accidental && ACCIDENTALS.includes(note.accidental);
        });
        return numberOfNotes === requiredNumberOfAnswers && areAllNotesComplete;
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

    _handleNoteChange = (noteIndex: number, note: Note) => {
        this.setState(_updateNote(noteIndex, note));
    };

    _getNote(key: Key, noteIndex: number): $Shape<Note> {
        if (_isRoot(noteIndex)) {
            return key.root;
        }
        return this.state.notes[noteIndex] ? this.state.notes[noteIndex] : DEFAULT_NOTE;
    }

    renderScaleInputs(key: Key) {
        const numberOfNotes = key.scale.construction.length + 1;
        return (
            <div className="scaleQuestion__notes">
                {_range(numberOfNotes).map(noteIndex => {
                    return (
                        <NoteInput
                            key={`note-${noteIndex}`}
                            isRoot={_isRoot(noteIndex)}
                            noteIndex={noteIndex}
                            onChange={this._handleNoteChange}
                            note={this._getNote(key, noteIndex)}/>
                    );
                })}
                {/*
                <div className="scaleQuestion__intervalHint">hint</div>
                <div className="scaleQuestion__intervalHint">hint</div>
                <div className="scaleQuestion__intervalHint">hint</div>
                <div className="scaleQuestion__intervalHint">hint</div>
                <div className="scaleQuestion__intervalHint">hint</div>
                <div className="scaleQuestion__intervalHint">hint</div>
                <div className="scaleQuestion__intervalHint">hint</div>
                */}
            </div>
        );
    }

    renderHint(key: Key) {
        const scaleConstruction = applyModeToConstruction(key.scale, key.mode);
        const hints = [
            relativeIntervalsToRootIntervals(key.root, scaleConstruction).join(' '),
            relativeIntervalsToRootIntervals(key.root, scaleConstruction, AUGMENTED_DIMINISHED_INTERVALS).join(' '),
            scaleConstruction.join('-')
        ];
        return (
            <div className="scaleQuestion__hint">
                <h1>Hint</h1>
                <p>{hints[this.state.hintIndex]}</p>
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
                <p>{notes.map(Note.noteToString).join(', ')}</p>
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

function _updateNote(noteIndex: number, note: Note) {
    return (state: State) => {
        return {
            ...state,
            notes: {
                ...state.notes,
                [noteIndex]: note
            }
        };
    };
}

function _setAnswered() {
    return (state: State, props: Props) => {
        const actualNotes = keyToNotes(props.question.key);
        const root = actualNotes[0];
        const notes = Object.keys(state.notes).map(noteIndex => state.notes[noteIndex]);
        const answeredNotes = [root, ...notes, root];
        return {
            ...state,
            isAnswered: true,
            isCorrect: Note.areNoteArraysEqual(actualNotes, answeredNotes)
        };
    };
}

function _showHint() {
    return (state: State) => ({
        ...state,
        showHint: true,
        hintIndex: _getRandomInt(0, 2, state.hintIndex)
    });
}

function _range(length: number): number[] {
    return Array.from(Array(length).keys());
}

function _getRandomInt(min: number, max: number, exclude: number = min - 1): number {
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    if (randomInt === exclude) {
        return _getRandomInt(min, max, exclude);
    }
    return randomInt;
}

function _isRoot(noteIndex: number): boolean {
    return noteIndex === 0 || noteIndex === 7;
}
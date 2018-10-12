// @flow
import React, {Component} from 'react';
import type {ScaleQuestion} from '../../music/question';
import {Key} from '../../music/key';
import {
    ACCIDENTALS,
    createNote,
    FLAT_ACCIDENTAL,
    NATURAL_ACCIDENTAL,
    Note,
    PITCHES
} from '../../music/note';
import './ScaleQuestion.scss';
import {
    AUGMENTED_DIMINISHED_INTERVALS,
    relativeIntervalsToRootIntervals
} from '../../music/interval';
import NoteInput from '../NoteInput/NoteInput';
import Fretboard from 'react-fretboard';

type Props = {
    question: ScaleQuestion,
    onNextClick: () => void
}

type State = {
    notes: {[number]: Note},
    correctNotes: {[number]: boolean},
    isAnswered: boolean,
    isCorrect: boolean,
    showErrors: boolean,
    showHint: boolean,
    hintIndex: number,
    selectedNoteIndex: number
}

const DEFAULT_NOTE: Note = createNote(undefined, NATURAL_ACCIDENTAL);

const NBSP = '\u00A0';

export default class ScaleQuestionComponent extends Component<Props, State> {
    state = {
        notes: {},
        correctNotes: {},
        isAnswered: false,
        isCorrect: false,
        showErrors: false,
        showHint: false,
        selectedNoteIndex: 1
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
        const notes = this.props.question.key.toNotes();
        this.setState(_updateNote(noteIndex, note, notes[noteIndex].equals(note)));
    };

    _handleSwitchNote = (nextNoteIndex: number) => {
        const numberOfNotes = this.props.question.key.toNotes().length;
        const minNoteIndex = 1;
        const maxNoteIndex = numberOfNotes - 1;
        this.setState(_selectNote(_restrictNumber(nextNoteIndex, minNoteIndex, maxNoteIndex)));
    };

    _getNote(key: Key, noteIndex: number): Note {
        if (_isRoot(key, noteIndex)) {
            return key.root;
        }
        return this.state.notes[noteIndex] ? this.state.notes[noteIndex] : DEFAULT_NOTE;
    }

    renderScaleInputs(key: Key) {
        const numberOfNotes = key.scale.construction.length + 1;
        return (
            <div className="scaleQuestion__notes">
                {_range(numberOfNotes).map(noteIndex => {
                    const note = this._getNote(key, noteIndex);
                    const isRoot = _isRoot(key, noteIndex);
                    const showError = !isRoot && this.state.showErrors && !this.state.correctNotes[noteIndex];
                    const isSelected = this.state.selectedNoteIndex === noteIndex;
                    return (
                        <NoteInput
                            key={`note-${noteIndex}`}
                            isRoot={isRoot}
                            isSelected={isSelected}
                            noteIndex={noteIndex}
                            onChange={this._handleNoteChange}
                            onSwitchNote={this._handleSwitchNote}
                            note={note}
                            showError={showError}/>
                    );
                })}
            </div>
        );
    }

    renderFretboard(showNotes: boolean = true) {
        return (
            <div className="scaleQuestion__fretboard">
                <Fretboard
                    skinType="strings"
                    selectedNotes={this.props.question.key.toNotes().map(_noteToSimpleNotation)}
                    showSelectionLabels={showNotes}/>
            </div>
        );
    }

    renderHint(key: Key) {
        const scaleConstruction = key.modeConstruction;
        const hints = [
            relativeIntervalsToRootIntervals(key.root, scaleConstruction).join(' '),
            relativeIntervalsToRootIntervals(key.root, scaleConstruction, AUGMENTED_DIMINISHED_INTERVALS).join(' '),
            scaleConstruction.join('-')
        ];
        return (
            <div className="scaleQuestion__hint">
                <h1>Hint</h1>
                <p>{hints[this.state.hintIndex]}</p>
                {this.renderFretboard(false)}
            </div>
        );
    }

    renderSolution(key: Key) {
        const notes = key.toNotes();
        const modifier = this.state.isCorrect ? 'correct' : 'wrong';
        const className = `scaleQuestion__solution scaleQuestion__solution--${modifier}`;
        return (
            <div className={className}>
                <h1>{this.state.isCorrect ? 'Awesome!' : 'Wrong'}</h1>
                <p>{this.state.isCorrect
                    ? 'Your solution is correct!'
                    : `Sorry, but this is correct: ${notes.map(Note.noteToString).join(' ')}`}</p>
                {this.renderFretboard()}
            </div>
        );
    }

    renderActions() {
        const answerDisabled = !this._canBeAnswered && !this.state.isAnswered;
        const hintDisabled = this.state.isAnswered;
        return (
            <div className="scaleQuestion__actions">
                <button onClick={this._handleAnswer} disabled={answerDisabled}>Answer</button>
                <button onClick={this._handleHintClick} disabled={hintDisabled}>Hint</button>
                <button onClick={this._handleNextClick}>Next</button>
            </div>
        );
    }

    render() {
        const key = this.props.question.key;
        const description = key.description;
        console.log({description})
        const modeName = description.modeName ? ` ${description.modeName}` : '';
        const scaleName = `${description.rootNote} ${description.scaleName}${modeName}`;
        const alternativeModeName = description.alternativeModeName ? description.alternativeModeName : NBSP;
        return (
            <div className="scaleQuestion">
                <div className="scaleQuestion__question">
                    <p>Complete this scale:</p>
                    <h1 className="scaleQuestion__scaleName">{scaleName}</h1>
                    {<h2 className="scaleQuestion__alternativeModeName">{alternativeModeName}</h2>}
                </div>
                <div className="scaleQuestion__answer">
                    {this.renderScaleInputs(key)}
                    {this.renderActions()}
                </div>
                {this.state.showHint && this.renderHint(key)}
                {this.state.isAnswered && this.renderSolution(key)}
            </div>
        );
    }
}

function _updateNote(noteIndex: number, note: Note, isCorrect: boolean) {
    return (state: State) => {
        return {
            ...state,
            notes: {
                ...state.notes,
                [noteIndex]: note
            },
            correctNotes: {
                ...state.correctNotes,
                [noteIndex]: isCorrect
            },
            showErrors: false
        };
    };
}

function _setAnswered() {
    return (state: State, props: Props) => {
        const actualNotes = props.question.key.toNotes();
        const root = actualNotes[0];
        const notes = Object.keys(state.notes).map(noteIndex => state.notes[noteIndex]);
        const answeredNotes = [root, ...notes, root];
        return {
            ...state,
            isAnswered: true,
            showErrors: true,
            showHint: false,
            isCorrect: Note.areNoteArraysEqual(actualNotes, answeredNotes)
        };
    };
}

function _showHint() {
    return (state: State) => ({
        ...state,
        showHint: true,
        isCorrect: false,
        hintIndex: _getRandomInt(0, 2, state.hintIndex)
    });
}

function _selectNote(selectedNoteIndex: number) {
    return (state: State) => ({
        ...state,
        selectedNoteIndex
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

function _isRoot(key: Key, noteIndex: number): boolean {
    return noteIndex === 0 || noteIndex === key.scale.construction.length;
}

function _noteToSimpleNotation(note: Note): string {
    const accidental = note.accidental === NATURAL_ACCIDENTAL
        ? ''
        : note.accidental === FLAT_ACCIDENTAL
            ? 'b' : '#';
    return note.pitch + accidental;
}

function _restrictNumber(value: number, min: number, max: number) {
    return ((value - min) % (max - min) + max - min) % (max - min) + min;
}
// @flow
import React from 'react';
import type {
    Accidental,
    Note,
    Pitch
} from '../../music/note';
import {
    ACCIDENTALS,
    createNote,
    FLAT_ACCIDENTAL,
    PITCHES,
    SHARP_ACCIDENTAL
} from '../../music/note';
import AccidentalInput from '../AccidentalInput/AccidentalInput';
import classNames from 'classnames';
import './NoteInput.scss';

type NoteInputChangeHandler = (noteIndex: number, note: Note) => void;
type SwitchNoteHandler = (nextNoteIndex: number) => void;

type Props = {
    isDisabled: boolean,
    isHighlighted: boolean,
    isSelected: boolean,
    note: Note,
    noteIndex: number,
    onChange: NoteInputChangeHandler,
    onSwitchNote: SwitchNoteHandler,
    showError: boolean
};

const KEY_CODE_ARROW_LEFT = 37;
const KEY_CODE_ARROW_UP = 38;
const KEY_CODE_ARROW_RIGHT = 39;
const KEY_CODE_ARROW_DOWN = 40;

export default function NoteInput(props: Props) {
    const {isDisabled, isSelected, noteIndex, onChange, onSwitchNote, note} = props;
    const className = classNames({
        'note': true,
        'note--error': props.showError,
        'note--highlighted': props.isHighlighted
    });
    return (
        <div className={className} key={`note-${noteIndex}${isSelected ? '-selected' : ''}`}>
            <div className="note__pitch">
                <input
                    type="text"
                    name={`note-${noteIndex}-pitch`}
                    value={note.pitch || ''}
                    disabled={isDisabled}
                    tabIndex={noteIndex}
                    autoFocus={isSelected}
                    onFocus={(e) => _placeCaretAtEnd(e.target)}
                    onChange={_createHandlePitchChange(noteIndex, note.accidental, onChange)}
                    onKeyDown={_createHandlePitchKeyDown(noteIndex, note, onChange, onSwitchNote)}
                    maxLength={2}
                />
            </div>
            <div className="note__accidentals">
                {[...ACCIDENTALS].map((accidental, accidentalIndex) =>
                    <AccidentalInput
                        key={`accidental${accidentalIndex}`}
                        accidental={accidental}
                        accidentalIndex={accidentalIndex}
                        isCurrentAccidental={accidental === note.accidental}
                        isDisabled={isDisabled}
                        noteIndex={noteIndex}
                        onChange={_createHandleAccidentalChange(noteIndex, note.pitch, accidental, onChange)}/>
                )}
            </div>
        </div>
    );
}

function _createHandlePitchChange(noteIndex: number, accidental: Accidental, onChange: NoteInputChangeHandler) {
    return (e: any) => {
        e.preventDefault();
        const pitchCandidate = e.target.value
            .toUpperCase()
            .substr(-1); // maxLength is 2 which allows multiple pitches to be entered but we use only the last.
        const note = createNote(
            _toPitch(pitchCandidate),
            accidental
        );
        onChange(noteIndex, note);
    };
}

function _createHandlePitchKeyDown(noteIndex: number,
    note: Note,
    onChange: NoteInputChangeHandler,
    onSwitchNote: SwitchNoteHandler) {
    return (e: any) => {
        const isArrowDown = e.keyCode === KEY_CODE_ARROW_DOWN;
        const isArrowUp = e.keyCode === KEY_CODE_ARROW_UP;
        const isArrowLeft = e.keyCode === KEY_CODE_ARROW_LEFT;
        const isArrowRight = e.keyCode === KEY_CODE_ARROW_RIGHT;
        if (isArrowDown || isArrowUp) {
            e.preventDefault();
            const nextNote = note
                ? isArrowDown ? note.getLoweredNote() : note.getRaisedNote()
                : isArrowDown ? createNote(note.pitch, FLAT_ACCIDENTAL) : createNote(note.pitch, SHARP_ACCIDENTAL);
            onChange(noteIndex, nextNote);
        } else if (isArrowLeft || isArrowRight) {
            const offset = isArrowRight ? 1 : -1;
            onSwitchNote(noteIndex + offset);
        } else {
            e.target.value = _toPitch(e.key.toUpperCase());
        }
    };
}

function _createHandleAccidentalChange(noteIndex: number,
    pitch: Pitch,
    accidental: Accidental,
    onChange: NoteInputChangeHandler) {
    return () => {
        const note = createNote(
            pitch,
            accidental
        );
        onChange(noteIndex, note);
    };
}

function _toPitch(value: string): Pitch | '' {
    const pitchCandidate: any = value.toUpperCase();
    return PITCHES.includes(pitchCandidate)
        ? pitchCandidate
        : '';
}

function _placeCaretAtEnd(el: any) {
    if (typeof el.selectionStart == 'number') {
        el.selectionStart = el.selectionEnd = el.value.length + 1;
    } else if (typeof el.createTextRange !== 'undefined') {
        el.focus();
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
}
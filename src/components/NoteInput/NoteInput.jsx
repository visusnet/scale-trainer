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
    PITCHES
} from '../../music/note';
import AccidentalInput from '../AccidentalInput/AccidentalInput';

type NoteInputChangeHandler = (noteIndex: number, note: Note) => void;

type Props = {
    isRoot: boolean,
    note: Note,
    noteIndex: number,
    onChange: NoteInputChangeHandler
};

export default function NoteInput(props: Props) {
    const {isRoot, noteIndex, onChange, note} = props;
    return (
        <div className="scaleQuestion__note" key={`note-${noteIndex}`}>
            <div className="scaleQuestion__pitch">
                <input
                    type="text"
                    name={`note-${noteIndex}-pitch`}
                    value={note.pitch || ''}
                    disabled={isRoot}
                    tabIndex={noteIndex}
                    autoFocus={noteIndex === 1}
                    onChange={_createHandlePitchChange(noteIndex, note.accidental, onChange)}
                    maxLength={1}
                />
            </div>
            <div className="scaleQuestion__accidentals">
                {ACCIDENTALS.map((accidental: Accidental, accidentalIndex: number) => (
                    <AccidentalInput
                        key={`note-${noteIndex}-accidental-${accidentalIndex}`}
                        accidental={accidental}
                        accidentalIndex={accidentalIndex}
                        isCurrentAccidental={note.accidental === accidental}
                        isRoot={isRoot}
                        noteIndex={noteIndex}
                        onChange={_createHandleAccidentalChange(noteIndex, note.pitch, accidental, onChange)}/>
                ))}
            </div>
        </div>
    );
}

function _createHandlePitchChange(noteIndex: number, accidental: Accidental, onChange: NoteInputChangeHandler) {
    return (e: any) => {
        e.preventDefault();
        const note = createNote(
            _toPitch(e.target.value.toUpperCase()),
            accidental
        );
        onChange(noteIndex, note);
    };
}

function _createHandleAccidentalChange(noteIndex: number,
    pitch: Pitch,
    accidental: Accidental,
    onChange: NoteInputChangeHandler) {
    return () => {
        const note = createNote(
            accidental,
            pitch
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
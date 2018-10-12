// @flow
import React from 'react';
import type {Accidental} from '../../music/note';

type AccidentalChangeHandler = (noteIndex: number, accidental: Accidental) => void;

type Props = {
    accidental: Accidental,
    accidentalIndex: number,
    isCurrentAccidental: boolean,
    isRoot: boolean,
    noteIndex: number,
    onChange: AccidentalChangeHandler
};

export default function AccidentalInput(props: Props) {
    const {accidental, accidentalIndex, isCurrentAccidental, isRoot, noteIndex, onChange} = props;
    const accidentalKey = `note-${noteIndex}-accidental-${accidentalIndex}`;
    return (
        <div className="scaleQuestion__accidental">
            <label
                htmlFor={accidentalKey}>
                <input
                    type="radio"
                    id={accidentalKey}
                    name={accidentalKey}
                    value={accidental}
                    checked={isCurrentAccidental}
                    onChange={_createHandleAccidentalChange(noteIndex, accidental, onChange)}
                    disabled={isRoot}
                />
                <span className="scaleQuestion__accidentalValue">{accidental}</span>
            </label>
        </div>
    );
}

function _createHandleAccidentalChange(noteIndex: number, accidental: Accidental, onChange: AccidentalChangeHandler) {
    return () => {
        onChange(noteIndex, accidental);
    };
}
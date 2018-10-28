// @flow
import React from 'react';
import type {Accidental} from '../../music/note';
import classNames from 'classnames';

type AccidentalChangeHandler = (noteIndex: number, accidental: Accidental) => void;

type Props = {
    accidental: Accidental,
    accidentalIndex: number,
    isCurrentAccidental: boolean,
    isDisabled: boolean,
    noteIndex: number,
    onChange: AccidentalChangeHandler
};

const noop = () => {};

export default function AccidentalInput({accidental, accidentalIndex, isCurrentAccidental, isDisabled, noteIndex, onChange}: Props) {
    const className = classNames({
        'note__accidental': true,
        'note__accidental--selected': isCurrentAccidental,
        'note__accidental--disabled': isDisabled
    });
    return (
        <div
            className={className}
            onClick={isDisabled ? noop : _createHandleAccidentalChange(noteIndex, accidental, onChange)}>
            {accidental}
        </div>
    );
}

function _createHandleAccidentalChange(noteIndex: number, accidental: Accidental, onChange: AccidentalChangeHandler) {
    return () => {
        onChange(noteIndex, accidental);
    };
}
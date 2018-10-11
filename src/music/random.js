import type {Question} from './question';
import {
    ACCIDENTALS,
    createNote,
    FLAT_ACCIDENTAL,
    NATURAL_ACCIDENTAL,
    Note,
    PITCHES,
    SHARP_ACCIDENTAL
} from './note';
import type {Mode} from './mode';
import {Key} from './key';
import type {ScaleName} from './scale';
import {
    getScaleByName,
    Scale
} from './scale';

export type ScaleOptions = {
    [ScaleName]: boolean
};

export const IGNORED_NOTES: Note = [
    createNote('B', SHARP_ACCIDENTAL),
    createNote('C', FLAT_ACCIDENTAL),
    createNote('E', SHARP_ACCIDENTAL),
    createNote('F', FLAT_ACCIDENTAL)
];

export function getRandomKey(includeAccidentals: boolean, includeModes: boolean, scaleOptions: ScaleOptions): Key {
    const scale = getRandomScale(scaleOptions);
    const mode = scale.modes.length > 0
        ? includeModes ? getRandomMode(scale) : scale.modes[0]
        : undefined;
    return new Key(
        getRandomNote(includeAccidentals),
        scale,
        mode
    );
}

export function getRandomScale(scaleOptions: ScaleOptions): Scale {
    const scales = _scaleOptionsToScaleNames(scaleOptions).map(getScaleByName);
    return getRandomArrayElement(scales);
}

export function getRandomMode(scale: Scale): Mode {
    return getRandomArrayElement(scale.modes);
}

export function getRandomQuestion(includeAccidentals: boolean,
    includeModes: boolean,
    scaleOptions: ScaleOptions): Question {
    const key = getRandomKey(
        includeAccidentals,
        includeModes,
        scaleOptions
    );
    return {
        type: 'scale',
        key
    };
}

export function getRandomArrayElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

export function isIgnoredNote(note: Note): boolean {
    return !IGNORED_NOTES.map((ignoredNote: Note) => ignoredNote.equals(note)).some(comparison => !comparison);
}

export function getRandomNote(includeAccidentals: boolean): Note {
    const note = createNote(
        getRandomArrayElement(PITCHES),
        includeAccidentals ? getRandomArrayElement(ACCIDENTALS) : NATURAL_ACCIDENTAL
    );
    if (isIgnoredNote(note)) {
        return getRandomNote();
    }
    return note;
}

function _scaleOptionsToScaleNames(scaleOptions: ScaleOptions): ScaleName[] {
    return Object.keys(scaleOptions).reduce((scaleNames: ScaleName[], scaleName: ScaleName) => {
        if (scaleOptions[scaleName]) {
            return [
                ...scaleNames,
                scaleName
            ];
        }
        return scaleNames;
    }, []);
}
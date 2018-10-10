import type {Question} from './question';
import {
    ACCIDENTALS,
    areNotesEqual,
    createNote,
    FLAT_ACCIDENTAL,
    Note,
    PITCHES,
    SHARP_ACCIDENTAL
} from './note';
import type {
    Key,
    Mode,
    Scale
} from './key';
import {
    CHURCH_SCALES,
    HARMONIC_MINOR_SCALE,
    MELODIC_MINOR_SCALE
} from './key';

export const IGNORED_NOTES: Note = [
    createNote('B', SHARP_ACCIDENTAL),
    createNote('C', FLAT_ACCIDENTAL),
    createNote('E', SHARP_ACCIDENTAL),
    createNote('F', FLAT_ACCIDENTAL)
];

export function getRandomKey(includeModes: boolean, includeHarmonicMinor: boolean, includeMelodicMinor: boolean): Key {
    const scale = getRandomScale(includeHarmonicMinor, includeMelodicMinor);
    const mode = includeModes ? getRandomMode(scale) : scale.modes[0];
    return {
        root: getRandomNote(),
        scale,
        mode
    };
}

export function getRandomScale(includeHarmonicMinor: boolean, includeMelodicMinor: boolean): Scale {
    let scales = CHURCH_SCALES;
    if (includeHarmonicMinor) {
        scales = [...scales, HARMONIC_MINOR_SCALE];
    }
    if (includeMelodicMinor) {
        scales = [...scales, MELODIC_MINOR_SCALE];
    }
    return getRandomArrayElement(scales);
}

export function getRandomMode(scale: Scale): Mode {
    return getRandomArrayElement(scale.modes);
}

export function getRandomQuestion(includeModes: boolean,
    includeHarmonicMinor: boolean,
    includeMelodicMinor: boolean): Question {
    const key = getRandomKey(includeModes, includeHarmonicMinor, includeMelodicMinor);
    return {
        type: 'scale',
        key
    };
}

export function getRandomArrayElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

export function isIgnoredNote(n: Note): boolean {
    return !IGNORED_NOTES.map((ignoredNote: Note) => areNotesEqual(ignoredNote, n)).some(comparison => !comparison);
}

export function getRandomNote(): Note {
    const note = {
        pitch: getRandomArrayElement(PITCHES),
        accidental: getRandomArrayElement(ACCIDENTALS)
    };
    if (isIgnoredNote(note)) {
        return getRandomNote();
    }
    return note;
}
import {
    createNote,
    FLAT_ACCIDENTAL,
    NATURAL_ACCIDENTAL,
    Note,
    SHARP_ACCIDENTAL
} from './note';
import type {Key} from './key';

export type MajorMinorPerfectInterval =
    'P1' // perfect unison
    | 'm2' // minor second
    | 'M2' // major second
    | 'm3' // minor third
    | 'M3' // major third
    | 'P4' // perfect fourth
    | 'P5' // perfect fifth
    | 'm6' // minor sixth
    | 'M6' // major sixth
    | 'm7' // minor seventh
    | 'M7' // major seventh
    | 'P8'; // perfect octave

export type AugmentedDiminishedInterval =
    'd2' // diminished second
    | 'A1' // augmented unison
    | 'd3' // diminished third
    | 'A2' // augmented second
    | 'd4' // diminished fourth
    | 'A3' // augmented third
    | 'd5' // diminished fifth (=A4)
    | 'A4' // augmented forth (=d5)
    | 'd6' // diminished sixth
    | 'A5' // augmented fifth
    | 'd7' // diminished seventh
    | 'A6' // augmented sixth
    | 'd8' // diminished octave
    | 'A7';

export type AlternativeInterval =
    'semitone'
    | 'half tone'
    | 'half step'
    | 'tone'
    | 'whole tone'
    | 'whole step'
    | 'tritone';

export type StepInterval = 'H' | 'W';

export type Interval = MajorMinorPerfectInterval | AugmentedDiminishedInterval | AlternativeInterval | StepInterval;

export const MAJOR_MINOR_PERFECT_INTERVALS: MajorMinorPerfectInterval[] = [
    'P1',
    'm2',
    'M2',
    'm3',
    'M3',
    'P4',
    'P5',
    'm6',
    'M6',
    'm7',
    'M7',
    'P8'
];

export const AUGMENTED_DIMINISHED_INTERVALS: AugmentedDiminishedInterval[] = [
    'd2',
    'A1',
    'd3',
    'A2',
    'd4',
    'A3',
    'd5',
    'A4',
    'd6',
    'A5',
    'd7',
    'A6',
    'd8',
    'A7'
];

export const SEMITONE: AlternativeInterval = 'semitone';
export const WHOLE_TONE: AlternativeInterval = 'whole tone';

export const WHOLE_STEP: StepInterval = 'W';
export const HALF_STEP: StepInterval = 'H';

export const AUGMENTED_SECOND: AugmentedDiminishedInterval = 'A2';

export const INTERVAL_SEMITONE_MAP: {[Interval]: number} = {
    'P1': 0,
    'd2': 0,

    'm2': 1,
    'A1': 1,
    'semitone': 1,
    'half tone': 1,
    'half step': 1,
    'H': 1,

    'M2': 2,
    'd3': 2,
    'tone': 2,
    'whole tone': 2,
    'whole step': 2,
    'W': 2,

    'm3': 3,
    'A2': 3,

    'M3': 4,
    'd4': 4,

    'P4': 5,
    'A3': 5,

    'd5': 6,
    'A4': 6,
    'tritone': 6,

    'P5': 7,
    'd6': 7,

    'm6': 8,
    'A5': 8,

    'M6': 9,
    'd7': 9,

    'm7': 10,
    'A6': 10,

    'M7': 11,
    'd8': 11,

    'P8': 12,
    'A7': 12
};

const NEXT_SEMITONE_MAP = {
    'A': {
        [FLAT_ACCIDENTAL]: createNote('A'),
        [NATURAL_ACCIDENTAL]: createNote('A', SHARP_ACCIDENTAL),
        [SHARP_ACCIDENTAL]: createNote('B')
    },
    'B': {
        [FLAT_ACCIDENTAL]: createNote('B'),
        [NATURAL_ACCIDENTAL]: createNote('C'),
        [SHARP_ACCIDENTAL]: createNote('C', SHARP_ACCIDENTAL)
    },
    'C': {
        [FLAT_ACCIDENTAL]: createNote('C'),
        [NATURAL_ACCIDENTAL]: createNote('C', SHARP_ACCIDENTAL),
        [SHARP_ACCIDENTAL]: createNote('D')
    },
    'D': {
        [FLAT_ACCIDENTAL]: createNote('D'),
        [NATURAL_ACCIDENTAL]: createNote('D', SHARP_ACCIDENTAL),
        [SHARP_ACCIDENTAL]: createNote('E')
    },
    'E': {
        [FLAT_ACCIDENTAL]: createNote('E'),
        [NATURAL_ACCIDENTAL]: createNote('F'),
        [SHARP_ACCIDENTAL]: createNote('F', SHARP_ACCIDENTAL)
    },
    'F': {
        [FLAT_ACCIDENTAL]: createNote('F'),
        [NATURAL_ACCIDENTAL]: createNote('F', SHARP_ACCIDENTAL),
        [SHARP_ACCIDENTAL]: createNote('G')
    },
    'G': {
        [FLAT_ACCIDENTAL]: createNote('G'),
        [NATURAL_ACCIDENTAL]: createNote('G', SHARP_ACCIDENTAL),
        [SHARP_ACCIDENTAL]: createNote('A')
    }
};

export function addInterval(n: Note, interval: Interval | number): Note {
    const numberOfSemitones = typeof interval === 'number'
        ? interval
        : INTERVAL_SEMITONE_MAP[interval];

    let augmentedNote = n;
    for (let augmentedSemitones = 0; augmentedSemitones < numberOfSemitones; augmentedSemitones++) {
        augmentedNote = NEXT_SEMITONE_MAP[augmentedNote.pitch][augmentedNote.accidental];
    }

    return augmentedNote;
}

export function relativeIntervalsToRootIntervals(root: Key,
    relativeIntervals: Interval[],
    intervalNames: Interval[] = MAJOR_MINOR_PERFECT_INTERVALS): Interval[] {
    let semitonesToRoot = -1;
    return relativeIntervals.reduce((intervals: Interval[], relativeInterval: Interval) => {
        semitonesToRoot += INTERVAL_SEMITONE_MAP[relativeInterval];
        return [...intervals, intervalNames[semitonesToRoot]];
    }, []);
}
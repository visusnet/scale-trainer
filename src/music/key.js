import type {Note} from './note';
import {noteToString} from './note';
import type {Interval} from './interval';
import {
    addInterval,
    AUGMENTED_SECOND,
    HALF_STEP,
    WHOLE_STEP
} from './interval';

export type ScaleConstruction = Interval[];
export type ChurchMode = 'ionian' | 'dorian' | 'phrygian' | 'lydian' | 'mixolydian' | 'aeolian' | 'locrian';
export type HarmonicMinorMode =
    'harmonic minor'
    | 'locrian ♯6'
    | 'ionian ♯5'
    | 'dorian ♯4'
    | 'phrygian dominant'
    | 'lydian ♯2'
    | 'superlocrian';
export type MelodicMinorMode =
    'melodic minor'
    | 'dorian ♭2'
    | 'lydian ♯5'
    | 'lydian ♭7'
    | 'mixolydian ♭6'
    | 'locrian ♯2'
    | 'superlocrian';
export type Mode = ChurchMode | HarmonicMinorMode | MelodicMinorMode;
export type Scale = {
    name: 'major' | 'minor' | 'harmonic minor',
    construction: ScaleConstruction,
    modes: Mode[]
};
export type Key = {
    root: Note,
    scale: Scale,
    mode: Mode
};
export const MAJOR_CONSTRUCTION: ScaleConstruction = [
    WHOLE_STEP,
    WHOLE_STEP,
    HALF_STEP,
    WHOLE_STEP,
    WHOLE_STEP,
    WHOLE_STEP,
    HALF_STEP
];
export const MINOR_CONSTRUCTION: ScaleConstruction = [
    WHOLE_STEP,
    HALF_STEP,
    WHOLE_STEP,
    WHOLE_STEP,
    HALF_STEP,
    WHOLE_STEP,
    WHOLE_STEP
];
export const HARMONIC_MINOR_CONSTRUCTION: ScaleConstruction = [
    WHOLE_STEP,
    HALF_STEP,
    WHOLE_STEP,
    WHOLE_STEP,
    HALF_STEP,
    AUGMENTED_SECOND,
    HALF_STEP
];
export const MELODIC_MINOR_CONSTRUCTION: ScaleConstruction = [
    WHOLE_STEP,
    HALF_STEP,
    WHOLE_STEP,
    WHOLE_STEP,
    WHOLE_STEP,
    WHOLE_STEP,
    HALF_STEP
];

export const CHURCH_MODES: ChurchMode[] = ['ionian',
    'dorian',
    'phrygian',
    'lydian',
    'mixolydian',
    'aeolian',
    'locrian'];
export const HARMONIC_MINOR_MODES: HarmonicMinorMode[] = [
    'harmonic minor',
    'locrian ♯6',
    'ionian ♯5',
    'dorian ♯4',
    'phrygian dominant',
    'lydian ♯2',
    'ultralocrian'
];
export const MELODIC_MINOR_MODES: MelodicMinorMode[] = [
    'melodic minor',
    'dorian ♭2',
    'lydian ♯5',
    'lydian ♭7',
    'mixolydian ♭6',
    'locrian ♯2',
    'superlocrian'
];

export const HARMONIC_MINOR_SCALE = {
    name: 'harmonic minor',
    construction: HARMONIC_MINOR_CONSTRUCTION,
    modes: HARMONIC_MINOR_MODES
};
export const MELODIC_MINOR_SCALE = {
    name: 'melodic minor',
    construction: MELODIC_MINOR_CONSTRUCTION,
    modes: MELODIC_MINOR_MODES
};
export const CHURCH_SCALES: Scale[] = [
    {name: 'major', construction: MAJOR_CONSTRUCTION, modes: CHURCH_MODES},
    {name: 'minor', construction: MINOR_CONSTRUCTION, modes: CHURCH_MODES},
];
export const ALL_SCALES: Scale[] = [
    CHURCH_SCALES,
    HARMONIC_MINOR_SCALE,
    MELODIC_MINOR_SCALE
];

export function modeToString(mode: Mode, scale: Scale): string {
    let scaleIndex = scale.modes.indexOf(mode);
    return scaleIndex === 0 ? '' : `${mode} (mode ${scaleIndex + 1} of ${scale.name})`;
}

export function scaleToString(scale: Scale): string {
    return scale.name;
}

export function keyToString(key: Key): string {
    return `${noteToString(key.root)} ${scaleToString(key.scale)} ${modeToString(key.mode, key.scale)}`.trim();
}

export function applyModeToConstruction(scale: Scale, mode: Mode): ScaleConstruction {
    return _rotateArray(scale.construction, scale.modes.indexOf(mode));
}

export function keyToNotes(key: Key): Note[] {
    return applyModeToConstruction(key.scale, key.mode).reduce((notes: Note[], interval: Interval) => {
        const previousNote = notes[notes.length - 1];
        return [...notes, addInterval(previousNote, interval)];
    }, [key.root]);
}

function _rotateArray<T>(array: T[], rotateByOffset: number) {
    const length = array.length;
    return array.map((element: T, index: number) => array[(((rotateByOffset + index) % length) + length) % length]);
}

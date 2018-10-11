// @flow

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
export type ChurchMode = 'ionian' | 'dorian' | 'phrygian' | 'lydian' | 'mixolydian' | 'aeolian' | 'locrian';
export type Mode = ChurchMode | HarmonicMinorMode | MelodicMinorMode;

export const CHURCH_MODES: ChurchMode[] = [
    'ionian',
    'dorian',
    'phrygian',
    'lydian',
    'mixolydian',
    'aeolian',
    'locrian'
];

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
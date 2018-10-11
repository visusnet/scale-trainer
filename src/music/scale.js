// @flow
import type {Interval} from './interval';
import {
    AUGMENTED_SECOND,
    HALF_STEP,
    WHOLE_STEP
} from './interval';
import type {Mode} from './mode';
import {
    CHURCH_MODES,
    HARMONIC_MINOR_MODES,
    MELODIC_MINOR_MODES
} from './mode';

export type ScaleConstruction = Interval[];
export type ScaleName = 'major' | 'minor' | 'harmonic minor';

const NO_MODES: Mode[] = [];

export class Scale {
    name: ScaleName;
    construction: ScaleConstruction;
    modes: Mode[];

    constructor(name: ScaleName, construction: ScaleConstruction, modes: Mode[] = NO_MODES) {
        this.name = name;
        this.construction = construction;
        this.modes = modes;
    }

    toString() {
        return this.name;
    }
}

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

export const CHROMATIC_CONSTRUCTION: ScaleConstruction = [
    HALF_STEP,
    HALF_STEP,
    HALF_STEP,
    HALF_STEP,
    HALF_STEP,
    HALF_STEP,
    HALF_STEP,
    HALF_STEP,
    HALF_STEP,
    HALF_STEP,
    HALF_STEP,
    HALF_STEP
];

export const AUGMENTED_CONSTRUCTION: ScaleConstruction = [
    AUGMENTED_SECOND,
    HALF_STEP,
    AUGMENTED_SECOND,
    HALF_STEP,
    AUGMENTED_SECOND,
    HALF_STEP
];

export const MAJOR_BLUES_CONSTRUCTION: ScaleConstruction = [
    WHOLE_STEP,
    HALF_STEP,
    HALF_STEP,
    AUGMENTED_SECOND,
    WHOLE_STEP,
    AUGMENTED_SECOND
];

export const MINOR_BLUES_CONSTRUCTION: ScaleConstruction = [
    AUGMENTED_SECOND,
    WHOLE_STEP,
    HALF_STEP,
    HALF_STEP,
    AUGMENTED_SECOND,
    HALF_STEP
];

export const MAJOR_PENTATONIC_CONSTRUCTION: ScaleConstruction = [
    WHOLE_STEP,
    WHOLE_STEP,
    AUGMENTED_SECOND,
    WHOLE_STEP,
    AUGMENTED_SECOND
];

export const MINOR_PENTATONIC_CONSTRUCTION: ScaleConstruction = [
    AUGMENTED_SECOND,
    WHOLE_STEP,
    WHOLE_STEP,
    AUGMENTED_SECOND,
    WHOLE_STEP
];

export const HARMONIC_MINOR_SCALE = new Scale('harmonic minor', HARMONIC_MINOR_CONSTRUCTION, HARMONIC_MINOR_MODES);
export const MELODIC_MINOR_SCALE = new Scale('melodic minor', MELODIC_MINOR_CONSTRUCTION, MELODIC_MINOR_MODES);
export const MAJOR_SCALE = new Scale('major', MAJOR_CONSTRUCTION, CHURCH_MODES);
export const MINOR_SCALE = new Scale('minor', MINOR_CONSTRUCTION, CHURCH_MODES);
export const CHROMATIC_SCALE = new Scale('chromatic', CHROMATIC_CONSTRUCTION);
export const AUGMENTED_SCALE = new Scale('augmented', AUGMENTED_CONSTRUCTION);
export const MAJOR_BLUES_SCALE = new Scale('major blues', MAJOR_BLUES_CONSTRUCTION);
export const MINOR_BLUES_SCALE = new Scale('minor blues', MINOR_BLUES_CONSTRUCTION);
export const MAJOR_PENTATONIC_SCALE = new Scale('major pentatonic', MAJOR_PENTATONIC_CONSTRUCTION);
export const MINOR_PENTATONIC_SCALE = new Scale('minor pentatonic', MINOR_PENTATONIC_CONSTRUCTION);

export const SCALES: Scale[] = [
    MAJOR_SCALE,
    MINOR_SCALE,
    HARMONIC_MINOR_SCALE,
    MELODIC_MINOR_SCALE,
    CHROMATIC_SCALE,
    AUGMENTED_SCALE,
    MAJOR_BLUES_SCALE,
    MINOR_BLUES_SCALE,
    MAJOR_PENTATONIC_SCALE,
    MINOR_PENTATONIC_SCALE
];

export function getScaleByName(scaleName: ScaleName) {
    return SCALES.find(scale => scale.name === scaleName);
}
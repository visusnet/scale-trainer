// @flow

export type Pitch = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
export type Accidental = '♯' | '♭' | '♮';
export type Note = {
    pitch: Pitch,
    accidental: Accidental
}

export const PITCHES: Pitch[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
export const SHARP_ACCIDENTAL: Accidental = '♯';
export const NATURAL_ACCIDENTAL: Accidental = '♮';
export const FLAT_ACCIDENTAL: Accidental = '♭';
export const ACCIDENTALS: Accidental[] = [FLAT_ACCIDENTAL, SHARP_ACCIDENTAL, NATURAL_ACCIDENTAL];

export function accidentalToString(accidental: Accidental): string {
    return accidental === NATURAL_ACCIDENTAL ? '' : accidental;
}

export function noteToString(note: Note): string {
    return note.pitch + accidentalToString(note.accidental);
}

export function note(pitch: Pitch, accidental: Accidental = NATURAL_ACCIDENTAL): Note {
    return {
        pitch,
        accidental
    };
}

export function arePitchesEqual(note1: Note, note2: Note): boolean {
    return note1.pitch === note2.pitch;
}

export function areAccidentalsEqual(note1: Note, note2: Note): boolean {
    return note1.accidental === note2.accidental;
}

export function areNotesEqual(note1: Note, note2: Note): boolean {
    return arePitchesEqual(note1, note2) && areAccidentalsEqual(note1, note2);
}

export function areNoteArraysEqual(notes1: Note[], notes2: Note[]): boolean {
    if (notes1.length !== notes2.length) {
        return false;
    }
    return !notes1.map((note1: Note, noteIndex: number) => {
        const note2 = notes2[noteIndex];
        return areNotesEqual(note1, note2);
    }).some(comparison => !comparison);
}
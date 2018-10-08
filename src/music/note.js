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

export function note(pitch: Pitch, accidental: ?Accidental): Note {
    return {
        pitch,
        accidental: accidental ? accidental : NATURAL_ACCIDENTAL
    };
}

export function arePitchesEqual(note1: Note, note2: Note): boolean {
    return note1.pitch === note2.pitch;
}

export function areAccidentalsEqual(note1: Note, note2: Note): boolean {
    return note1.accidental === note2.accidental;
}

export function previousPitch(pitch: Pitch): Pitch {
    const previousPitchIndex = (PITCHES.indexOf(pitch) + PITCHES.length - 1) % PITCHES.length;
    return PITCHES[previousPitchIndex];
}

export function nextPitch(pitch: Pitch): Pitch {
    const nextPitchIndex = (PITCHES.indexOf(pitch) + 1) % PITCHES.length;
    return PITCHES[nextPitchIndex];
}

export function normalizeAccidentals(note: Note, preferredAccidental: Accidental = SHARP_ACCIDENTAL): Note {
    if (preferredAccidental === FLAT_ACCIDENTAL) {
        if (note.accidental === SHARP_ACCIDENTAL) {
            return {
                pitch: nextPitch(note.pitch),
                accidental: note.pitch === 'B' || note.pitch === 'E' ? NATURAL_ACCIDENTAL : FLAT_ACCIDENTAL
            };
        } else if (note.accidental === FLAT_ACCIDENTAL) {
            if (note.pitch === 'C' || note.pitch === 'F') {
                return {
                    pitch: previousPitch(note.pitch),
                    accidental: NATURAL_ACCIDENTAL
                };
            }
        }
    } else {
        if (note.accidental === FLAT_ACCIDENTAL) {
            return {
                pitch: previousPitch(note.pitch),
                accidental: note.pitch === 'C' || note.pitch === 'F' ? NATURAL_ACCIDENTAL : SHARP_ACCIDENTAL
            };
        } else if (note.accidental === SHARP_ACCIDENTAL) {
            if (note.pitch === 'B' || note.pitch === 'E') {
                return {
                    pitch: nextPitch(note.pitch),
                    accidental: NATURAL_ACCIDENTAL
                };
            }
        }
    }
    return note;
}

export function areNotesEqual(note1: Note, note2: Note): boolean {
    const onlySharpNote1 = normalizeAccidentals(note1);
    const onlySharpNote2 = normalizeAccidentals(note2);
    return arePitchesEqual(onlySharpNote1, onlySharpNote2) && areAccidentalsEqual(onlySharpNote1, onlySharpNote2);
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
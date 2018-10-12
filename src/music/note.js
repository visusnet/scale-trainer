// @flow
export type Pitch = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
export type Accidental = '♯' | '♭' | '♮';

export const PITCHES: Pitch[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
export const SHARP_ACCIDENTAL: Accidental = '♯';
export const NATURAL_ACCIDENTAL: Accidental = '♮';
export const FLAT_ACCIDENTAL: Accidental = '♭';
export const ACCIDENTALS: Accidental[] = [SHARP_ACCIDENTAL, NATURAL_ACCIDENTAL, FLAT_ACCIDENTAL];

export class Note {
    pitch: ?Pitch;
    accidental: Accidental;

    constructor(pitch: ?Pitch, accidental: Accidental) {
        this.pitch = pitch;
        this.accidental = accidental;
    }

    static accidentalToString(accidental: Accidental): string {
        return accidental === NATURAL_ACCIDENTAL ? '' : accidental;
    }

    static noteToString(note: Note): string {
        return note.pitch + Note.accidentalToString(note.accidental);
    }

    static areNoteArraysEqual(notes1: Note[], notes2: Note[]): boolean {
        if (notes1.length !== notes2.length) {
            return false;
        }
        return !notes1.map((note1: Note, noteIndex: number) => {
            const note2 = notes2[noteIndex];
            return note1.equals(note2);
        }).some(comparison => !comparison);
    }

    equals(note: Note): boolean {
        const onlySharpNote1 = this.normalizeAccidentals();
        const onlySharpNote2 = note.normalizeAccidentals();
        return onlySharpNote1.hasEqualPitch(onlySharpNote2)
            && onlySharpNote1.hasEqualAccidental(onlySharpNote2);
    }

    hasEqualPitch(note: Note) {
        return this.pitch === note.pitch;
    }

    hasEqualAccidental(note: Note) {
        return this.accidental === note.accidental;
    }

    getRaisedNote(): Note {
        return createNote(this.pitch, nextAccidental(this.accidental));
    }

    getLoweredNote() {
        return createNote(this.pitch, previousAccidental(this.accidental));
    }

    normalizeAccidentals(preferredAccidental: Accidental = SHARP_ACCIDENTAL): Note {
        if (preferredAccidental === FLAT_ACCIDENTAL) {
            if (this.accidental === SHARP_ACCIDENTAL) {
                return createNote(
                    nextPitch(this.pitch),
                    this.pitch === 'B' || this.pitch === 'E' ? NATURAL_ACCIDENTAL : FLAT_ACCIDENTAL
                );
            } else if (this.accidental === FLAT_ACCIDENTAL) {
                if (this.pitch === 'C' || this.pitch === 'F') {
                    return createNote(
                        previousPitch(this.pitch),
                        NATURAL_ACCIDENTAL
                    );
                }
            }
        } else {
            if (this.accidental === FLAT_ACCIDENTAL) {
                return createNote(
                    previousPitch(this.pitch),
                    this.pitch === 'C' || this.pitch === 'F' ? NATURAL_ACCIDENTAL : SHARP_ACCIDENTAL
                );
            } else if (this.accidental === SHARP_ACCIDENTAL) {
                if (this.pitch === 'B' || this.pitch === 'E') {
                    return createNote(
                        nextPitch(this.pitch),
                        NATURAL_ACCIDENTAL
                    );
                }
            }
        }
        return this;
    }

    toString() {
        return Note.noteToString(this);
    }

    clone(): Note {
        return createNote(this.pitch, this.accidental);
    }
}

export function createNote(pitch: ?Pitch, accidental: ?Accidental): Note {
    return new Note(pitch, accidental ? accidental : NATURAL_ACCIDENTAL);
}

export function previousPitch(pitch: Pitch): Pitch {
    const previousPitchIndex = (PITCHES.indexOf(pitch) + PITCHES.length - 1) % PITCHES.length;
    return PITCHES[previousPitchIndex];
}

export function nextPitch(pitch: Pitch): Pitch {
    const nextPitchIndex = (PITCHES.indexOf(pitch) + 1) % PITCHES.length;
    return PITCHES[nextPitchIndex];
}

export function previousAccidental(accidental: Accidental): Accidental {
    const nextAccidentalIndex = (ACCIDENTALS.indexOf(accidental) + 1) % ACCIDENTALS.length;
    return ACCIDENTALS[nextAccidentalIndex];
}

export function nextAccidental(accidental: Accidental): Accidental {
    const nextAccidentalIndex = (ACCIDENTALS.indexOf(accidental) + ACCIDENTALS.length - 1) % ACCIDENTALS.length;
    return ACCIDENTALS[nextAccidentalIndex];
}
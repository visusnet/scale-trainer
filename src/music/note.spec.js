import {
    FLAT_ACCIDENTAL,
    createNote,
    PITCHES,
    SHARP_ACCIDENTAL
} from './note';

describe('normalizeAccidentals should', () => {
    describe('without preferred accidental (use sharps)', () => {
        PITCHES.forEach(pitch => {
            it(`not convert ${pitch}`, () => {
                const n = createNote(pitch);
                expect(n.normalizeAccidentals()).toEqual(n);
            });
        });

        PITCHES.filter(pitch => !['B', 'E'].includes(pitch)).forEach(pitch => {
            it(`not convert ${pitch} sharp`, () => {
                const sharpNote = createNote(pitch, SHARP_ACCIDENTAL);
                expect(sharpNote.normalizeAccidentals()).toEqual(sharpNote);
            });
        });

        it('convert A flat to G sharp', () => {
            const A_FLAT = createNote('A', FLAT_ACCIDENTAL);
            const G_SHARP = createNote('G', SHARP_ACCIDENTAL);
            expect(A_FLAT.normalizeAccidentals()).toEqual(G_SHARP);
        });

        it('convert B flat to C sharp', () => {
            const B_FLAT = createNote('B', FLAT_ACCIDENTAL);
            const A_SHARP = createNote('A', SHARP_ACCIDENTAL);
            expect(B_FLAT.normalizeAccidentals()).toEqual(A_SHARP);
        });

        it('convert C flat to B', () => {
            const C_FLAT = createNote('C', FLAT_ACCIDENTAL);
            const B = createNote('B');
            expect(C_FLAT.normalizeAccidentals()).toEqual(B);
        });

        it('convert E sharp to F', () => {
            const E_SHARP = createNote('E', SHARP_ACCIDENTAL);
            const F = createNote('F');
            expect(E_SHARP.normalizeAccidentals()).toEqual(F);
        });
    });

    describe('with preferred flats', () => {
        it('convert G sharp to A flat', () => {
            const G_SHARP = createNote('G', SHARP_ACCIDENTAL);
            const A_FLAT = createNote('A', FLAT_ACCIDENTAL);
            expect(G_SHARP.normalizeAccidentals(FLAT_ACCIDENTAL)).toEqual(A_FLAT);
        });

        it('convert C sharp to B flat', () => {
            const A_SHARP = createNote('A', SHARP_ACCIDENTAL);
            const B_FLAT = createNote('B', FLAT_ACCIDENTAL);
            expect(A_SHARP.normalizeAccidentals(FLAT_ACCIDENTAL)).toEqual(B_FLAT);
        });

        it('convert C flat to B', () => {
            const C_FLAT = createNote('C', FLAT_ACCIDENTAL);
            const B = createNote('B');
            expect(C_FLAT.normalizeAccidentals(FLAT_ACCIDENTAL)).toEqual(B);
        });

        it('convert F flat to E', () => {
            const F_FLAT = createNote('F', FLAT_ACCIDENTAL);
            const E = createNote('E');
            expect(F_FLAT.normalizeAccidentals(FLAT_ACCIDENTAL)).toEqual(E);
        });
    });
});
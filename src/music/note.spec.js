import {
    FLAT_ACCIDENTAL,
    normalizeAccidentals,
    note,
    PITCHES,
    SHARP_ACCIDENTAL
} from './note';

describe('normalizeAccidentals should', () => {
    describe('without preferred accidental (use sharps)', () => {
        PITCHES.forEach(pitch => {
            it(`not convert ${pitch}`, () => {
                const n = note(pitch);
                expect(normalizeAccidentals(n)).toEqual(n);
            });
        });

        PITCHES.filter(pitch => !['B', 'E'].includes(pitch)).forEach(pitch => {
            it(`not convert ${pitch} sharp`, () => {
                const sharpNote = note(pitch, SHARP_ACCIDENTAL);
                expect(normalizeAccidentals(sharpNote)).toEqual(sharpNote);
            });
        });

        it('convert A flat to G sharp', () => {
            const A_FLAT = note('A', FLAT_ACCIDENTAL);
            const G_SHARP = note('G', SHARP_ACCIDENTAL);
            expect(normalizeAccidentals(A_FLAT)).toEqual(G_SHARP);
        });

        it('convert B flat to C sharp', () => {
            const B_FLAT = note('B', FLAT_ACCIDENTAL);
            const A_SHARP = note('A', SHARP_ACCIDENTAL);
            expect(normalizeAccidentals(B_FLAT)).toEqual(A_SHARP);
        });

        it('convert C flat to B', () => {
            const C_FLAT = note('C', FLAT_ACCIDENTAL);
            const B = note('B');
            expect(normalizeAccidentals(C_FLAT)).toEqual(B);
        });

        it('convert E sharp to F', () => {
            const E_SHARP = note('E', SHARP_ACCIDENTAL);
            const F = note('F');
            expect(normalizeAccidentals(E_SHARP)).toEqual(F);
        });
    });

    describe('with preferred flats', () => {
        it('convert G sharp to A flat', () => {
            const G_SHARP = note('G', SHARP_ACCIDENTAL);
            const A_FLAT = note('A', FLAT_ACCIDENTAL);
            expect(normalizeAccidentals(G_SHARP, FLAT_ACCIDENTAL)).toEqual(A_FLAT);
        });

        it('convert C sharp to B flat', () => {
            const A_SHARP = note('A', SHARP_ACCIDENTAL);
            const B_FLAT = note('B', FLAT_ACCIDENTAL);
            expect(normalizeAccidentals(A_SHARP, FLAT_ACCIDENTAL)).toEqual(B_FLAT);
        });

        it('convert C flat to B', () => {
            const C_FLAT = note('C', FLAT_ACCIDENTAL);
            const B = note('B');
            expect(normalizeAccidentals(C_FLAT, FLAT_ACCIDENTAL)).toEqual(B);
        });

        it('convert F flat to E', () => {
            const F_FLAT = note('F', FLAT_ACCIDENTAL);
            const E = note('E');
            expect(normalizeAccidentals(F_FLAT, FLAT_ACCIDENTAL)).toEqual(E);
        });
    });
});
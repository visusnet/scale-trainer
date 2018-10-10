import {
    FLAT_ACCIDENTAL,
    createNote,
    SHARP_ACCIDENTAL
} from './note';
import {
    addInterval,
    SEMITONE,
    WHOLE_TONE
} from './interval';

describe('addInterval should', () => {
    const A_FLAT = createNote('A', FLAT_ACCIDENTAL);
    const A = createNote('A');
    const A_SHARP = createNote('A', SHARP_ACCIDENTAL);

    const B_FLAT = createNote('B', FLAT_ACCIDENTAL);
    const B = createNote('B');
    const B_SHARP = createNote('B', SHARP_ACCIDENTAL);

    const C_FLAT = createNote('C', FLAT_ACCIDENTAL);
    const C = createNote('C');
    const C_SHARP = createNote('C', SHARP_ACCIDENTAL);

    const D_FLAT = createNote('D', FLAT_ACCIDENTAL);
    const D = createNote('D');
    const D_SHARP = createNote('D', SHARP_ACCIDENTAL);

    const E_FLAT = createNote('E', FLAT_ACCIDENTAL);
    const E = createNote('E');
    const E_SHARP = createNote('E', SHARP_ACCIDENTAL);

    const F_FLAT = createNote('F', FLAT_ACCIDENTAL);
    const F = createNote('F');
    const F_SHARP = createNote('F', SHARP_ACCIDENTAL);

    const G_FLAT = createNote('G', FLAT_ACCIDENTAL);
    const G = createNote('G');
    const G_SHARP = createNote('G', SHARP_ACCIDENTAL);

    describe('add a semitone', () => {
        it('to A flat', () => expect(addInterval(A_FLAT, SEMITONE)).toEqual(A));
        it('to A', () => expect(addInterval(A, SEMITONE)).toEqual(A_SHARP));
        it('to A sharp', () => expect(addInterval(A_SHARP, SEMITONE)).toEqual(B));

        it('to B flat', () => expect(addInterval(B_FLAT, SEMITONE)).toEqual(B));
        it('to B', () => expect(addInterval(B, SEMITONE)).toEqual(C));
        it('to B sharp (=C)', () => expect(addInterval(B_SHARP, SEMITONE)).toEqual(C_SHARP));

        it('to C flat (=B)', () => expect(addInterval(C_FLAT, SEMITONE)).toEqual(C));
        it('to C', () => expect(addInterval(C, SEMITONE)).toEqual(C_SHARP));
        it('to C sharp', () => expect(addInterval(C_SHARP, SEMITONE)).toEqual(D));

        it('to D flat', () => expect(addInterval(D_FLAT, SEMITONE)).toEqual(D));
        it('to D', () => expect(addInterval(D, SEMITONE)).toEqual(D_SHARP));
        it('to D sharp', () => expect(addInterval(D_SHARP, SEMITONE)).toEqual(E));

        it('to E flat', () => expect(addInterval(E_FLAT, SEMITONE)).toEqual(E));
        it('to E', () => expect(addInterval(E, SEMITONE)).toEqual(F));
        it('to E sharp (=F)', () => expect(addInterval(E_SHARP, SEMITONE)).toEqual(F_SHARP));

        it('to F flat (=E)', () => expect(addInterval(F_FLAT, SEMITONE)).toEqual(F));
        it('to F', () => expect(addInterval(F, SEMITONE)).toEqual(F_SHARP));
        it('to F sharp (=F)', () => expect(addInterval(F_SHARP, SEMITONE)).toEqual(G));

        it('to G flat', () => expect(addInterval(G_FLAT, SEMITONE)).toEqual(G));
        it('to G', () => expect(addInterval(G, SEMITONE)).toEqual(G_SHARP));
        it('to G sharp (=C)', () => expect(addInterval(G_SHARP, SEMITONE)).toEqual(A));
    });

    describe('add a whole tone', () => {
        it('to A flat', () => expect(addInterval(A_FLAT, WHOLE_TONE)).toEqual(A_SHARP));
        it('to A', () => expect(addInterval(A, WHOLE_TONE)).toEqual(B));
        it('to A sharp', () => expect(addInterval(A_SHARP, WHOLE_TONE)).toEqual(C));

        it('to B flat', () => expect(addInterval(B_FLAT, WHOLE_TONE)).toEqual(C));
        it('to B', () => expect(addInterval(B, WHOLE_TONE)).toEqual(C_SHARP));
        it('to B sharp (=C)', () => expect(addInterval(B_SHARP, WHOLE_TONE)).toEqual(D));

        it('to C flat (=B)', () => expect(addInterval(C_FLAT, WHOLE_TONE)).toEqual(C_SHARP));
        it('to C', () => expect(addInterval(C, WHOLE_TONE)).toEqual(D));
        it('to C sharp', () => expect(addInterval(C_SHARP, WHOLE_TONE)).toEqual(D_SHARP));

        it('to D flat', () => expect(addInterval(D_FLAT, WHOLE_TONE)).toEqual(D_SHARP));
        it('to D', () => expect(addInterval(D, WHOLE_TONE)).toEqual(E));
        it('to D sharp', () => expect(addInterval(D_SHARP, WHOLE_TONE)).toEqual(F));

        it('to E flat', () => expect(addInterval(E_FLAT, WHOLE_TONE)).toEqual(F));
        it('to E', () => expect(addInterval(E, WHOLE_TONE)).toEqual(F_SHARP));
        it('to E sharp (=F)', () => expect(addInterval(E_SHARP, WHOLE_TONE)).toEqual(G));

        it('to F flat (=E)', () => expect(addInterval(F_FLAT, WHOLE_TONE)).toEqual(F_SHARP));
        it('to F', () => expect(addInterval(F, WHOLE_TONE)).toEqual(G));
        it('to F sharp (=F)', () => expect(addInterval(F_SHARP, WHOLE_TONE)).toEqual(G_SHARP));

        it('to G flat', () => expect(addInterval(G_FLAT, WHOLE_TONE)).toEqual(G_SHARP));
        it('to G', () => expect(addInterval(G, WHOLE_TONE)).toEqual(A));
        it('to G sharp (=C)', () => expect(addInterval(G_SHARP, WHOLE_TONE)).toEqual(A_SHARP));
    });
});
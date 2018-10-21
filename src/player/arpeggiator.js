// @flow
import {Note} from '../music/note';
import startAudioContext from 'startaudiocontext';
import Tone from 'tone';
import isAppleIOS from 'is-ios';

const synthesizer = new Tone.AMSynth().toMaster();

export type NoteCallback = (noteIndex: number) => void;
export type StopCallback = () => void;

export default class Arpeggiator {
    static _patterns: Tone.Pattern[] = [];

    static registerTrigger(triggerSelector: string) {
        if (isAppleIOS) {
            startAudioContext(Tone.context, triggerSelector);
        }
    }

    static play(notes: Note[], onPlayNote: ?NoteCallback, onStop: ?StopCallback) {
        Arpeggiator._removeAllPatterns();

        const pitchOctaves = notes
            .map((note: Note) => note.simpleNotation)
            .map(_appendOctave(notes));
        const numberOfArpeggioNotes = pitchOctaves.length * 2 - 1;
        let playedNotes = 0;

        const pattern = new Tone.Pattern(function (time, note) {
            const noteIndex = pitchOctaves.indexOf(note);
            if (onPlayNote) {
                onPlayNote(noteIndex);
            }
            synthesizer.triggerAttackRelease(note, 0.5);
            playedNotes++;
            if (onStop && playedNotes === numberOfArpeggioNotes) {
                setTimeout(() => {
                    onStop();
                    Arpeggiator._removeAllPatterns();
                }, 500);
            }
        }, pitchOctaves, 'upDown');

        Arpeggiator._patterns.push(pattern);

        pattern.iterations = numberOfArpeggioNotes;
        pattern.start(0);

        Tone.Transport.start();
    }

    static stop(onStop: ?StopCallback) {
        if (onStop) {
            onStop();
            Tone.Transport.stop();
            Arpeggiator._removeAllPatterns();
        }
    }

    static _removeAllPatterns() {
        Arpeggiator._patterns.forEach((pattern: Tone.Pattern) => {
            Tone.Transport.stop();
            Tone.Transport.cancel(pattern);
            Tone.Transport.clear(pattern);
            pattern.dispose();
        });
        Arpeggiator._patterns = [];
    }
}

function _appendOctave(notes: Note[]) {
    const pitchOrder = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    let octaveIndex = 3;
    return (noteName: string, noteIndex: number) => {
        if (noteIndex === 0) {
            return `${noteName}${octaveIndex}`;
        }

        if (pitchOrder.indexOf(notes[noteIndex - 1].pitch) > pitchOrder.indexOf(notes[noteIndex].pitch)) {
            octaveIndex++;
        }

        return `${noteName}${octaveIndex}`;
    };
}
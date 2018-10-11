import {Note} from './note';
import type {Interval} from './interval';
import {addInterval} from './interval';
import type {ScaleConstruction} from './scale';
import {Scale} from './scale';
import type {Mode} from './mode';

export class Key {
    root: Note;
    scale: Scale;
    mode: ?Mode;

    constructor(root: Note, scale: Scale, mode: Mode) {
        this.root = root;
        this.scale = scale;
        this.mode = mode;
    }

    get modeName(): string {
        if (this.scale.modes.length === 0) {
            return '';
        }
        const scaleIndex = this.scale.modes.indexOf(this.mode);
        return scaleIndex === 0 ? '' : `${this.mode} (mode ${scaleIndex + 1} of ${this.scale.name})`;
    }

    toNotes(): Note[] {
        return [...this.modeConstruction.slice(0, -1).reduce((notes: Note[], interval: Interval) => {
            const previousNote = notes[notes.length - 1];
            const currentNote = addInterval(previousNote, interval);
            return [...notes, currentNote.normalizeAccidentals(this.root.accidental)];
        }, [this.root]), this.root];
    }

    get modeConstruction(): ScaleConstruction {
        return this.mode
            ? _rotateArray(this.scale.construction, this.scale.modes.indexOf(this.mode))
            : this.scale.construction;
    }

    toString(): string {
        return `${this.root} ${this.scale} ${this.modeName}`.trim();
    }
}

function _rotateArray<T>(array: T[], rotateByOffset: number) {
    const length = array.length;
    return array.map((element: T, index: number) => array[(((rotateByOffset + index) % length) + length) % length]);
}

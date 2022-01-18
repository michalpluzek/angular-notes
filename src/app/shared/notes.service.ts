import { Injectable } from '@angular/core';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  notes: Note[] = {} as Note[];

  constructor() {}

  get(id: number) {
    return this.notes[id];
  }

  getId(note: Note) {
    return this.notes.indexOf(note);
  }

  add(note: Note) {
    const newLength = this.notes.push(note);
    const index = newLength - 1;
    return index;
  }

  update(id: number, title: string, body: string) {
    const note = this.notes[id];
    note.title = title;
    note.body = body;
  }

  delete(id: number) {
    this.notes.splice(id, 1);
  }
}

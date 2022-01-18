import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      transition('void => *', [
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          marginBottom: 0,

          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }),
        // first spacing
        animate(
          '50ms',
          style({
            height: '*',
            marginBottom: '*',

            paddingTop: '*',
            paddingBottom: '*',
            paddingRight: '*',
            paddingLeft: '*',
          })
        ),
        animate(68),
      ]),
      transition('* => void', [
        // first scale up
        animate(
          50,
          style({
            transform: 'scale(1.05)',
          })
        ),
        // scale to normal
        animate(
          50,
          style({
            transform: 'scale(1)',
            opacity: 0.75,
          })
        ),
        // to fade out
        animate(
          '120ms ease-out',
          style({
            transform: 'scale(0.68)',
            opacity: 0,
          })
        ),
        // spacing to 0
        animate(
          '150ms ease-out',
          style({
            height: 0,
            opacity: 0,

            marginBottom: 0,

            paddingTop: 0,
            paddingBottom: 0,
            paddingRight: 0,
            paddingLeft: 0,
          })
        ),
      ]),
    ]),
    trigger('listAnim', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({
              opacity: 0,
              height: 0,
            }),
            stagger(100, [animate('0.2s ease')]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class NotesListComponent implements OnInit {
  notes: Note[] = new Array<Note>();
  filteredNotes: Note[] = new Array<Note>();

  constructor(private noteService: NotesService) {}

  ngOnInit(): void {
    this.notes = this.noteService.getAll();
    this.filteredNotes = this.notes;
  }

  deleteNote(id: number) {
    this.noteService.delete(id);
  }

  filter(query: string) {
    query = query.toLowerCase().trim();

    let allResults = new Array<Note>();
    // split up search words
    let terms: string[] = query.split(' ');
    //remove duplicates
    terms = this.removeDuplicates(terms);
    // add relevant results to allResults array
    terms.forEach((word) => {
      let results: Note[] = this.revelantNotes(word);
      allResults = [...allResults, ...results];
    });

    // allResults may contain duplicate notes,
    // so they have to be removed
    const uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes = uniqueResults;
  }

  removeDuplicates(arr: any[]): any[] {
    const uniqueResults: Set<any> = new Set<any>();

    arr.forEach((item) => uniqueResults.add(item));

    return [...uniqueResults];
  }

  revelantNotes(query: string): Note[] {
    query = query.toLowerCase().trim();
    const relevantNotes = this.notes.filter((note) => {
      if (
        note.body.toLowerCase().includes(query) ||
        note.title.toLowerCase().includes(query)
      )
        return true;
      return false;
    });

    return relevantNotes;
  }
}

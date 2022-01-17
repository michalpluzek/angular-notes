import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements OnInit {
  @Input() title: string = '';
  @Input() body: string = '';

  @ViewChild('truncator', { static: true }) truncator: ElementRef<HTMLElement> =
    {} as ElementRef<HTMLElement>;
  @ViewChild('bodyText', { static: true }) bodyText: ElementRef<HTMLElement> =
    {} as ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    // work out if is a text overflow and if not, then hide the truncator
    let style = window.getComputedStyle(this.bodyText.nativeElement, null);
    let viewableHight = parseInt(style.getPropertyValue('height'), 10);

    if (this.bodyText.nativeElement.scrollHeight > viewableHight) {
      // if there is a text overflow, show the fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', ' block');
    } else {
      // else (there is a text overflow), hide the fade out trancator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
  }
}

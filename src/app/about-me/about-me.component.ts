import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  NgZone
} from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit, AfterViewInit {

  @ViewChild('retroText') retroText!: ElementRef<HTMLElement>;

  @Output() AboutMeClosed = new EventEmitter<void>(); 
  @Output() frameClicked = new EventEmitter<void>();

  flipped = false;
  private resizeTimeout: any;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.flipped = true;
    }, 100);
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      // primo calcolo
      this.fitTextToOval();

      // resize
      window.addEventListener("resize", () => {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
          this.fitTextToOval();
        }, 150);
      });

      // toggle descrizioni su mobile
      document.querySelectorAll('.about-me-title').forEach(title => {
        title.addEventListener('click', () => {
          const desc = (title as HTMLElement).nextElementSibling;
          if (desc && desc.classList.contains('about-me-description')) {
            desc.classList.toggle('active');
            setTimeout(() => this.fitTextToOval(), 500);
          }
        });
      });
    });
  }

  private fitTextToOval() {
    const container = this.retroText.nativeElement;
    const maxFont = 24;
    const minFont = 10;
    let fontSize = maxFont;

    container.style.fontSize = fontSize + "px";

    while (container.scrollHeight > container.clientHeight && fontSize > minFont) {
      fontSize--;
      container.style.fontSize = fontSize + "px";
    }
  }

  CloseAboutMe() {
    this.flipped = false;
    setTimeout(() => {
      this.AboutMeClosed.emit(); 
      this.frameClicked.emit();
      this.fitTextToOval(); // ricalcolo dopo chiusura
    }, 1000);
  }
}

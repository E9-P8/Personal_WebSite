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
  @Output() contactRequested = new EventEmitter<void>();

  flipped = false;
  private resizeTimeout: any;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.flipped = true;
    }, 200);
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      
      //mobile
      document.querySelectorAll('.about-me-title').forEach(title => {
        title.addEventListener('click', () => {
          const desc = (title as HTMLElement).nextElementSibling;
          if (desc && desc.classList.contains('about-me-description')) {
            desc.classList.toggle('active');
          }
        });
      });
    });
  }


  CloseAboutMe() {
    this.flipped = false;
    setTimeout(() => {
      this.AboutMeClosed.emit(); 
      this.frameClicked.emit();
    }, 1500);
  }

  ContactMe() {
    this.flipped = false;
    console.log("chiudi about me");
    setTimeout(() => {
      this.contactRequested.emit();
      this.AboutMeClosed.emit(); 
      this.frameClicked.emit();
    }, 100);}



activePhoto: string | null = null;
activeSide: 'left' | 'right' = 'right';
randomTop: string = '50%';

showPhoto(url: string, side: 'left' | 'right' = 'right') {
  this.activePhoto = url;
  this.activeSide = side;
  const randomY = Math.floor(Math.random() * (80 - 20 + 1) + 20);
  this.randomTop = randomY + '%';
}
hidePhoto() {
  this.activePhoto = null;
}

}

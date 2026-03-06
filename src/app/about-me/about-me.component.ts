import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
  @Output() AboutMeClosed = new EventEmitter<void>(); 
  @Output() frameClicked = new EventEmitter<void>();

  flipped = false;


  constructor() { }

  ngOnInit(): void {

    setTimeout(()=> {
      this.flipped= true;
    }, 100);
  }
  CloseAboutMe(){
    this.flipped= false;

    setTimeout(()=> {
      this.AboutMeClosed.emit(); 
      this.frameClicked.emit();
    }, 1000);
    
  }
}

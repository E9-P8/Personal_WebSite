import { Component, OnInit, EventEmitter, Output, Input, ChangeDetectorRef, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-room-scene',
  templateUrl: './room-scene.component.html',
  styleUrls: ['./room-scene.component.scss'],
 
})



export class RoomSceneComponent implements OnInit {


  constructor() {
   }



  roomIsVisible = true;
  showProject = false; 

  AboutMe = false;
  Contact = false;
  Form = false;

  paperVisible = true;
  isSended= false;

  

  @Output() projectOpened = new EventEmitter<void>(); 
  @Output() tvClicked = new EventEmitter<void>(); 

  @Output() AboutMeOpened = new EventEmitter<void>(); 
  @Output() frameClicked = new EventEmitter<void>(); 
  @Input() ContactMe: boolean = false; 

    
  ngOnChanges(changes: SimpleChanges) {
    if (changes['ContactMe'] && changes['ContactMe'].currentValue) {
      console.log("Apertura telefono confermata!");
      this.OpenContact();
    }
  }
  ngOnInit() {
    if (this.ContactMe) {
      this.OpenContact();
      console.log("figlio in ascolto")
    }
  }
  OpenAboutMe(){
    this.AboutMeOpened.emit(); 
    this.frameClicked.emit();
  } 

  OpenContact(){
    this.Contact = true;
    this.Form = false;
    this.AboutMe = false;
  }
  CloseContact(){
    this.Contact = false;
    this.Form = false;
    this.AboutMe = false;
  }

  OpenForm(){
    this.Form = true;
    this.AboutMe = false;
    this.Contact = false;
  }
  CloseForm(){
    this.Form = false;
    this.AboutMe = false;
    this.Contact = false;
  }

  form = {
    name: '',
    surname: '',
    email: '',
    message: ''
  };

  sendEmail() {
  if (
    !this.form.name ||
    !this.form.surname ||
    !this.form.email ||
    !this.form.message
  ) {
    alert('è necessario che tutti i campi siano compilati per procedere');
    return;
  }

  this.isSended = true;

  setTimeout(() => {
    this.isSended = false;

    this.form = {
      name: '',
      surname: '',
      email: '',
      message: ''
    };
  }, 700);
  }

  OpenProject() { 
    this.projectOpened.emit(); 
    this.tvClicked.emit();
  }

}

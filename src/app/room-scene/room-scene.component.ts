import { Component, OnInit, EventEmitter, Output, Input, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { AudioService } from'../services/audio.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-room-scene',
  templateUrl: './room-scene.component.html',
  styleUrls: ['./room-scene.component.scss'],
 
})



export class RoomSceneComponent implements OnInit {


  constructor(private audioService: AudioService, private http: HttpClient) {
   }


  roomIsVisible = true;
  showProject = false; 

  AboutMe = false;
  Contact = false;
  Form = false;

  paperVisible = true;
  isSended= false;

  isAudioMuted = false;
  showPopup;
  popupMessage;

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
    this.audioService.play('phone'); 
  }
  CloseContact(){
    this.Contact = false;
    this.Form = false;
    this.AboutMe = false;
    this.audioService.stop('phone');
  }

  OpenForm(){
    this.Form = true;
    this.AboutMe = false;
    this.Contact = false;
    this.audioService.play('macchina');
    console.log("macchina")
  }
  CloseForm(){
    this.Form = false;
    this.AboutMe = false;
    this.Contact = false;
    this.audioService.stop('macchina');
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
  this.audioService.play('send');
  this.isSended = true;

  this.http.post("http://localhost:3000/send-email", this.form).subscribe({
    next: (res: any) => {
      if (res.success) {
        this.isSended = true;
        //alert("Email inviata con successo!");
        this.showPopup= true;

        setTimeout(() => {
          this.isSended = false;
          this.form = {
            name: '',
            surname: '',
            email: '',
            message: ''
          };
        }, 1000);

      } else {
        //alert("Errore nell'invio della mail");
        this.showPopup = true;
        this.popupMessage = "Errore nell'invio della mail";
      }
    },
    error: (err) => {
      console.error("Errore invio email", err);
    }
  });


  }

  onPopupClose() {
    this.showPopup = false;
    this.isSended = false; // foglio nuovo entra
    this.form = { name:'', surname:'', email:'', message:'' };
  }

  OpenProject() { 
    this.projectOpened.emit(); 
    this.tvClicked.emit();
  }

  toggleRoomMusic() {
    this.isAudioMuted = this.audioService.toggleGlobalMute();

    /*const isPlaying = this.audioService.togglePlay('room');
    this.isAudioMuted = !isPlaying;
    
    console.log("Mute attivo?", this.isAudioMuted);*/
    if (!this.isAudioMuted) {
      this.audioService.play('room');
    }
    
  }

}

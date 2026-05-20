import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AudioService } from './services/audio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent {

  constructor(private audioService: AudioService) {}

  title = 'PersonalWebSite';

  isRotated = false;
  roomIsVisible = false;
  showProject = false; 
  showProjectContent = false;
  LockScene = true;

  shouldOpenPhone = false;

  showAboutMe = false;


rotateKey(){ 
  if(this.isRotated) return; 

  this.isRotated= true;
    setTimeout(() => {
      this.roomIsVisible = true;
      this.LockScene= false;
    }, 350);
  
  this.audioService.play('serratura'); 
  setTimeout(() => {
      this.audioService.play('room', true); 
  }, 500); 
} 

OpenProject() { 
  this.showProject = true; 
  this.showProjectContent = false;
  this.roomIsVisible = false; 
}
CloseProject() { 
  this.showProject = false; 
  this.showProjectContent = false;
  this.roomIsVisible = true;   

  this.audioService.play('room', true);
}
OpenAboutMe(){
  this.showAboutMe= true;
  this.roomIsVisible = false; 
  this.showProject = false;
  this.shouldOpenPhone= false;

  this.audioService.play('about-me', true); 
} 
CloseAboutMe(){
  this.showAboutMe= false;
  this.roomIsVisible = true; 
  this.showProject = false;
  this.shouldOpenPhone= false;

  this.audioService.play('room', true);
}

handleContactRequest() {
  console.log("padre in ascolto");
  this.showAboutMe = false;    
  this.roomIsVisible = true;   
  setTimeout(() => {
    this.shouldOpenPhone = true; 
    console.log("Comando shouldOpenPhone inviato!");
  }, 50); 
}
}
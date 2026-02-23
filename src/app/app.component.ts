import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PersonalWebSite';

  isRotated = false;
  roomIsVisible = false;

  AboutMe = false;
  Contact = false;
  Form = false;


  paperVisible = false;


  rotateKey(){ 
    if(this.isRotated) return; 
    
    this.isRotated= true;
    setTimeout(() => {
      this.roomIsVisible = true
    }, 350);
   } 

   
  OpenAboutMe(){
    this.AboutMe = true;
    this.Form = false;
    this.Contact = false;
  } 
  OpenContact(){
    this.Contact = true;
    this.Form = false;
    this.AboutMe = false;
  }
  OpenForm(){
    this.Form = true;
    this.AboutMe = false;
    this.Contact = false;
  }
  CloseAboutMe(){
    this.AboutMe = false;
    this.Form = false;
    this.Contact = false;
  } 
  CloseContact(){
    this.Contact = false;
    this.Form = false;
    this.AboutMe = false;
  }
  CloseForm(){
    this.Form = false;
    this.AboutMe = false;
    this.Contact = false;
  }
  Project(){}

//--------------------------------------------------------------
sendMail(){}
}
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent {

  
  title = 'PersonalWebSite';

  isRotated = false;
  roomIsVisible = false;
  showProject = false; 
  LockScene = true;



  rotateKey(){ 
    if(this.isRotated) return; 
    
    this.isRotated= true;
    setTimeout(() => {
      this.roomIsVisible = true;
      this.LockScene= false;
    }, 350);
   } 
   OpenProject() { 
    this.showProject = true; 
    this.roomIsVisible = false; 

}
}
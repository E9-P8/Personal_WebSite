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

  rotateKey(){ 
    if(this.isRotated) return; 
    
    this.isRotated= true;
    setTimeout(() => {
      this.roomIsVisible = true
    }, 350);
   } 
}


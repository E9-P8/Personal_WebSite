import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
/*export class ProjectComponent {

  @Output() ProjectClosed = new EventEmitter<void>(); 
  rings = Array.from({ length: 20 });
  isEntering = true;
  showContent = false;
  endedCount = 0;

  onAnimationEnd(event: AnimationEvent) {
    if ((event.target as HTMLElement).classList.contains('tunnelRing')) {
      this.endedCount++;
      if (this.endedCount === this.rings.length) {
        this.showContent = true; // mostra il contenuto del project
      }
    }
  }
 
  closeProject(){
    this.isEntering = false;
    setTimeout(()=> {
      this.ProjectClosed.emit(); 
    }, 1000);
   } 

}*/

export class ProjectComponent {
  @Output() ProjectClosed = new EventEmitter<void>(); 
  rings = Array.from({ length: 20 });
  isEntering = true;
  showContent = false;
  endedCount = 0;

  onAnimationEnd(event: AnimationEvent) {
    if ((event.target as HTMLElement).classList.contains('tunnelRing')) {
      this.endedCount++;
      if (this.endedCount === this.rings.length) {
        if (this.isEntering) {
          // entrata finita → mostra contenuto
          this.showContent = true;
        } else {
          // uscita finita → chiudi Project
          this.ProjectClosed.emit();
        }
        this.endedCount = 0; // reset per la prossima volta
      }
    }
  }
 
  closeProject() {
    this.isEntering = false;
    this.endedCount = 0; // reset contatore
    this.showContent = false; // nascondi contenuto mentre esce
  }
}


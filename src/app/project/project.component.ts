import { Component } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  rings = Array.from({ length: 20 });
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
}

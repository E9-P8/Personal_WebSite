import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  rings = Array.from({ length: 20 });
  showContent = false;
  endedCount = 0;

  constructor() { }

  ngOnInit(): void {
  }
  onAnimationEnd(event: AnimationEvent) { if ((event.target as HTMLElement).classList.contains('tunnel__ring')) { this.endedCount++; if (this.endedCount === this.rings.length) { // Tutti i quadrati hanno finito 
  this.showContent = true; } } }
}

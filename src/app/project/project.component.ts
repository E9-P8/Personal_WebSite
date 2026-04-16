import { Component, Output, EventEmitter, AfterViewInit, Input, OnInit, ElementRef, ViewChild  } from '@angular/core';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent{

  @Output() ProjectClosed = new EventEmitter<void>(); 
  @ViewChild('tvInterface') tvInterface!: ElementRef;

  isMobile(): boolean {
  return window.matchMedia("(pointer: coarse)").matches;
}

  rings = Array.from({ length: 20 });

  isEntering = true;
  showContent = false; 
  endedCount = 0;

    // entrata tunnel
    onAnimationEnd(event: AnimationEvent) {
        if ((event.target as HTMLElement).classList.contains('tunnelRing')) {
          this.endedCount++;
          if (this.endedCount === this.rings.length) {
            if (this.isEntering) {
              this.showContent = true;
              setTimeout(() => {
                this.animateTextNodes();
              }, 100); 
            } else {
              this.ProjectClosed.emit();
            }
            this.endedCount = 0; // reset
          }
        }
      }

  animateTextNodes() {
    if (!this.tvInterface) return;
  
    const root: HTMLElement = this.tvInterface.nativeElement;
  
    let delayCounter = 0;
  
    const processNode = (node: Node) => {
  
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
  
        if (!text || !text.trim()) return;
  
        const fragment = document.createDocumentFragment();
  
        text.split('').forEach((char) => {
          const span = document.createElement('span');
          span.classList.add('letter-animate');
          span.textContent = char;
  
          const randomX = (Math.random() - 0.5) * 80;
          const randomY = (Math.random() - 0.5) * 80;
  
          span.style.transform = `translate(${randomX}px, ${randomY}px)`;
          span.style.opacity = '0';
  
          const delay = delayCounter * (10 + Math.random() * 2);
  
          setTimeout(() => {
            span.classList.add('letter-visible');
            span.style.transform = 'translate(0, 0)';
            span.style.opacity = '1';
          }, delay);
  
          delayCounter++;
          fragment.appendChild(span);
        });
  
        node.parentNode?.replaceChild(fragment, node);
      } 
      
      else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
  
        if (el.classList.contains('letter-animate')) return;
  
        const children = Array.from(node.childNodes);
        children.forEach(child => processNode(child));
      }
    };
  
    processNode(root);
  }

  /*--------------------------------------------------------------*/
  private listeners= false;


  closeProject() {

    const btn = document.querySelector('.exit-button') as HTMLElement;
  
    if (btn) {
      btn.classList.add('executing');
      const originalText = btn.textContent;
      btn.textContent = "executing command...";
      setTimeout(() => {
        btn.textContent = "closing project...";
      }, 600);
  
      setTimeout(() => {
        btn.textContent = "shutting down interface...";
      }, 1200);
  
      setTimeout(() => {
        btn.textContent = "done.";
      }, 1800);
    }
  
    setTimeout(() => {
      this.isEntering = false;
      this.endedCount = 0;
      this.showContent = false;
  
      if (btn) {
        btn.classList.remove('executing');
        btn.textContent = "exit projects";
      }
  
    }, 2200);
  }


  ngAfterViewChecked() {
    if (this.showContent && !this.listeners) {
      this.ngAfterViewInit();
  
      if (this.isMobile()) {
        this.initScrollSelection();
      }
      this.listeners = true;
    }
  }

// highlight project selected
 ngAfterViewInit() {
    const items = document.querySelectorAll(".tv-item");
    items.forEach(item => {
      item.addEventListener("mouseenter", () => {
        items.forEach(i => i.classList.remove("project-selected"));
        item.classList.add("project-selected");
        this.activateProject(item);
      });
    });
  }

  // titolo che viene scritto dinamicamente
  typeWriter(element: HTMLElement, text: string) {
    element.textContent = "";
    let i = 0;

    const typing = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;

        const delay = 50 + Math.random() * 90;
        setTimeout(() => requestAnimationFrame(typing), delay);
      }
    };

    typing();
  }

  activateProject(project: Element) {
    const title = project.querySelector("h3") as HTMLElement;
    const originalText = title.dataset['text'] || title.textContent || "";

    if (!title.dataset['text']) {
      title.dataset['text'] = originalText;
    }

    title.classList.add("project-animate");
    this.typeWriter(title, originalText);
  }


// mobile
initScrollSelection() {
    const items = document.querySelectorAll(".tv-item");
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          items.forEach(i => i.classList.remove("project-selected"));
  
          const el = entry.target as HTMLElement;
          el.classList.add("project-selected");
  
          this.activateProject(el);
        }
      });
    }, {
      root: null,
      threshold: 0.6
    });
  
    items.forEach(item => observer.observe(item));
  }
}

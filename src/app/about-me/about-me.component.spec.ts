import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeComponent } from './about-me.component';

describe('AboutMeComponent', () => {
  let component: AboutMeComponent;
  let fixture: ComponentFixture<AboutMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

/*
  function fitTextToOval(container) {
    const maxFont = 24;
    const minFont = 10;
    let fontSize = maxFont;
  
    container.style.fontSize = fontSize + "px";
  
    while (container.scrollHeight > container.clientHeight && fontSize > minFont) {
      fontSize--;
      container.style.fontSize = fontSize + "px";
    }
  }
  
  window.addEventListener("load", () => {
    const retroText = document.querySelector(".retro-text");
    fitTextToOval(retroText);
  });
  
  window.addEventListener("resize", () => {
    const retroText = document.querySelector(".retro-text");
    fitTextToOval(retroText);
  });
  

  document.querySelectorAll('.about-me-title').forEach(title => {
      title.addEventListener('click', () => {
        const desc = (title as HTMLElement).nextElementSibling;
  
        if (desc && desc.classList.contains('about-me-description')) {
          desc.classList.toggle('active');
        }
      });
    });*/
  
  
  
});

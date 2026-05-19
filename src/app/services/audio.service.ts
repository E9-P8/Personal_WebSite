import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
 
 private sounds: { [key: string]: HTMLAudioElement } = {};
 public isGlobalMuted = false;
 
 constructor() {
   
   this.sounds['serratura'] = new Audio('assets/Sounds/typewriter-machine.mp3');
   this.sounds['room']    = new Audio('assets/Sounds/golden-radio-room.mp3');
   this.sounds['project']  = new Audio('assets/Sounds/machine-world.mp3');
   this.sounds['macchina']  = new Audio('assets/Sounds/typewriter-machine.mp3');
   this.sounds['send']     = new Audio('assets/Sounds/typewriter-bell-carriage-reset.mp3');
   this.sounds['phone']     = new Audio('assets/Sounds/old-phone-dialing.mp3');
   this.sounds['about-me']  = new Audio('assets/Sounds/peaceful-piano.mp3');

   this.sounds['about-me'].loop = true;
   this.sounds['room'].loop = true;
   this.sounds['project'].loop = true;
   this.sounds['macchina'].loop = true;

   this.setVolume('room', 0.02);
   this.setVolume('phone', 0.06);
   this.setVolume('macchina', 0.06);
   this.setVolume('send', 0.06);
   this.setVolume('project', 0.05);

}

setVolume(key: string, volume: number) {
  if (this.sounds[key]) {
    this.sounds[key].volume = Math.max(0, Math.min(1, volume));
  }
}

play(key: string, stopOthers: boolean = false) {
  if (this.isGlobalMuted) {
    console.log(`Audio ${key} bloccato: il Mute globale è attivo.`);
    return; 
  }

  if (stopOthers) {
    this.stopAll();
  }

  const audio = this.sounds[key];
  if (audio) {
    audio.currentTime = 0; 
    audio.play().catch(err => console.error("Errore riproduzione audio:", err));
  }
}
togglePlay(key: string): boolean {
  const audio = this.sounds[key];
  if (audio) {
    if (audio.paused) {
      audio.play();
      return true; 
    } else {
      audio.pause();
      return false; 
    }
  }
  return false;
}

toggleGlobalMute(): boolean {
  this.isGlobalMuted = !this.isGlobalMuted;

  if (this.isGlobalMuted) {
    this.stopAll();
  }
  
  return this.isGlobalMuted;
}

  stop(key: string) {
    if (this.sounds[key]) {
      this.sounds[key].pause();
      this.sounds[key].currentTime = 0;
    }
  }
  stopAll() {
    Object.keys(this.sounds).forEach(key => {
      this.sounds[key].pause();
      this.sounds[key].currentTime = 0;
    });
  }
}
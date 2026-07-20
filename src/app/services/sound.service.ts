import { Injectable } from '@angular/core';
// Servicios
import { DataService } from './data.service';
import { Router } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class SoundService {
  private music: Map<string, string> = new Map();
  private efects: Map<string, string> = new Map();

  constructor(
    private readonly dataService: DataService,
    private readonly router: Router,
  ) {}

  init() {
    this.music = this.dataService.getMusic();
    this.efects = this.dataService.getEfects();
    let route = this.router.routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }
    this.playMusic(route.snapshot.data['music']);
  }

  private currentMusic: HTMLAudioElement | null = null;
  private curretnEfect: HTMLAudioElement | null = null;

  // ========= Musica
  playMusic(name: string = 'default', loop = true): void {
    const src = this.music.get(name);
    const audio = new Audio(src);

    // Comprobar que no se este ejecutando esa musica para no cambiarla
    if (this.currentMusic) {
      if (this.currentMusic.src == audio.src) return;
      this.currentMusic.pause();
      this.currentMusic = null;
    }
    audio.loop = loop;
    audio.volume = 0.5;
    console.log(audio, 'Esto va');
    audio
      .play()
      .then(() => {
        console.log('Reproduciendo');
      })
      .catch((err) => {
        console.error(err);
      });

    this.currentMusic = audio;
  }

  stopMusic(): void {
    this.currentMusic?.pause();
    this.currentMusic = null;
  }

  // ========== Efectos
  async playEfects(key: string, volume = 0.5, src = this.efects.get(key)): Promise<void> {
    if (!src) return;

    if (this.curretnEfect) {
      this.curretnEfect.pause();
      this.curretnEfect.currentTime = 0;
      this.curretnEfect = null;
    }

    const audio = new Audio(src);
    audio.volume = volume;
    this.curretnEfect = audio;

    await audio.play();

    await new Promise<void>((resolve) => {
      audio.addEventListener(
        'ended',
        () => {
          this.curretnEfect = null;
          resolve();
        },
        { once: true },
      );
    });
  }
}

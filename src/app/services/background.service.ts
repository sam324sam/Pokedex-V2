import { Injectable, signal } from '@angular/core';
import { Entity } from '../models/entity/entity.model';
import { AnimationType } from '../models/sprites/animation-sprite.model';
import { EntityStoreService } from './entity-store.service';

@Injectable({ providedIn: 'root' })
export class BackgroundService {
  readonly fadeOpacity = signal(0);
  canvas!: HTMLCanvasElement;
  background: Entity = {
    id: null,
    name: 'background',
    active: true,
    tags: ['background'],
    sprite: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      spriteScale: 1,
      canvasScale: 1,
      totalScale: 1,
      img: new Image(),
      color: null,
      alpha: 0,
      animationSprite: {},
      currentAnimation: 'home',
      currentFrame: 0,
      frameSpeed: 80,
      frameCounter: 0,
      timeoutId: null,
      zIndex: 0,
      rotation: null,
    },
  };

  constructor(private readonly entityStoreService: EntityStoreService) {}

  init(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.background.sprite.img.src = 'assets/img/background.png';
    this.background.sprite.img.onload = () => {
      this.background.sprite.width = this.canvas.offsetWidth;
      this.background.sprite.height = this.canvas.offsetHeight;
      let img = new Image();
      img.src = 'assets/animations/background/home.png';
      img.onload = () => {
        this.background.sprite.animationSprite['home'] = {
          image: img,
          frameWidth: 1100,
          frameHeight: 619,
          drawHeigt: this.canvas.offsetHeight,
          drawWidth: this.canvas.offsetWidth,
          frameCount: img.width / 1100,
          description: '',
          animationType: AnimationType.loop,
        };
        img = new Image();
        img.src = 'assets/animations/background/pokedex.png';
        img.onload = () => {
          this.background.sprite.animationSprite['pokedex'] = {
            image: img,
            frameWidth: 498,
            frameHeight: 445,
            drawHeigt: this.canvas.offsetHeight,
            drawWidth: this.canvas.offsetWidth,
            frameCount: img.width / 498,
            description: '',
            animationType: AnimationType.loop,
          };
          img = new Image();
          img.src = 'assets/animations/background/base.png';
          img.onload = () => {
            this.background.sprite.animationSprite['base'] = {
              image: img,
              frameWidth: 1034,
              frameHeight: 615,
              drawHeigt: this.canvas.offsetHeight,
              drawWidth: this.canvas.offsetWidth,
              frameCount: img.width / 1034,
              description: '',
              animationType: AnimationType.loop,
            };
            this.entityStoreService.addEntity(this.background);
          };
        };
      };
    };
  }

  async fadeOut() {
    await new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        this.background.sprite.alpha--;
        this.fadeOpacity.set(100 - this.background.sprite.alpha);

        if (this.background.sprite.alpha <= 0) {
          this.background.sprite.alpha = 0;
          this.fadeOpacity.set(100);
          clearInterval(interval);
          resolve();
        }
      }, 10);
    });
  }

  changeAnimation(animationName: string) {
    this.background.sprite.currentAnimation = animationName;
    this.background.sprite.frameCounter = 0;
  }

  async fadeIn() {
    await new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        this.background.sprite.alpha++;
        this.fadeOpacity.set(100 - this.background.sprite.alpha);

        if (this.background.sprite.alpha >= 100) {
          this.background.sprite.alpha = 100;
          this.fadeOpacity.set(0);
          clearInterval(interval);
          resolve();
        }
      }, 10);
    });
  }
}

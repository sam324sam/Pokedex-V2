import { Injectable, signal } from '@angular/core';
import { Entity } from '../models/entity/entity.model';
import { EntityStoreService } from './entity-store.service';
import { DataService } from './data.service';
import { Router } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class BackgroundService {
  readonly fadeOpacity = signal(0);
  canvas!: HTMLCanvasElement;
  background!: Entity;

  constructor(
    private readonly entityStoreService: EntityStoreService,
    private readonly dataService: DataService,
    private readonly router: Router,
  ) {}

  async changeView(url: string) {
    await this.fadeOut();
    await this.router.navigateByUrl(url);
  }

  init(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.background = this.dataService.background;
    // Por si recarga en una pagina que no es el home
    let route = this.router.routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const background = route.snapshot.data['background'];
    if (background) {
      this.changeAnimation(background);
    }

    for (const [, element] of Object.entries(this.background.sprite.animationSprite)) {
      element.drawWidth = this.canvas.offsetWidth;
      element.drawHeigt = this.canvas.offsetHeight;
    }
    this.background.sprite.width = this.canvas.offsetWidth;
    this.background.sprite.height = this.canvas.offsetHeight;
    this.entityStoreService.addEntity(this.background);
  }

  changeAnimation(animationName: string) {
    if (!this.background) {
      return;
    }

    this.background.sprite.currentAnimation = animationName;
    this.background.sprite.frameCounter = 0;
  }

  async fadeOut() {
    await new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        this.fadeOpacity.update((value) => {
          const next = Math.min(value + 2, 100);

          if (next >= 100) {
            clearInterval(interval);
            resolve();
          }

          return next;
        });
      }, 10);
    });
  }

  async fadeIn() {
    await new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        this.fadeOpacity.update((value) => {
          const next = Math.max(value - 2, 0);

          if (next <= 0) {
            clearInterval(interval);
            resolve();
          }

          return next;
        });
      }, 10);
    });
  }
}

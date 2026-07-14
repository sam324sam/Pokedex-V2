import { Injectable, signal } from '@angular/core';
import { Entity } from '../models/entity/entity.model';
import { AnimationFromJson, AnimationType } from '../models/sprites/animation-sprite.model';
// Json
import backgroundJson from '../../assets/background.json';
import musicJson from '../../assets/sound/music.json';
import efectsJson from '../../assets/sound/efects.json';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  background!: Entity;
  readonly isLoading = signal(true);

  music: Map<string, string> = new Map();
  efects: Map<string, string> = new Map();

  async loadAllAssets(): Promise<void> {
    try {
      this.background = await this.loadEntity(backgroundJson);
      this.loadSound();
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Cargar Sonido
   */
  loadSound() {
    // Musica
    for (const element of musicJson) {
      this.music.set(element.name, element.src);
    }

    // Efectos
    for (const element of efectsJson) {
      this.efects.set(element.name, element.src);
    }
  }
  /**
   * Carga una entidad desde un json
   */
  private async loadEntity(data: any): Promise<Entity> {
    const entity: Entity = {
      ...data,
      sprite: {
        ...data.sprite,
        img: new Image(),
        animationSprite: {},
        timeoutId: null,
      },
    };

    // Esperar a que cargue la imagen principal
    await new Promise<void>((resolve, reject) => {
      entity.sprite.img.onload = () => resolve();
      entity.sprite.img.onerror = reject;
      entity.sprite.img.src = data.sprite.img;
    });

    // Cargar todas las animaciones
    await this.loadAnimations(entity, data.sprite.animations);

    return entity;
  }

  /**
   * Carga todas las animaciones de una entidad
   */
  private async loadAnimations(
    entity: Entity,
    animations: Record<string, AnimationFromJson>,
  ): Promise<void> {
    const promises = Object.entries(animations).map(([key, animation]) =>
      this.loadAnimation(entity, key, animation),
    );

    await Promise.all(promises);
  }

  /**
   * Carga una animacion
   */
  private async loadAnimation(
    entity: Entity,
    name: string,
    animation: AnimationFromJson,
  ): Promise<void> {
    try {
      const img = new Image();

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();

        img.onerror = () => {
          console.error('No se pudo cargar:', name);
          reject(new Error(name));
        };

        img.src = animation.src;
      });

      entity.sprite.animationSprite[name] = {
        image: img,
        frameWidth: animation.frameWidth,
        frameHeight: animation.frameHeight,
        drawWidth: 0,
        drawHeigt: 0,
        frameCount: img.width / animation.frameWidth,
        description: animation.description,
        animationType: AnimationType[animation.animationType as keyof typeof AnimationType],
      };
    } catch (error) {
      console.log(error, 'en la animacion', name);
    }
  }
  /**
   * Devuelve el mapa de musica
   */
  getMusic(): Map<string, string> {
    return this.music;
  }

  /**
   * Devuelve el mapa de efectos
   */
  getEfects(): Map<string, string> {
    return this.efects;
  }
}

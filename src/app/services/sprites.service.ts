import { Injectable } from '@angular/core';
// Modelos
import { Sprite } from '../models/sprites/sprites.model';
// Servicios
import { AnimationService } from './animation.service';
import { EntityStoreService } from './entity-store.service';
import { Entity } from '../models/entity/entity.model';

@Injectable({ providedIn: 'root' })
export class SpriteService {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  canvasScale = 1;
  debugColliders: boolean = false;

  constructor(
    private readonly animationService: AnimationService,
    private readonly entityStoreService: EntityStoreService,
  ) {}

  init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    // se puede ejecutar lo que sea para setear el canva a dibujar luego cambiar nombre a set o algo

    this.ctx = canvas.getContext('2d')!;
    this.ctx.imageSmoothingEnabled = false;

  }


  render(): void {
    try {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (const e of this.entityStoreService.getZOrder()) {
        this.limitToCanvas(e.sprite);

        if (e.sprite.rotation == null) {

          this.renderEntity(e);
        } else {
          this.renderRotateSprite(e.sprite);
        }
      }

      if (this.debugColliders) {
        this.renderColliders();
      }
    } catch (error) {
      console.log('Error al renderizar en sprite service', error);
    }
  }

  /**
   * Renderiza las entidades no especiales
   * @param entity
   */
  private renderEntity(entity: Entity): void {
    const sprite: Sprite = entity.sprite;

    // Luego veo para que solo realice el calculo cuando se redimencione el canvas solo
    sprite.canvasScale = this.canvasScale;
    sprite.totalScale = Math.round(this.canvasScale * sprite.spriteScale);

    const animation = this.animationService.getAnimation(sprite);

    this.ctx.save();
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.globalAlpha = sprite.alpha / 100;
    if (animation?.image.complete) {
      const frameIndex = sprite.currentFrame;
      // mueve la casilla en la se encuentra el fotograma a ver
      const sx = frameIndex * animation.frameWidth;
      const sy = 0;

      this.ctx.drawImage(
        animation.image,
        sx,
        sy,
        animation.frameWidth,
        animation.frameHeight,
        sprite.x,
        sprite.y,
        animation.drawWidth * sprite.totalScale,
        animation.drawHeigt * sprite.totalScale,
      );
    } else if (sprite.img) {
      this.ctx.drawImage(
        sprite.img,
        sprite.x,
        sprite.y,
        sprite.width * sprite.totalScale,
        sprite.height * sprite.totalScale,
      );
    }
    this.applyColorOverlay(sprite);
    this.ctx.restore();
  }

  /**
   * Aplica un color solido encima del sprite si tiene color definido
   */
  private applyColorOverlay(sprite: Sprite) {
    if (sprite.color) {
      this.ctx.globalCompositeOperation = 'source-atop';
      this.ctx.fillStyle = sprite.color.color;
      this.ctx.fillRect(
        sprite.x,
        sprite.y,
        sprite.width * sprite.totalScale,
        sprite.height * sprite.totalScale,
      );
    }
  }

  /**
   * Renderiza los objetos que se estan rotando. ( aun no va si el sprite contiene un animation set)
   */
  private renderRotateSprite(sprite: Sprite): void {
    if (sprite.rotation == null) return;
    const frame = sprite.img;
    this.ctx.save();
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.globalAlpha = sprite.alpha / 100;
    const width = sprite.width * sprite.totalScale;
    const height = sprite.height * sprite.totalScale;
    // Mover el origen al centro del sprite
    this.ctx.translate(sprite.x + width / 2, sprite.y + height / 2);
    this.ctx.rotate(sprite.rotation);

    if (
      frame instanceof HTMLImageElement &&
      frame.complete &&
      frame.naturalWidth > 0 &&
      frame.naturalHeight > 0 &&
      Number.isFinite(sprite.width) &&
      Number.isFinite(sprite.height)
    ) {
      // Dibujar centrado
      this.ctx.drawImage(frame, -width / 2, -height / 2, width, height);
    }
    this.ctx.restore();
  }

  /**
   * Renderiza los colliders de todas las entidades para depuracion
   */
  private renderColliders(): void {
    if (!this.ctx) return;

    const entities = this.entityStoreService.getZOrder();
    this.ctx.save();
    this.ctx.strokeStyle = 'red';
    this.ctx.lineWidth = 1;

    for (const e of entities) {
      if (!e.collider) continue;

      const c = e.collider;
      const s = e.sprite.totalScale ?? 1;
      const x = e.sprite.x + c.offsetX * s;
      const y = e.sprite.y + c.offsetY * s;
      const w = c.width * s;
      const h = c.height * s;

      this.ctx.strokeRect(x, y, w, h);
    }

    this.ctx.restore();
  }

  limitToCanvas(sprite: Sprite): void {
    const realWidth = sprite.width * sprite.totalScale;
    const realHeight = sprite.height * sprite.totalScale;

    // Convertir limites reales a coordenadas internas del canvas
    const maxX = this.canvas.width - realWidth;
    const maxY = this.canvas.height - realHeight;

    // Limitar dentro del canvas interno
    if (sprite.x < 0) sprite.x = 0;
    if (sprite.y < 0) sprite.y = 0;

    if (sprite.x > maxX) sprite.x = maxX;
    if (sprite.y > maxY) sprite.y = maxY;
  }

  getCanvas() {
    return this.canvas;
  }

  getScale() {
    return this.canvasScale;
  }
}

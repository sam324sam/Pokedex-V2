import { AfterViewInit, Component, ElementRef, OnDestroy, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Servicios
import { EntityStoreService } from './services/entity-store.service';
import { GameLoopService } from './services/game-loop.service';
import { SpriteService } from './services/sprites.service';
import { BackgroundService } from './services/background.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit, OnDestroy {
  protected readonly title = signal('Pokedex-V2');

  canvasRef!: ElementRef<HTMLCanvasElement>;
  canvas!: HTMLCanvasElement;
  constructor(
    private readonly gameLoopService: GameLoopService,
    private readonly entityStoreService: EntityStoreService,
    private readonly spriteService: SpriteService,
    readonly backgroundService: BackgroundService,
  ) {}

  ngOnDestroy() {
    this.gameLoopService.stop();
  }

  // Despues de cargar los componentes
  ngAfterViewInit() {
    this.canvas = document.getElementById('canvas-background') as HTMLCanvasElement;
    this.spriteService.init(this.canvas);

    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.backgroundService.init(this.canvas);

    // iniciar loop al final
    this.gameLoopService.start();
  }
  
}

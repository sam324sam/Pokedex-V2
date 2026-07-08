import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Servicios
import { GameLoopService } from './services/game-loop.service';
import { SpriteService } from './services/sprites.service';
import { BackgroundService } from './services/background.service';
import { DataService } from './services/data.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnDestroy, OnInit {
  protected readonly title = signal('Pokedex-V2');
  @ViewChild('canvas')
  private readonly canvasRef!: ElementRef<HTMLCanvasElement>;
  canvas!: HTMLCanvasElement;
  constructor(
    private readonly gameLoopService: GameLoopService,
    private readonly spriteService: SpriteService,
    readonly backgroundService: BackgroundService,
    readonly dataService: DataService,
  ) {}

  ngOnDestroy() {
    this.gameLoopService.stop();
  }

  ngOnInit(): void {
    void this.initialize();
  }

  private async initialize(): Promise<void> {
    await this.dataService.loadAllAssets();

    // Esperar al jodido else
    await new Promise((resolve) => setTimeout(resolve));

    this.canvas = this.canvasRef.nativeElement;

    this.spriteService.init(this.canvas);

    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;

    this.backgroundService.init(this.canvas);

    this.gameLoopService.start();
  }
}

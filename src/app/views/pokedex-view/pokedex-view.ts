import { AfterViewInit, Component } from '@angular/core';
import { BackgroundService } from '../../services/background.service';

@Component({
  selector: 'app-pokedex-view',
  imports: [],
  templateUrl: './pokedex-view.html',
  styleUrl: './pokedex-view.css',
})
export class PokedexView implements AfterViewInit {
  constructor(private readonly backgroundService: BackgroundService) {}
  ngAfterViewInit(): void {
    this.backgroundService.changeAnimation('pokedex');
    this.backgroundService.fadeIn();
  }
}

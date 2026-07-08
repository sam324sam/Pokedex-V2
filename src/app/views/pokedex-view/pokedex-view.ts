import { Component, OnInit } from '@angular/core';
import { BackgroundService } from '../../services/background.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokedex-view',
  imports: [],
  templateUrl: './pokedex-view.html',
  styleUrl: './pokedex-view.css',
})
export class PokedexView implements OnInit {
  constructor(
    private readonly backgroundService: BackgroundService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    let route = this.router.routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const background = route.snapshot.data['background'];
    this.backgroundService.changeAnimation(background);
    this.backgroundService.fadeIn();
  }

  changeView() {
    this.backgroundService.changeView('pokedex');
  }
}

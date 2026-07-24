import { Component, OnInit } from '@angular/core';
import { BackgroundService } from '../../services/background.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-view',
  imports: [],
  templateUrl: './home-view.html',
  styleUrl: './home-view.css',
})
export class HomeView implements OnInit {
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

  changeView(url: string) {
    this.backgroundService.changeView(url);
  }
}

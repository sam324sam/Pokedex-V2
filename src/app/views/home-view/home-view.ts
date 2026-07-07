import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackgroundService } from '../../services/background.service';

@Component({
  selector: 'app-home-view',
  imports: [],
  templateUrl: './home-view.html',
  styleUrl: './home-view.css',
})
export class HomeView implements AfterViewInit {
  constructor(
    private readonly backgroundService: BackgroundService,
    private readonly router: Router,
  ) {}
  async changeBackground() {
    await this.backgroundService.fadeOut();
    // router
    this.router.navigate(['/pokedex']);
  }

  ngAfterViewInit(): void {
    this.backgroundService.changeAnimation('home')
    this.backgroundService.fadeIn();
  }
}

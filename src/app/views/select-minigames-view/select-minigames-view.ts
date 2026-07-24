import { Component, HostListener, OnInit, signal } from '@angular/core';
import { BackgroundService } from '../../services/background.service';
import { Router } from '@angular/router';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-select-minigames-view',
  imports: [],
  templateUrl: './select-minigames-view.html',
  styleUrl: './select-minigames-view.css',
})
export class SelectMinigamesView implements OnInit{
  constructor(
    private readonly backgroundService: BackgroundService,
    private readonly router: Router,
    private readonly animationService: AnimationService,
  ) {}

  showUi = signal(false);
  timeout: number = 0;
  private skipAnimation = false;

  ngOnInit(): void {
    let route = this.router.routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }
    const background = route.snapshot.data['background'];
    this.backgroundService.fadeIn();
    this.backgroundService.changeAnimation(background);

    if (
      this.backgroundService.background.sprite.animationSprite[background].animationType == 'once'
    ) {
      this.backgroundService.background.sprite.defaultAnimation = '';
      this.timeout = setTimeout(
        () => {
          this.showUi.set(true);
          this.skipAnimation = true;
        },
        this.animationService.getAnimationDuration(
          this.backgroundService.background.sprite,
          background,
        ),
      );
    }
  }

  /*@HostListener('document:click')
  onFirstClick() {
    if (this.skipAnimation) return;
    clearTimeout(this.timeout);
    this.skipAnimation = true;
    this.backgroundService.changeAnimation('');
    this.showUi.set(true);
  }*/
}

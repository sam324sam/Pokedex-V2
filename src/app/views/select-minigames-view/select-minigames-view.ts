import { Component, OnInit, signal } from '@angular/core';
import { BackgroundService } from '../../services/background.service';
import { Router } from '@angular/router';
import { AnimationService } from '../../services/animation.service';
import { SoundService } from '../../services/sound.service';
import { MemoryComponent } from './components/memory-component/memory-component';

@Component({
  selector: 'app-select-minigames-view',
  imports: [MemoryComponent],
  templateUrl: './select-minigames-view.html',
  styleUrl: './select-minigames-view.css',
})
export class SelectMinigamesView implements OnInit {
  constructor(
    private readonly backgroundService: BackgroundService,
    private readonly router: Router,
    private readonly animationService: AnimationService,
    private readonly soundService: SoundService,
  ) {}

  currentDisplay = signal<ButtonsGame>('select');

  buttons = [
    {
      id: 'memory' as ButtonsGame,
      text: 'Juego de memoria basado en pokemon',
      src: 'assets/img/icons/buttons/memory-game.png',
    },
    {
      id: 'what pokemon' as ButtonsGame,
      text: 'Juego de descubrir el pokemon misterioso',
      src: 'assets/img/icons/buttons/description.png',
    },
  ];

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

  changeDisplay(display: ButtonsGame) {
    this.soundService.playEfects('select');
    this.currentDisplay.set(display);
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

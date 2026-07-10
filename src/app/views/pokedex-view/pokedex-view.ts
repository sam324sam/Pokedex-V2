import { Component, OnInit, signal } from '@angular/core';
import { BackgroundService } from '../../services/background.service';
import { Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { AnimationService } from '../../services/animation.service';
import { PokemonInfoComponent } from './components/pokemon-info-component/pokemon-info-component';

@Component({
  selector: 'app-pokedex-view',
  imports: [PokemonInfoComponent],
  templateUrl: './pokedex-view.html',
  styleUrl: './pokedex-view.css',
})
export class PokedexView implements OnInit {
  pokemonList: any[] = [];
  currentIndex: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 42;
  showUi = signal(false);
  constructor(
    private readonly backgroundService: BackgroundService,
    private readonly router: Router,
    private readonly apiService: PokemonService,
    private readonly animationService: AnimationService,
  ) {}

  ngOnInit(): void {
    this.apiService.getAllListPokemon().subscribe((response) => {
      this.pokemonList = response.results;
    });

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
      this.backgroundService.background.sprite.defaultAnimation = 'pokedex';
      setTimeout(
        () => {
          this.showUi.set(true);
        },
        this.animationService.getAnimationDuration(
          this.backgroundService.background.sprite,
          background,
        ),
      );
    }
  }

  getPokemonId(url: string): number {
    return Number(url.split('/').filter(Boolean).pop());
  }

  changeView() {
    this.backgroundService.changeView('pokedex');
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/img/icons/not-found.png';
  }

  // Parte de la api
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  get totalPages(): number {
    return Math.ceil(this.pokemonList.length / this.itemsPerPage);
  }

  get currentPokemons(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.pokemonList.slice(start, start + this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;

    const start = Math.max(1, current - 2);
    const end = Math.min(total, current + 2);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
}

import { Component, OnInit } from '@angular/core';
import { BackgroundService } from '../../services/background.service';
import { Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon/pokemon.service';

@Component({
  selector: 'app-pokedex-view',
  imports: [],
  templateUrl: './pokedex-view.html',
  styleUrl: './pokedex-view.css',
})
export class PokedexView implements OnInit {
  pokemonList: any[] = [];
  currentIndex: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 42;
  constructor(
    private readonly backgroundService: BackgroundService,
    private readonly router: Router,
    private readonly apiService: PokemonService,
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
    this.backgroundService.changeAnimation(background);
    this.backgroundService.fadeIn();
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

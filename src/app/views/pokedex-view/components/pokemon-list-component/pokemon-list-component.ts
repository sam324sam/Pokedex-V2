import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pokemon-list-component',
  imports: [],
  templateUrl: './pokemon-list-component.html',
  styleUrl: './pokemon-list-component.css',
})
export class PokemonListComponent {
  currentIndex: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 42;
  @Input() pokemonList: any[] = [];
  @Output() selectPokemon = new EventEmitter<string>();

  sendSelectPokemon(name: string) {
    this.selectPokemon.emit(name);
  }

  getPokemonId(url: string): number {
    return Number(url.split('/').filter(Boolean).pop());
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

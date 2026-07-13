import { Component, computed, effect, EventEmitter, input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemon-list-component',
  imports: [FormsModule],
  templateUrl: './pokemon-list-component.html',
  styleUrl: './pokemon-list-component.css',
})
export class PokemonListComponent {
  // signal pero para la vari que llega del padre
  pokemonList = input<any[]>([]);
  @Output() selectPokemon = new EventEmitter<string>();

  pokemonSearch = signal('');
  currentPage = signal(1);
  itemsPerPage = 42;

  constructor() {
    effect(() => {
      this.pokemonSearch();
      this.currentPage.set(1);
    });
  }

  // Aplicar el filtro por nombre
  resultadosFiltrados = computed(() => {
    const filtro = this.pokemonSearch().toLowerCase().trim();
    const lista = this.pokemonList();

    if (!filtro) return lista;

    return lista.filter((item) => item.name.toLowerCase().includes(filtro));
  });

  // aplicar la paginacion al filtrado
  totalPages = computed(() => Math.ceil(this.resultadosFiltrados().length / this.itemsPerPage));

  currentPokemons = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    return this.resultadosFiltrados().slice(start, start + this.itemsPerPage);
  });

  pageNumbers = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();

    const start = Math.max(1, current - 2);
    const end = Math.min(total, current + 2);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

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

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((p) => p + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((p) => p - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;

    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

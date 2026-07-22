import { Component, computed, effect, EventEmitter, input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SoundService } from '../../../../services/sound.service';

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

  constructor(private readonly soundService: SoundService) {
    effect(() => {
      this.pokemonSearch();
      this.currentPage.set(1);
    });
  }

  // Aplicar el filtro por nombre
  resulFilter = computed(() => {
    const filter = this.pokemonSearch().toLowerCase().trim();
    const list = this.pokemonList();

    if (!filter) return list;

    return list.filter((item) => item.name.toLowerCase().includes(filter));
  });

  // aplicar la paginacion al filtrado
  totalPages = computed(() => Math.ceil(this.resulFilter().length / this.itemsPerPage));

  currentPokemons = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    return this.resulFilter().slice(start, start + this.itemsPerPage);
  });

  pageNumbers = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();

    const start = Math.max(1, current - 2);
    const end = Math.min(total, current + 2);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  closeKeyboard(input: HTMLInputElement): void {
    input.blur();
  }

  playEfectSearch() {
    this.soundService.playEfects('search-bar', 0.4);
  }

  sendSelectPokemon(name: string) {
    this.soundService.playEfects('select');
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
      this.soundService.playEfects('select');
      this.currentPage.update((p) => p + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.soundService.playEfects('select');
      this.currentPage.update((p) => p - 1);
    }
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.soundService.playEfects('select');
    this.currentPage.set(page);
  }
}

import { Component, computed, Input, OnInit, signal } from '@angular/core';
import { MovePokemon } from '../../../../../../models/pokemon/pokemon.model';
import { MoveService } from '../../../../../../services/pokemon/move.service';
import { Move } from '../../../../../../models/pokemon/move.model';
import { SoundService } from '../../../../../../services/sound.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-moves-component',
  imports: [FormsModule],
  templateUrl: './moves-component.html',
  styleUrl: './moves-component.css',
})
export class MovesComponent implements OnInit {
  @Input() movesPokemon: MovePokemon[] = [];
  isLoading = signal(false);
  moves: Move[] = [];
  selectedMovePokemon: MovePokemon | null = null;
  @Input() moveInput: Move | null = null;
  move: Move | null = null;

  moveSearch = signal('');

  constructor(
    private readonly moveService: MoveService,
    private readonly soundService: SoundService,
  ) {}

  ngOnInit(): void {
    this.isLoading.set(true);

    // Cuando viene del evolution
    this.move = this.moveInput;
    this.selectedMovePokemon =
      this.movesPokemon.find((m) => m.move.name === this.move?.name) ?? null;

    this.moveService.getMovesData(this.movesPokemon).subscribe((moves) => {
      this.moves = moves;
      this.isLoading.set(false);
    });
  }

  resulFilter = computed(() => {
    const filter = this.moveSearch().toLowerCase().trim();
    const list = this.moves;

    if (!filter) return list;

    return list.filter((item) => this.getSpanishName(item).toLowerCase().includes(filter));
  });

  playEfectSearch() {
    this.soundService.playEfects('search-bar', 0.4);
  }

  closeKeyboard(input: HTMLInputElement): void {
    input.blur();
  }

  getSpanishName(move: Move): string {
    return move.names.find((n) => n.language.name === 'es')?.name ?? move.name;
  }

  getSpanishDescription(move: Move): string {
    return (
      move.flavor_text_entries
        .find((f) => f.language.name === 'es')
        ?.flavor_text.replaceAll('\n', ' ')
        .replaceAll('\f', ' ') ?? ''
    );
  }

  selectMove(move: Move) {
    this.move = move;

    this.selectedMovePokemon = this.movesPokemon.find((m) => m.move.name === move.name) ?? null;

    this.soundService.playEfects('select');
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/img/icons/not-found-96.png';
  }

  getMoveLearnMethodText(method: string): string {
    switch (method) {
      case 'level-up':
        return 'Se aprende al subir de nivel';

      case 'machine':
        return 'Se aprende mediante una MT';

      case 'tutor':
        return 'Se aprende con un Tutor de movimientos';

      case 'egg':
        return 'Se obtiene como Movimiento Huevo';

      case 'form-change':
        return 'Se obtiene al cambiar de forma';

      case 'light-ball-egg':
        return 'Movimiento Huevo (requiere Bola Luminosa)';

      case 'zygarde-cube':
        return 'Se obtiene usando el Cubo Zygarde';

      case 'colosseum-purification':
        return 'Se obtiene al purificar un Pokémon';

      case 'xd-shadow':
        return 'Movimiento exclusivo de Pokémon XD';

      case 'stadium-surfing-pikachu':
        return 'Movimiento exclusivo de Pikachu Surf';

      default:
        return method;
    }
  }
}

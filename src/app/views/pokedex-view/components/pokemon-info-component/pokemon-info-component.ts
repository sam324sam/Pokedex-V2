import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  signal,
  SimpleChanges,
} from '@angular/core';
import { PokemonService } from '../../../../services/pokemon/pokemon.service';
import { Pokemon, PokemonSpecies } from '../../../../models/pokemon/pokemon.model';
import { Subscription } from 'rxjs';
import { SoundService } from '../../../../services/sound.service';
@Component({
  selector: 'app-pokemon-info-component',
  imports: [],
  templateUrl: './pokemon-info-component.html',
  styleUrl: './pokemon-info-component.css',
})
export class PokemonInfoComponent implements OnChanges, OnDestroy {
  @Input() pokemonNameSelect = '';
  pokemonInfo: Pokemon | null = null;
  pokemonSpecies: PokemonSpecies | null = null;
  isLoading = signal(false);
  shiny = signal(false);
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly cdr: ChangeDetectorRef,
    private readonly soundService: SoundService,
  ) {}

  private readonly pokemonSubscription?: Subscription;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemonNameSelect']?.currentValue) {
      this.isLoading.set(true);
      this.pokemonSubscription?.unsubscribe();

      this.pokemonInfo = null;
      this.pokemonSpecies = null;

      this.pokemonService.getPokemon(this.pokemonNameSelect).subscribe((pokemon) => {
        this.pokemonInfo = pokemon;
        this.isLoading.set(false);
        this.pokemonService.getPokemonSpecie(pokemon.species.name).subscribe((species) => {
          this.pokemonSpecies = species;
          console.log(this.pokemonInfo);
          // Esto siempre lo arregla
          setTimeout(() => {
            this.cdr.detectChanges();
          });
          this.cdr.detectChanges();
        });
      });
    }
  }

  viewShiny() {
    this.shiny.set(!this.shiny());
    this.soundService.playEfects('select');
  }

  ngOnDestroy(): void {
    this.pokemonSubscription?.unsubscribe();
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/img/icons/not-found-96.png';
  }

  get backGroundImg(): string {
    if (this.pokemonInfo?.types.length == 2) {
      return 'assets/img/icons/box-info-pokemon-double.png';
    } else {
      return 'assets/img/icons/box-info-pokemon.png';
    }
  }

  get description(): string {
    if (!this.pokemonSpecies) return '';

    const entry = this.pokemonSpecies.flavor_text_entries.find((e) => e.language.name === 'es');

    return entry?.flavor_text.replaceAll('\n', ' ').replaceAll('\f', ' ') ?? '';
  }
}

import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  signal,
  SimpleChanges,
} from '@angular/core';
import { DescriptionComponent } from './components/description-component/description-component';
import { PokemonService } from '../../../../services/pokemon/pokemon.service';
import { Pokemon, PokemonSpecies } from '../../../../models/pokemon/pokemon.model';
import { Subscription } from 'rxjs';
import { SoundService } from '../../../../services/sound.service';
import { MovesComponent } from './components/moves-component/moves-component';
import { AbilitiesComponent } from './components/abilities-component/abilities-component';
import { StatsComponent } from './components/stats-component/stats-component';
import { EvolutionComponent } from './components/evolution-component/evolution-component';
import { CombatComponent } from './components/combat-component/combat-component';

type Display = 'description' | 'moves' | 'stats' | 'abilities' | 'evolution' | 'combat';

@Component({
  selector: 'app-pokemon-info-component',
  imports: [
    DescriptionComponent,
    MovesComponent,
    AbilitiesComponent,
    StatsComponent,
    EvolutionComponent,
    CombatComponent
  ],
  templateUrl: './pokemon-info-component.html',
  styleUrl: './pokemon-info-component.css',
})
export class PokemonInfoComponent implements OnChanges, OnDestroy {
  @Input() pokemonNameSelect = '';
  pokemonInfo: Pokemon | null = null;
  pokemonSpecies: PokemonSpecies | null = null;
  isLoading = signal(false);
  shiny = signal(false);
  audioplaying = signal(false)
  // Apartado para los botones
  currentDisplay = signal<Display>('description');
  private readonly defaultSprite =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  buttons = [
    {
      id: 'description' as Display,
      text: 'Descripción',
      src: 'assets/img/icons/buttons/description.png',
    },

    {
      id: 'stats' as Display,
      text: 'Estadisticas',
      src: 'assets/img/icons/buttons/stats.png',
    },
    {
      id: 'combat' as Display,
      text: 'Combate',
      src: 'assets/img/icons/buttons/combat.png',
    },
    {
      id: 'moves' as Display,
      text: 'Movimientos',
      src: 'assets/img/icons/buttons/moves.png',
    },

    {
      id: 'abilities' as Display,
      text: 'Habilidades',
      src: 'assets/img/icons/buttons/abilities.png',
    },
    {
      id: 'evolution' as Display,
      text: 'Evoluciones',
      src: 'assets/img/icons/buttons/evolution.png',
    },
  ];

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
          console.log("Pokemon Info" ,this.pokemonInfo, "Pokemon spices", this.pokemonSpecies);
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

    if (!this.pokemonInfo) {
      img.src = 'assets/img/icons/not-found-96.png';
      return;
    }

    if (img.src.endsWith('.gif')) {
      img.src = this.shiny()
        ? `${this.defaultSprite}shiny/${this.pokemonInfo.id}.png`
        : `${this.defaultSprite}${this.pokemonInfo.id}.png`;
    } else {
      img.src = 'assets/img/icons/not-found-96.png';
    }
  }

  changeDisplay(display: Display) {
    this.currentDisplay.set(display);
    this.soundService.playEfects('select');
  }

  async playCries(src: string){
    this.audioplaying.set(true)
    await this.soundService.playEfects('', 0.2, src);
    this.audioplaying.set(false)
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

  get pokemonSprite(): string {
    if (!this.pokemonInfo) {
      return '';
    }

    const id = this.pokemonInfo.id;

    if (this.shiny()) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/${id}.gif`;
    }

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
  }
}

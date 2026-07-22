import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Pokemon, PokemonSpecies } from '../../../../../../models/pokemon/pokemon.model';
import { EvolutionService } from '../../../../../../services/pokemon/evolution.service';
import { ChainLink, EvolutionChain } from '../../../../../../models/pokemon/evolution.model';
import { PokemonService } from '../../../../../../services/pokemon/pokemon.service';
import { firstValueFrom } from 'rxjs';
import { SoundService } from '../../../../../../services/sound.service';
import { EvolutionNode } from '../../../../../../components/evolution-node/evolution-node';
import { Move } from '../../../../../../models/pokemon/move.model';

@Component({
  selector: 'app-evolution-component',
  imports: [EvolutionNode],
  templateUrl: './evolution-component.html',
  styleUrl: './evolution-component.css',
})
export class EvolutionComponent implements OnChanges {
  @Input() pokemonSpecies: PokemonSpecies | null = null;
  @Output() changePokemonInfo = new EventEmitter<Pokemon>();
  @Output() showMoveData = new EventEmitter<Move>()
  evolutionChain: EvolutionChain = {} as EvolutionChain;
  isLoading = signal(false);

  constructor(
    private readonly evolutionService: EvolutionService,
    private readonly pokemonService: PokemonService,
    private readonly soundService: SoundService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemonSpecies']?.currentValue) {
      this.loadEvolution();
    }
  }

  private async loadEvolution(): Promise<void> {
    if (!this.pokemonSpecies) return;

    this.isLoading.set(true);
    try {
      this.evolutionChain = await firstValueFrom(
        this.evolutionService.getEvolutionChain(this.pokemonSpecies),
      );

      await this.loadPokemon(this.evolutionChain.chain);
      console.log(this.evolutionChain)
      this.isLoading.set(false);
    } catch (error) {
      this.isLoading.set(false);
      console.log(error);
    }
  }

  private async loadPokemon(node: ChainLink): Promise<void> {
    node.pokemon = await firstValueFrom(this.pokemonService.getPokemon(node.species.name));

    for (const child of node.evolves_to) {
      await this.loadPokemon(child);
    }
  }

  getEvolutionList(node: ChainLink): ChainLink[] {
    const result: ChainLink[] = [node];

    node.evolves_to.forEach((child) => {
      result.push(...this.getEvolutionList(child));
    });

    return result;
  }

  changePokemon(pokemonInfo: Pokemon) {
    this.soundService.playEfects('select');
    this.changePokemonInfo.emit(pokemonInfo);
  }
}

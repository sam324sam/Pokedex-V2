import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChainLink } from '../../models/pokemon/evolution.model';
import { Pokemon } from '../../models/pokemon/pokemon.model';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-evolution-node',
  imports: [],
  templateUrl: './evolution-node.html',
  styleUrl: './evolution-node.css',
})
export class EvolutionNode {
  @Input() node: ChainLink | null = null;
  @Output() changePokemonInfo = new EventEmitter<Pokemon>();

  constructor(private readonly soundService: SoundService) {}

  changePokemon(pokemon: Pokemon) {
    this.soundService.playEfects('select');
    this.changePokemonInfo.emit(pokemon);
  }

}

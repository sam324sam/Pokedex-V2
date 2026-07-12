import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PokemonService } from '../../../../services/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon-info-component',
  imports: [],
  templateUrl: './pokemon-info-component.html',
  styleUrl: './pokemon-info-component.css',
})
export class PokemonInfoComponent implements OnChanges {
  @Input() pokemonNameSelect = '';

  pokemonInfo: any = {};

  constructor(private readonly pokemonService: PokemonService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemonNameSelect']?.currentValue) {
      this.pokemonService.getPokemon(this.pokemonNameSelect).subscribe((response) => {
        this.pokemonInfo = response;
        console.log(response);
      });
    }
  }
}

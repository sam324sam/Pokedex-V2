import { Component, Input } from '@angular/core';
import { AbilityPokemon } from '../../../../../../models/pokemon/pokemon.model';

@Component({
  selector: 'app-abilities-component',
  imports: [],
  templateUrl: './abilities-component.html',
  styleUrl: './abilities-component.css',
})
export class AbilitiesComponent {
  @Input() abilities: AbilityPokemon[] = [];
}

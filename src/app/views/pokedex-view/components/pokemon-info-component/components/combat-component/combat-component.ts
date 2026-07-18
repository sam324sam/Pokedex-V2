import { Component, Input, OnInit, signal } from '@angular/core';
import { TypeService } from '../../../../../../services/pokemon/type.service';
import { TypeDetails } from '../../../../../../models/pokemon/type.model';
import { TypePokemon } from '../../../../../../models/pokemon/pokemon.model';

@Component({
  selector: 'app-combat-component',
  imports: [],
  templateUrl: './combat-component.html',
  styleUrl: './combat-component.css',
})
export class CombatComponent implements OnInit {

  @Input() typesPokemon: TypePokemon[] = [];

  isLoading = signal(false);

  types: TypeDetails[] = [];

  readonly ALL_TYPES = [
    'normal',
    'fire',
    'water',
    'electric',
    'grass',
    'ice',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ghost',
    'dragon',
    'dark',
    'steel',
    'fairy'
  ];

  constructor(private readonly typeService: TypeService) {}

  ngOnInit(): void {

    this.isLoading.set(true);

    this.typeService.getTypes(this.typesPokemon).subscribe(types => {
      this.types = types;
      this.isLoading.set(false);
    });

  }

  private getTypeMultipliers(): Map<string, number> {

    const multipliers = new Map<string, number>();

    // Todos empiezan haciendo daño normal
    this.ALL_TYPES.forEach(type => multipliers.set(type, 1));

    for (const type of this.types) {

      type.damage_relations.double_damage_from.forEach(({ name }) => {
        multipliers.set(name, multipliers.get(name)! * 2);
      });

      type.damage_relations.half_damage_from.forEach(({ name }) => {
        multipliers.set(name, multipliers.get(name)! * 0.5);
      });

      type.damage_relations.no_damage_from.forEach(({ name }) => {
        multipliers.set(name, 0);
      });

    }

    return multipliers;
  }

  private getByMultiplier(multiplier: number) {
    return [...this.getTypeMultipliers()]
      .filter(([_, value]) => value === multiplier)
      .map(([name]) => ({ name }));
  }

  get superWeak() {
    return this.getByMultiplier(4);
  }

  get weak() {
    return this.getByMultiplier(2);
  }

  get normalDamage() {
    return this.getByMultiplier(1);
  }

  get resistant() {
    return this.getByMultiplier(0.5);
  }

  get superResistant() {
    return this.getByMultiplier(0.25);
  }

  get immune() {
    return this.getByMultiplier(0);
  }

}
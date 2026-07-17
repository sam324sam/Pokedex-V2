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
  constructor(private readonly typeService: TypeService) {}

  ngOnInit(): void {
    this.typeService.getTypes(this.typesPokemon).subscribe((types) => {
      setTimeout(() => {
        this.types = types;
        this.isLoading.set(false);
      });
    });
  }

  private getTypeMultipliers(): Map<string, number> {
    const multipliers = new Map<string, number>();

    for (const type of this.types) {
      // x2
      type.damage_relations.double_damage_from.forEach(({ name }) => {
        multipliers.set(name, (multipliers.get(name) ?? 1) * 2);
      });

      // x0.5
      type.damage_relations.half_damage_from.forEach(({ name }) => {
        multipliers.set(name, (multipliers.get(name) ?? 1) * 0.5);
      });

      // x0
      type.damage_relations.no_damage_from.forEach(({ name }) => {
        multipliers.set(name, 0);
      });
    }

    return multipliers;
  }

  getSuperWeak() {
    return [...this.getTypeMultipliers()]
      .filter(([_, multiplier]) => multiplier === 4)
      .map(([name]) => ({ name }));
  }

  getWeak() {
    return [...this.getTypeMultipliers()]
      .filter(([_, multiplier]) => multiplier === 2)
      .map(([name]) => ({ name }));
  }

  getNormalDamage() {
    return [...this.getTypeMultipliers()]
      .filter(([_, multiplier]) => multiplier === 1)
      .map(([name]) => ({ name }));
  }

  getResistant() {
    return [...this.getTypeMultipliers()]
      .filter(([_, multiplier]) => multiplier === 0.5)
      .map(([name]) => ({ name }));
  }

  getSuperResistant() {
    return [...this.getTypeMultipliers()]
      .filter(([_, multiplier]) => multiplier === 0.25)
      .map(([name]) => ({ name }));
  }

  getImmune() {
    return [...this.getTypeMultipliers()]
      .filter(([_, multiplier]) => multiplier === 0)
      .map(([name]) => ({ name }));
  }
}

import { Component, Input } from '@angular/core';
import { StatPokemon } from '../../../../../../models/pokemon/pokemon.model';

@Component({
  selector: 'app-stats-component',
  imports: [],
  templateUrl: './stats-component.html',
  styleUrl: './stats-component.css',
})
export class StatsComponent {
  @Input() stats: StatPokemon[] = [];
  getBarWidth(value: number): number {
    return Math.min((value / 255) * 100, 100);
  }
}

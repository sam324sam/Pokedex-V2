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

  calculateColor(base_stat: number) {
    if (base_stat < 50) return '#FF5959';
    if (base_stat < 100) return '#FFD700';
    return '#4CAF50';
  };
}

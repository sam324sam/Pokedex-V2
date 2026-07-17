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
  }

  getStatTextColor(stat: number): string {
    const color = this.calculateColor(stat);

    switch (color.toLowerCase()) {
      case '#ff0000':
      case '#dc2626':
        return '#fff';

      case '#ffff00':
      case '#facc15':
        return '#000';

      case '#22c55e':
      case '#00ff00':
        return '#fff';

      default:
        return '#fff';
    }
  }
}

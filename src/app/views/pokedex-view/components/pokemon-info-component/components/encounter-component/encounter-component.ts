import { Component, computed, Input, OnInit, signal } from '@angular/core';
import { LocationAreaEncounter } from '../../../../../../models/pokemon/encounter.model';
import { EncounterService } from '../../../../../../services/pokemon/encounter.service';

interface EncounterRow {
  locationName: string;
  version: string;
  method: string;
  minLevel: number;
  maxLevel: number;
  chance: number;
}

@Component({
  selector: 'app-encounter-component',
  imports: [],
  templateUrl: './encounter-component.html',
  styleUrl: './encounter-component.css',
})
export class EncounterComponent implements OnInit {
  @Input() pokemonId: string | number = 0;
  // Luego poner filtro por juego
  isLoading = signal(true);
  hasError = signal(false);
  rawEncounters = signal<LocationAreaEncounter[]>([]);

  // Agrupado por localización ya con nombres legibles
  encountersByLocation = computed(() => {
    const grouped = new Map<string, EncounterRow[]>();

    for (const area of this.rawEncounters()) {
      const locationName = this.formatName(area.location_area.name);

      for (const versionDetail of area.version_details) {
        for (const detail of versionDetail.encounter_details) {
          const row: EncounterRow = {
            locationName,
            version: this.formatName(versionDetail.version.name),
            method: this.formatName(detail.method.name),
            minLevel: detail.min_level,
            maxLevel: detail.max_level,
            chance: detail.chance,
          };

          if (!grouped.has(locationName)) {
            grouped.set(locationName, []);
          }
          grouped.get(locationName)!.push(row);
        }
      }
    }

    return Array.from(grouped.entries()).map(([location, rows]) => ({
      location,
      rows,
    }));
  });

  hasEncounters = computed(() => this.rawEncounters().length > 0);

  constructor(private readonly encounterService: EncounterService) {}

  ngOnInit(): void {
    this.loadEncounters();
  }

  private loadEncounters(): void {
    this.isLoading.set(true);
    this.hasError.set(false);

    this.encounterService.getEncounters(this.pokemonId).subscribe({
      next: (data) => {
        this.rawEncounters.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });
  }

  private formatName(name: string): string {
    return name
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}

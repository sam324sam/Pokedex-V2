import { Component, Input, OnInit, signal } from '@angular/core';
import { AbilityPokemon } from '../../../../../../models/pokemon/pokemon.model';
import { Ability } from '../../../../../../models/pokemon/ability.model';
import { AbilitiesService } from '../../../../../../services/pokemon/abilities.service';

@Component({
  selector: 'app-abilities-component',
  imports: [],
  templateUrl: './abilities-component.html',
  styleUrl: './abilities-component.css',
})
export class AbilitiesComponent implements OnInit {
  @Input() abilitiesPokemon: AbilityPokemon[] = [];

  isLoading = signal(false);
  abilities: Ability[] = [];

  constructor(private readonly abilitiesService: AbilitiesService) {}

  ngOnInit(): void {
    this.isLoading.set(true);
    console.log(this.abilitiesPokemon);
    this.abilitiesService.getAbilityData(this.abilitiesPokemon).subscribe((abilities) => {
      this.abilities = abilities;
      console.log(this.abilities);
      this.isLoading.set(false);
    });
  }

  getSpanishName(ability: Ability): string {
    return ability.names.find((n) => n.language.name === 'es')?.name ?? ability.name;
  }

  getSpanishDescription(ability: Ability): string {
    return (
      ability.flavor_text_entries
        .find((f) => f.language.name === 'es')
        ?.flavor_text.replace(/[\n\f]/g, ' ') ?? ''
    );
  }
}

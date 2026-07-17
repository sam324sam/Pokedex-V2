import { Component, Input, OnInit, signal } from '@angular/core';
import { AbilityPokemon } from '../../../../../../models/pokemon/pokemon.model';
import { Ability } from '../../../../../../models/pokemon/ability.model';
import { AbilitiesService } from '../../../../../../services/pokemon/abilities.service';
import { SoundService } from '../../../../../../services/sound.service';

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
  currentAbilityIndex = 0;
  constructor(
    private readonly abilitiesService: AbilitiesService,
    private readonly soundService: SoundService,
  ) {}

  ngOnInit(): void {
    this.isLoading.set(true);
    console.log(this.abilitiesPokemon);
    this.abilitiesService.getAbilityData(this.abilitiesPokemon).subscribe((abilities) => {
      this.abilities = abilities;
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

  currentAbility() {
    return this.abilities[this.currentAbilityIndex];
  }

  nextAbility() {
    this.currentAbilityIndex = (this.currentAbilityIndex + 1) % this.abilities.length;
    this.soundService.playEfects('select');
  }

  previousAbility() {
    this.currentAbilityIndex = (this.currentAbilityIndex - 1 + this.abilities.length) % this.abilities.length;
    this.soundService.playEfects('select');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { AbilityPokemon } from '../../models/pokemon/pokemon.model';
import { Ability } from '../../models/pokemon/ability.model';

@Injectable({
  providedIn: 'root',
})
export class AbilitiesService {
  constructor(private readonly http: HttpClient) {}

  getAbilityData(abilities: AbilityPokemon[]): Observable<Ability[]> {
    return forkJoin(abilities.map((ability) => this.http.get<Ability>(ability.ability.url)));
  }
}

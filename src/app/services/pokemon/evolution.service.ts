import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonSpecies } from '../../models/pokemon/pokemon.model';
import { EvolutionChain } from '../../models/pokemon/evolution.model';

@Injectable({
  providedIn: 'root',
})
export class EvolutionService {
  constructor(
    private readonly http: HttpClient) {}

  getEvolutionChain(pokemonSpecies: PokemonSpecies): Observable<EvolutionChain> {
    return this.http.get<EvolutionChain>(pokemonSpecies.evolution_chain.url);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonListResponse } from '../../models/pokemon/pokemon-list.model';
import { Pokemon, PokemonSpecies } from '../../models/pokemon/pokemon.model';
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

  constructor(private readonly http: HttpClient) {}

  getAllListPokemon(): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(this.apiUrl);
  }

  getPokemon(name: string) {
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

  getPokemonSpecie(name: string) {
    return this.http.get<PokemonSpecies>(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
  }
}

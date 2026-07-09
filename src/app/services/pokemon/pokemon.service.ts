import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
    private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

  constructor(private readonly http: HttpClient) {}

  getAllListPokemon(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getPokemon(name: string) {
    return this.http.get<any>(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationAreaEncounter } from '../../models/pokemon/encounter.model';

@Injectable({
  providedIn: 'root',
})
export class EncounterService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private readonly http: HttpClient) {}

  getEncounters(pokemonIdOrName: string | number): Observable<LocationAreaEncounter[]> {
    return this.http.get<LocationAreaEncounter[]>(
      `${this.baseUrl}/pokemon/${pokemonIdOrName}/encounters`,
    );
  }
}

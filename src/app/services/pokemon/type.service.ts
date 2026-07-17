import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { TypePokemon } from '../../models/pokemon/pokemon.model';
import { TypeDetails } from '../../models/pokemon/type.model';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  constructor(private readonly http: HttpClient) {}

  getTypes(types: TypePokemon[]): Observable<TypeDetails[]> {
    return forkJoin(types.map((type) => this.http.get<TypeDetails>(type.type.url)));
  }
}

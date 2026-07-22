import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Move } from '../../models/pokemon/move.model';
import { MovePokemon } from '../../models/pokemon/pokemon.model';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoveService {
  constructor(private readonly http: HttpClient) {}

  getMovesData(moves: MovePokemon[]): Observable<Move[]> {
    const requests = moves.map((move) => this.http.get<Move>(move.move.url));

    return forkJoin(requests);
  }

  getMoveData(moveUrl: string): Observable<Move> {
    return this.http.get<Move>(moveUrl);
  }
}

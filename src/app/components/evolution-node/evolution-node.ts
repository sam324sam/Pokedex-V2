import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { ChainLink } from '../../models/pokemon/evolution.model';
import { Pokemon } from '../../models/pokemon/pokemon.model';
import { SoundService } from '../../services/sound.service';
import { Move } from '../../models/pokemon/move.model';
import { MoveService } from '../../services/pokemon/move.service';

@Component({
  selector: 'app-evolution-node',
  imports: [],
  templateUrl: './evolution-node.html',
  styleUrl: './evolution-node.css',
})
export class EvolutionNode implements OnInit {
  @Input() node: ChainLink | null = null;
  @Output() changePokemonInfo = new EventEmitter<Pokemon>();
  @Output() showMoveData = new EventEmitter<Move>();
  move: Move | null = null;
  moveShow = signal(false);
  constructor(
    private readonly soundService: SoundService,
    private readonly moveService: MoveService,
  ) {}

  ngOnInit(): void {
    if (this.node)
      for (const child of this.node.evolves_to) {
        if (child.evolution_details.length) {
          let detail = child.evolution_details[0];
          if (detail.known_move)
            this.moveService.getMoveData(detail.known_move?.url).subscribe((move) => {
              this.move = move;
              this.moveShow.set(true);
            });
        }
      }
  }

  changePokemon(pokemon: Pokemon) {
    this.soundService.playEfects('select');
    this.changePokemonInfo.emit(pokemon);
  }

  changeDisplayMove() {
    if (this.move) {
      console.log(this.move)
      this.showMoveData.emit(this.move);
      this.soundService.playEfects('select');
    }
  }

  getSpanishName(move: Move): string {
    return move.names.find((n) => n.language.name === 'es')?.name ?? move.name;
  }
}

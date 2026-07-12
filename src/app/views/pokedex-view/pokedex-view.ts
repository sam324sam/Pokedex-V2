import { Component, OnInit, signal } from '@angular/core';
import { BackgroundService } from '../../services/background.service';
import { Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { AnimationService } from '../../services/animation.service';
import { PokemonInfoComponent } from './components/pokemon-info-component/pokemon-info-component';
import { PokemonListComponent } from "./components/pokemon-list-component/pokemon-list-component";

@Component({
  selector: 'app-pokedex-view',
  imports: [PokemonInfoComponent, PokemonListComponent],
  templateUrl: './pokedex-view.html',
  styleUrl: './pokedex-view.css',
})
export class PokedexView implements OnInit {
  pokemonNameSelect = signal('');
  pokemonList: any[] = [];
  showUi = signal(false);
  constructor(
    private readonly backgroundService: BackgroundService,
    private readonly router: Router,
    private readonly apiService: PokemonService,
    private readonly animationService: AnimationService,
  ) {}

  ngOnInit(): void {
    this.apiService.getAllListPokemon().subscribe((response) => {
      this.pokemonList = response.results;
    });

    let route = this.router.routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }
    this.backgroundService.fadeIn();
    const background = route.snapshot.data['background'];
    
    this.backgroundService.changeAnimation(background);

    if (
      this.backgroundService.background.sprite.animationSprite[background].animationType == 'once'
    ) {
      this.backgroundService.background.sprite.defaultAnimation = 'pokedex';
      setTimeout(
        () => {
          this.showUi.set(true);
        },
        this.animationService.getAnimationDuration(
          this.backgroundService.background.sprite,
          background,
        ),
      );
    }
  }

  changeView() {
    this.backgroundService.changeView('pokedex');
  }

  selectPokemon(name: string){
    this.pokemonNameSelect.set(name);
  }
}

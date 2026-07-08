import { Routes } from '@angular/router';
import { HomeView } from './views/home-view/home-view';
import { PokedexView } from './views/pokedex-view/pokedex-view';

export const routes: Routes = [
    {
        path: '',
        component: HomeView,
        data: { background: 'home' }
    },
    {
        path: 'pokedex',
        component: PokedexView,
        data: { background: 'pokedex' }
    }
];

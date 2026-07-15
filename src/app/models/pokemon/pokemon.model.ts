export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    front_shiny: string;
  };
  species: {
    name: string;
  };
  moves: MovePokemon[];
  types: TypePokemon[];
  abilities: AbilityPokemon[];
  stats: StatPokemon[];
}

export interface StatPokemon{
  base_stat:number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export interface AbilityPokemon {
  slot: number;
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
}

export interface MovePokemon {
  slot: number;
  move: {
    name: string;
    url: string;
  };
}

export interface TypePokemon {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonSpecies {
  flavor_text_entries: FlavorTextEntry[];
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
  };
  version: {
    name: string;
  };
}

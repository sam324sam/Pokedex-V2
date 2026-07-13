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
  }
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
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

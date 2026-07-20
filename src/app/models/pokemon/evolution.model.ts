import { Pokemon } from './pokemon.model';

export interface EvolutionChain {
  id: number;
  baby_trigger_item: NamedAPIResource | null;
  chain: ChainLink;
}

export interface ChainLink {
  is_baby: boolean;
  species: NamedAPIResource;
  pokemon: Pokemon;
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
}

export interface EvolutionDetail {
  version_group: NamedAPIResource | null;
  is_default: boolean;
  item: NamedAPIResource | null;
  trigger: NamedAPIResource | null;
  gender: number | null;
  held_item: NamedAPIResource | null;
  known_move: NamedAPIResource | null;
  known_move_type: NamedAPIResource | null;
  location: NamedAPIResource | null;
  min_level: number | null;
  min_happiness: number | null;
  min_beauty: number | null;
  min_affection: number | null;
  near_special_rock: boolean;
  needs_multiplayer: boolean;
  needs_overworld_rain: boolean;
  party_species: NamedAPIResource | null;
  party_type: NamedAPIResource | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: NamedAPIResource | null;
  turn_upside_down: boolean;
  region: NamedAPIResource | null;
  base_form: NamedAPIResource | null;
  evolved_form: NamedAPIResource | null;
  used_move: NamedAPIResource | null;
  min_move_count: number | null;
  min_steps: number | null;
  min_damage_taken: number | null;
}

export interface NamedAPIResource {
  name: string;
  url: string;
}
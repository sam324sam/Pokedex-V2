export interface Move {
  id: number;
  name: string;
  accuracy: number | null;
  effect_chance: number | null;
  pp: number;
  priority: number;
  power: number | null;

  damage_class: {
    name: string;
  };

  type: {
    name: string;
  };

  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];

  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }[];
}

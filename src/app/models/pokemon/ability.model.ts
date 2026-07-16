export interface Ability {
  id: number;
  name: string;

  names: {
    name: string;
    language: {
      name: string;
    };
  }[];

  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
    version_group: {
      name: string;
    };
  }[];
}
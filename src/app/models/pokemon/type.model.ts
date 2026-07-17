export interface Type {
  name: string;
}

export interface DamageRelations {
  double_damage_from: Type[];
  double_damage_to: Type[];

  half_damage_from: Type[];
  half_damage_to: Type[];

  no_damage_from: Type[];
  no_damage_to: Type[];
}

export interface TypeDetails {
  damage_relations: DamageRelations;
}
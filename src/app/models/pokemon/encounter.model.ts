export interface EncounterDetail {
  min_level: number;
  max_level: number;
  chance: number;
  method: { name: string; url: string };
  condition_values: { name: string; url: string }[];
}

export interface VersionDetail {
  version: { name: string; url: string };
  max_chance: number;
  encounter_details: EncounterDetail[];
}

export interface LocationAreaEncounter {
  location_area: { name: string; url: string };
  version_details: VersionDetail[];
}
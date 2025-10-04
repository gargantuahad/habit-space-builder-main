export interface PresetConfig {
  env: string;
  crew: number;
  diameter: number;
  levels: number;
  deckHeight: number;
  fairingLimit: number;
  minPathWidth: number;
  circulationPct: number;
}

export const PRESETS: Record<string, PresetConfig> = {
  lunar4: {
    env: 'lunar_surface',
    crew: 4,
    diameter: 8,
    levels: 2,
    deckHeight: 2.4,
    fairingLimit: 5,
    minPathWidth: 1.0,
    circulationPct: 18,
  },
  transit2: {
    env: 'transit',
    crew: 2,
    diameter: 7,
    levels: 1,
    deckHeight: 2.4,
    fairingLimit: 5,
    minPathWidth: 1.0,
    circulationPct: 18,
  },
};

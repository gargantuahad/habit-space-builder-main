import { create } from 'zustand';
import { LayoutModule } from './rules';

interface HabitatState {
  crew: number;
  diameter: number;
  levels: number;
  deckHeight: number;
  environment: string;
  fairingLimit: number;
  minPathWidth: number;
  circulationPct: number;
  selectedFunctions: string[];
  overrides: Record<string, number>;
  modules: LayoutModule[];
  selectedModuleId: string | null;
  viewMode: 'edit' | 'walk';

  setCrew: (crew: number) => void;
  setDiameter: (diameter: number) => void;
  setLevels: (levels: number) => void;
  setDeckHeight: (height: number) => void;
  setEnvironment: (env: string) => void;
  setFairingLimit: (limit: number) => void;
  setMinPathWidth: (width: number) => void;
  setCirculationPct: (pct: number) => void;
  toggleFunction: (id: string) => void;
  setOverride: (id: string, value: number) => void;
  setModules: (modules: LayoutModule[]) => void;
  selectModule: (id: string | null) => void;
  updateModulePosition: (id: string, position: [number, number, number]) => void;
  setViewMode: (mode: 'edit' | 'walk') => void;
  resetState: () => void;
}

const defaultState = {
  crew: 4,
  diameter: 8,
  levels: 2,
  deckHeight: 2.4,
  environment: 'lunar_surface',
  fairingLimit: 5,
  minPathWidth: 1.0,
  circulationPct: 18,
  selectedFunctions: ['sleep', 'hygiene', 'uwms', 'ward', 'galley', 'workbench', 'exercise', 'medical'],
  overrides: {},
  modules: [],
  selectedModuleId: null,
  viewMode: 'edit' as const,
};

export const useHabitatStore = create<HabitatState>((set) => ({
  ...defaultState,

  setCrew: (crew) => set({ crew }),
  setDiameter: (diameter) => set({ diameter }),
  setLevels: (levels) => set({ levels }),
  setDeckHeight: (deckHeight) => set({ deckHeight }),
  setEnvironment: (environment) => set({ environment }),
  setFairingLimit: (fairingLimit) => set({ fairingLimit }),
  setMinPathWidth: (minPathWidth) => set({ minPathWidth }),
  setCirculationPct: (circulationPct) => set({ circulationPct }),

  toggleFunction: (id) =>
    set((state) => {
      const selected = state.selectedFunctions.includes(id)
        ? state.selectedFunctions.filter((fid) => fid !== id)
        : [...state.selectedFunctions, id];
      return { selectedFunctions: selected };
    }),

  setOverride: (id, value) =>
    set((state) => ({
      overrides: { ...state.overrides, [id]: value },
    })),

  setModules: (modules) => set({ modules }),
  selectModule: (selectedModuleId) => set({ selectedModuleId }),

  updateModulePosition: (id, position) =>
    set((state) => ({
      modules: state.modules.map((m) => (m.id === id ? { ...m, position } : m)),
    })),

  setViewMode: (viewMode) => set({ viewMode, selectedModuleId: null }),

  resetState: () => set(defaultState),
}));

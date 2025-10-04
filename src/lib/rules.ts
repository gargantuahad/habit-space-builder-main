export interface StateLike {
  crew: number;
  diameter: number;
  levels: number;
  deckHeight: number;
  circulationPct: number;
}

export interface Metrics {
  deckArea: number;
  totalFloorArea: number;
  pressurizedVolume: number;
  nhvApprox: number;
  nhvPerCrew: number;
  circulationArea: number;
  MIN_PER_CREW: number;
  PRACTICAL_PER_CREW: number;
}

export const MIN_PER_CREW = 28.5;
export const PRACTICAL_PER_CREW = 37;

export function deriveMetricsForTestable(state: StateLike): Metrics {
  const deckArea = Math.PI * Math.pow(state.diameter / 2, 2);
  const totalFloorArea = deckArea * state.levels;
  const pressurizedVolume = totalFloorArea * state.deckHeight;
  const nhvApprox = pressurizedVolume * 0.55;
  const nhvPerCrew = nhvApprox / Math.max(1, state.crew);
  const circulationArea = totalFloorArea * (state.circulationPct / 100);

  return {
    deckArea,
    totalFloorArea,
    pressurizedVolume,
    nhvApprox,
    nhvPerCrew,
    circulationArea,
    MIN_PER_CREW,
    PRACTICAL_PER_CREW,
  };
}

export interface FunctionDef {
  id: string;
  label: string;
  minAreaPerCrew?: number;
  minArea?: number;
  optional?: boolean;
  zoneType: 'clean' | 'dirty';
}

export const FUNCTIONS: FunctionDef[] = [
  { id: 'sleep', label: 'Sleep', minAreaPerCrew: 1.82, zoneType: 'clean' },
  { id: 'hygiene', label: 'Hygiene', minAreaPerCrew: 1.06, zoneType: 'dirty' },
  { id: 'uwms', label: 'UWMS', minArea: 0.91, zoneType: 'dirty' },
  { id: 'ward', label: 'Ward', minArea: 1.62, zoneType: 'clean' },
  { id: 'galley', label: 'Galley', minArea: 1.12, zoneType: 'dirty' },
  { id: 'workbench', label: 'Workbench', minArea: 1.37, zoneType: 'dirty' },
  { id: 'exercise', label: 'Exercise', minArea: 1.50, zoneType: 'dirty' },
  { id: 'medical', label: 'Medical', minArea: 1.87, zoneType: 'clean' },
  { id: 'stowage', label: 'Stowage', minArea: 3.0, optional: true, zoneType: 'clean' },
];

export interface Zone {
  id: string;
  label: string;
  area: number;
  zoneType: 'clean' | 'dirty';
}

export interface DeriveZonesInput {
  crew: number;
  selectedIds: string[];
  overrides: Record<string, number>;
}

export function deriveZonesForTestable(input: DeriveZonesInput): { zones: Zone[]; sumArea: number } {
  const zones: Zone[] = [];
  let sumArea = 0;

  for (const id of input.selectedIds) {
    const func = FUNCTIONS.find((f) => f.id === id);
    if (!func) continue;

    let area: number;
    if (input.overrides[id] !== undefined) {
      area = Math.max(0.2, input.overrides[id]);
    } else if (func.minAreaPerCrew) {
      area = func.minAreaPerCrew * input.crew;
    } else if (func.minArea) {
      area = func.minArea;
    } else {
      area = 1.0;
    }

    zones.push({
      id,
      label: func.label,
      area,
      zoneType: func.zoneType,
    });
    sumArea += area;
  }

  return { zones, sumArea };
}

export interface LayoutModule {
  id: string;
  label: string;
  area: number;
  zoneType: 'clean' | 'dirty';
  position: [number, number, number];
  size: [number, number, number];
}

export function autoLayout(
  zones: Zone[],
  radius: number,
  deckHeight: number,
  levels: number
): LayoutModule[] {
  const modules: LayoutModule[] = [];
  const margin = 0.15;
  const usableRadius = radius * (1 - margin);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  let angleOffset = 0;

  zones.forEach((zone, index) => {
    const level = index % levels;
    const angle = angleOffset + goldenAngle * index;
    const ringRadius = usableRadius * 0.7;

    const x = Math.cos(angle) * ringRadius;
    const z = Math.sin(angle) * ringRadius;
    const y = level * deckHeight;

    const sqrtArea = Math.sqrt(zone.area);
    const width = sqrtArea;
    const depth = sqrtArea;
    const height = Math.min(deckHeight * 0.8, 2.0);

    modules.push({
      id: zone.id,
      label: zone.label,
      area: zone.area,
      zoneType: zone.zoneType,
      position: [x, y, z],
      size: [width, height, depth],
    });
  });

  return modules;
}

export interface ValidationResult {
  areaFit: boolean;
  nhvStatus: 'ok' | 'warning' | 'critical';
  fairingFit: boolean;
  pathWidth: boolean;
  zoneSeparation: 'ok' | 'warning';
}

export function validateDesign(
  metrics: Metrics,
  sumArea: number,
  diameter: number,
  fairingLimit: number,
  minPathWidth: number,
  zones: Zone[]
): ValidationResult {
  const areaFit = sumArea + metrics.circulationArea <= metrics.totalFloorArea;
  
  let nhvStatus: 'ok' | 'warning' | 'critical' = 'ok';
  if (metrics.nhvPerCrew < MIN_PER_CREW) {
    nhvStatus = 'critical';
  } else if (metrics.nhvPerCrew < PRACTICAL_PER_CREW) {
    nhvStatus = 'warning';
  }

  const fairingFit = diameter <= fairingLimit * 2.0;
  const pathWidth = minPathWidth >= 1.0;

  const hasSleep = zones.some((z) => z.id === 'sleep');
  const hasDirtyOnSameLevel =
    hasSleep &&
    zones.some((z) => ['exercise', 'workbench', 'uwms', 'hygiene'].includes(z.id));
  const zoneSeparation = hasDirtyOnSameLevel ? 'warning' : 'ok';

  return {
    areaFit,
    nhvStatus,
    fairingFit,
    pathWidth,
    zoneSeparation,
  };
}

import { describe, it, expect } from 'vitest';
import { deriveMetricsForTestable, deriveZonesForTestable } from '../src/lib/rules';

describe('deriveMetricsForTestable', () => {
  it('calculates metrics correctly', () => {
    const state = {
      crew: 4,
      diameter: 8,
      levels: 2,
      deckHeight: 2.4,
      circulationPct: 18,
    };

    const metrics = deriveMetricsForTestable(state);

    // deckArea = π * (8/2)^2 = π * 16
    const expectedDeckArea = Math.PI * 16;
    expect(metrics.deckArea).toBeCloseTo(expectedDeckArea, 1);

    // totalFloorArea = deckArea * 2
    const expectedTotalFloorArea = expectedDeckArea * 2;
    expect(metrics.totalFloorArea).toBeCloseTo(expectedTotalFloorArea, 1);

    // pressurizedVolume = totalFloorArea * 2.4
    const expectedPressurizedVolume = expectedTotalFloorArea * 2.4;
    expect(metrics.pressurizedVolume).toBeCloseTo(expectedPressurizedVolume, 1);

    // nhvApprox = pressurizedVolume * 0.55
    const expectedNhvApprox = expectedPressurizedVolume * 0.55;
    expect(metrics.nhvApprox).toBeCloseTo(expectedNhvApprox, 1);

    // nhvPerCrew = nhvApprox / 4
    const expectedNhvPerCrew = expectedNhvApprox / 4;
    expect(metrics.nhvPerCrew).toBeCloseTo(expectedNhvPerCrew, 1);

    // circulationArea = totalFloorArea * 0.18
    const expectedCirculationArea = expectedTotalFloorArea * 0.18;
    expect(metrics.circulationArea).toBeCloseTo(expectedCirculationArea, 1);
  });
});

describe('deriveZonesForTestable', () => {
  it('calculates default zones sum correctly', () => {
    const input = {
      crew: 4,
      selectedIds: ['sleep', 'hygiene', 'uwms', 'ward', 'galley', 'workbench', 'exercise', 'medical'],
      overrides: {},
    };

    const result = deriveZonesForTestable(input);

    // Expected sum:
    // sleep: 1.82 * 4 = 7.28
    // hygiene: 1.06 * 4 = 4.24
    // uwms: 0.91
    // ward: 1.62
    // galley: 1.12
    // workbench: 1.37
    // exercise: 1.50
    // medical: 1.87
    // Total = 7.28 + 4.24 + 0.91 + 1.62 + 1.12 + 1.37 + 1.50 + 1.87 = 19.91
    const expectedSum = 7.28 + 4.24 + 0.91 + 1.62 + 1.12 + 1.37 + 1.50 + 1.87;

    expect(result.sumArea).toBeCloseTo(expectedSum, 1);
    expect(result.zones).toHaveLength(8);
  });

  it('respects overrides', () => {
    const input = {
      crew: 4,
      selectedIds: ['sleep', 'hygiene'],
      overrides: { sleep: 12 },
    };

    const result = deriveZonesForTestable(input);

    const sleepZone = result.zones.find((z) => z.id === 'sleep');
    expect(sleepZone?.area).toBe(12);

    // hygiene should be default: 1.06 * 4 = 4.24
    const hygieneZone = result.zones.find((z) => z.id === 'hygiene');
    expect(hygieneZone?.area).toBeCloseTo(4.24, 2);

    // Total should be 12 + 4.24 = 16.24
    expect(result.sumArea).toBeCloseTo(16.24, 1);
  });
});

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { encodeStateToUrl, decodeStateFromUrl } from '../src/lib/share';

describe('encodeStateToUrl and decodeStateFromUrl', () => {
  let originalLocation: Location;

  beforeEach(() => {
    originalLocation = window.location;
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = { search: '' } as Location;
  });

  afterEach(() => {
    window.location = originalLocation;
  });

  it('encodes and decodes state correctly', () => {
    const state = {
      crew: 4,
      diameter: 8,
      levels: 2,
      deckHeight: 2.4,
      environment: 'lunar_surface',
      fairingLimit: 5,
      minPathWidth: 1.0,
      circulationPct: 18,
      selectedFunctions: ['sleep', 'hygiene'],
      overrides: { sleep: 10 },
    };

    const encoded = encodeStateToUrl(state);
    expect(encoded).toBeTruthy();
    expect(typeof encoded).toBe('string');

    const decoded = decodeStateFromUrl(encoded);
    expect(decoded).toEqual(state);
  });

  it('returns null when no state in URL', () => {
    window.location.search = '';
    const decoded = decodeStateFromUrl();
    expect(decoded).toBeNull();
  });

  it('handles URL query parameter', () => {
    const state = {
      crew: 2,
      diameter: 7,
      levels: 1,
      deckHeight: 2.4,
      environment: 'transit',
      fairingLimit: 5,
      minPathWidth: 1.0,
      circulationPct: 18,
      selectedFunctions: ['sleep'],
      overrides: {},
    };

    const encoded = encodeStateToUrl(state);
    window.location.search = `?s=${encoded}`;

    const decoded = decodeStateFromUrl();
    expect(decoded).toEqual(state);
  });
});

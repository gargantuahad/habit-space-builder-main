export interface ShareableState {
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
}

export function encodeStateToUrl(state: ShareableState): string {
  const json = JSON.stringify(state);
  const base64 = btoa(json);
  const urlSafe = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  return urlSafe;
}

export function decodeStateFromUrl(encoded?: string): ShareableState | null {
  if (!encoded) {
    const params = new URLSearchParams(window.location.search);
    encoded = params.get('s') || undefined;
  }

  if (!encoded) return null;

  try {
    const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const padding = '='.repeat((4 - (base64.length % 4)) % 4);
    const json = atob(base64 + padding);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function saveToLocalStorage(state: ShareableState) {
  try {
    localStorage.setItem('habitatlab:last', JSON.stringify(state));
  } catch {
    // Ignore storage errors
  }
}

export function loadFromLocalStorage(): ShareableState | null {
  try {
    const json = localStorage.getItem('habitatlab:last');
    return json ? JSON.parse(json) : null;
  } catch {
    return null;
  }
}

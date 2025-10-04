import { useEffect, useState } from 'react';
import { Topbar } from '@/components/Topbar';
import { BuildSidebar } from '@/components/BuildSidebar';
import { Scene3D } from '@/components/Scene3D';
import { useHabitatStore } from '@/lib/store';
import { decodeStateFromUrl, saveToLocalStorage, loadFromLocalStorage } from '@/lib/share';
import { toast } from 'sonner';

export default function Build() {
  const store = useHabitatStore();
  const [arSupported, setArSupported] = useState(false);

  useEffect(() => {
    // Check WebXR support
    if ('xr' in navigator) {
      (navigator as any).xr?.isSessionSupported('immersive-ar').then((supported: boolean) => {
        setArSupported(supported);
      });
    }

    // Load from URL or localStorage
    const urlState = decodeStateFromUrl();
    if (urlState) {
      store.setCrew(urlState.crew);
      store.setDiameter(urlState.diameter);
      store.setLevels(urlState.levels);
      store.setDeckHeight(urlState.deckHeight);
      store.setEnvironment(urlState.environment);
      store.setFairingLimit(urlState.fairingLimit);
      store.setMinPathWidth(urlState.minPathWidth);
      store.setCirculationPct(urlState.circulationPct);
      // Note: selectedFunctions and overrides would need to be set from urlState
      toast.success('Конфигурация загружена из URL');
    } else {
      const localState = loadFromLocalStorage();
      if (localState) {
        store.setCrew(localState.crew);
        store.setDiameter(localState.diameter);
        store.setLevels(localState.levels);
        store.setDeckHeight(localState.deckHeight);
        store.setEnvironment(localState.environment);
        store.setFairingLimit(localState.fairingLimit);
        store.setMinPathWidth(localState.minPathWidth);
        store.setCirculationPct(localState.circulationPct);
      }
    }
  }, []);

  useEffect(() => {
    // Save to localStorage on changes
    const state = {
      crew: store.crew,
      diameter: store.diameter,
      levels: store.levels,
      deckHeight: store.deckHeight,
      environment: store.environment,
      fairingLimit: store.fairingLimit,
      minPathWidth: store.minPathWidth,
      circulationPct: store.circulationPct,
      selectedFunctions: store.selectedFunctions,
      overrides: store.overrides,
    };
    saveToLocalStorage(state);
  }, [
    store.crew,
    store.diameter,
    store.levels,
    store.deckHeight,
    store.environment,
    store.fairingLimit,
    store.minPathWidth,
    store.circulationPct,
    store.selectedFunctions,
    store.overrides,
  ]);

  const handleARClick = () => {
    if (!arSupported) {
      toast.error('AR не поддерживается в этом браузере. Используйте Android Chrome/Edge.');
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <Topbar onARClick={handleARClick} arSupported={arSupported} />
      <div className="flex flex-1 overflow-hidden">
        <BuildSidebar />
        <div className="flex-1">
          <Scene3D />
        </div>
      </div>
    </div>
  );
}

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import { XR } from '@react-three/xr';
import { useHabitatStore } from '@/lib/store';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { deriveMetricsForTestable, deriveZonesForTestable, autoLayout, validateDesign } from '@/lib/rules';

function Hull() {
  const { diameter, levels, deckHeight } = useHabitatStore();
  const radius = diameter / 2;
  const totalHeight = levels * deckHeight;

  return (
    <group>
      {/* Main hull */}
      <mesh position={[0, totalHeight / 2, 0]}>
        <cylinderGeometry args={[radius, radius, totalHeight, 32, 1, true]} />
        <meshBasicMaterial color="#00bfff" wireframe side={THREE.DoubleSide} />
      </mesh>

      {/* Deck grids */}
      {Array.from({ length: levels }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, i * deckHeight, 0]}>
          <circleGeometry args={[radius, 32]} />
          <meshBasicMaterial color="#00bfff" wireframe side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

function Module({ module, isSelected, onClick }: any) {
  const color = module.zoneType === 'clean' ? '#00ff00' : '#ff0000';
  const [x, y, z] = module.position;
  const [w, h, d] = module.size;

  return (
    <group position={[x, y + h / 2, z]} onClick={onClick}>
      <mesh>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial
          color={color}
          opacity={0.7}
          transparent
          emissive={isSelected ? color : '#000000'}
          emissiveIntensity={isSelected ? 0.3 : 0}
        />
      </mesh>
      <Html distanceFactor={10} position={[0, h / 2 + 0.3, 0]}>
        <div className="rounded bg-card/90 px-2 py-1 text-xs text-foreground backdrop-blur-sm">
          {module.label}
        </div>
      </Html>
    </group>
  );
}

function HUD() {
  const store = useHabitatStore();
  const metrics = deriveMetricsForTestable(store);
  const { zones, sumArea } = deriveZonesForTestable({
    crew: store.crew,
    selectedIds: store.selectedFunctions,
    overrides: store.overrides,
  });
  const validation = validateDesign(
    metrics,
    sumArea,
    store.diameter,
    store.fairingLimit,
    store.minPathWidth,
    zones
  );

  const nhvColor =
    validation.nhvStatus === 'critical'
      ? '#ff0000'
      : validation.nhvStatus === 'warning'
      ? '#ffaa00'
      : '#00ff00';

  return (
    <Html position={[0, store.levels * store.deckHeight + 2, 0]} center>
      <div className="rounded-lg border border-border bg-card/90 p-4 text-sm backdrop-blur-sm">
        <div className="mb-2 font-bold text-foreground">Метрики</div>
        <div className="space-y-1 text-xs">
          <div>
            <span className="text-muted-foreground">NHV/чел:</span>
            <span className="ml-2 font-bold" style={{ color: nhvColor }}>
              {metrics.nhvPerCrew.toFixed(1)} м³
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Мин:</span>
            <span className="ml-2">{metrics.MIN_PER_CREW}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Цель:</span>
            <span className="ml-2">{metrics.PRACTICAL_PER_CREW}</span>
          </div>
          {!validation.areaFit && (
            <div className="mt-2 rounded bg-destructive/20 p-1 text-destructive">
              ⚠️ Площадь не влезает
            </div>
          )}
        </div>
      </div>
    </Html>
  );
}

export function Scene3D() {
  const store = useHabitatStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const { zones } = deriveZonesForTestable({
      crew: store.crew,
      selectedIds: store.selectedFunctions,
      overrides: store.overrides,
    });

    const modules = autoLayout(zones, store.diameter / 2, store.deckHeight, store.levels);
    store.setModules(modules);
  }, [
    store.crew,
    store.diameter,
    store.levels,
    store.deckHeight,
    store.selectedFunctions,
    store.overrides,
  ]);

  const handleModuleClick = (id: string) => {
    if (store.viewMode === 'edit') {
      store.selectModule(store.selectedModuleId === id ? null : id);
    }
  };

  return (
    <div className="h-full w-full">
      <Canvas
        ref={canvasRef}
        camera={{ position: [10, 8, 10], fov: 50 }}
        gl={{ preserveDrawingBuffer: true }}
      >
          <color attach="background" args={['#0a0f1a']} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, 10, -10]} intensity={0.5} color="#00bfff" />

          <Hull />

          {store.modules.map((module) => (
            <Module
              key={module.id}
              module={module}
              isSelected={store.selectedModuleId === module.id}
              onClick={() => handleModuleClick(module.id)}
            />
          ))}

          <HUD />

          <Environment preset="sunset" />
          <ContactShadows opacity={0.5} scale={20} blur={2} far={10} />

          {store.viewMode === 'edit' && <OrbitControls makeDefault />}
      </Canvas>
    </div>
  );
}

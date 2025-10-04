import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { PresetCards } from '@/components/PresetCards';
import { ArrowRight, Rocket, Layers, Share2 } from 'lucide-react';
import { useHabitatStore } from '@/lib/store';
import { PRESETS } from '@/lib/presets';
import { useLocation } from 'wouter';

export default function Home() {
  const store = useHabitatStore();
  const [, setLocation] = useLocation();

  const handlePresetSelect = (presetId: string) => {
    const preset = PRESETS[presetId as keyof typeof PRESETS];
    if (preset) {
      store.setCrew(preset.crew);
      store.setDiameter(preset.diameter);
      store.setLevels(preset.levels);
      store.setDeckHeight(preset.deckHeight);
      store.setEnvironment(preset.env);
      store.setFairingLimit(preset.fairingLimit);
      store.setMinPathWidth(preset.minPathWidth);
      store.setCirculationPct(preset.circulationPct);
      setLocation('/build');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="mb-24 text-center">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full border-glow bg-primary/10 p-4">
            <Rocket className="h-16 w-16 text-primary" />
          </div>
        </div>
        <h1 className="mb-6 text-5xl font-bold text-gradient md:text-6xl">
          Проектируйте космические хабитаты
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
          Инструмент для планирования жилых модулей с учётом эргономики, NHV и зонирования.
          Визуализируйте в 3D и AR.
        </p>
        <Link href="/build">
          <Button size="lg" className="gap-2 text-lg">
            Начать проектирование
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </section>

      {/* How it works */}
      <section className="mb-24">
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
          Как это работает
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="card-glass rounded-lg p-6 text-center">
            <div className="mb-4 flex justify-center">
              <Layers className="h-12 w-12 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">1. Настройте параметры</h3>
            <p className="text-muted-foreground">
              Выберите размеры, экипаж, длительность миссии и необходимые функции
            </p>
          </div>
          <div className="card-glass rounded-lg p-6 text-center">
            <div className="mb-4 flex justify-center">
              <Rocket className="h-12 w-12 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">2. Визуализируйте в 3D</h3>
            <p className="text-muted-foreground">
              Автоматическая расстановка модулей с проверкой правил и ограничений
            </p>
          </div>
          <div className="card-glass rounded-lg p-6 text-center">
            <div className="mb-4 flex justify-center">
              <Share2 className="h-12 w-12 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">3. Поделитесь</h3>
            <p className="text-muted-foreground">
              Экспортируйте конфигурацию через URL или сохраните локально
            </p>
          </div>
        </div>
      </section>

      {/* Presets */}
      <section>
        <h2 className="mb-8 text-center text-3xl font-bold text-foreground">Быстрый старт</h2>
        <p className="mb-8 text-center text-muted-foreground">
          Выберите готовый пресет или создайте свою конфигурацию
        </p>
        <PresetCards onSelect={handlePresetSelect} />
      </section>
    </div>
  );
}

import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

export default function Learn() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold text-gradient">Справка по проектированию</h1>

      <div className="space-y-8">
        <Card className="card-glass p-6">
          <div className="mb-4 flex items-center gap-2">
            <Info className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Net Habitable Volume (NHV)</h2>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p>
              <strong className="text-foreground">NHV</strong> — это полезный объём жилого пространства (за вычетом стен, систем, оборудования).
            </p>
            <p>
              <strong className="text-foreground">Минимум:</strong> 28.5 м³/чел
            </p>
            <p>
              <strong className="text-foreground">Практичный:</strong> 37 м³/чел
            </p>
            <p className="text-sm">
              В HabitatLab используется эвристика: NHV ≈ 55% от pressurized volume.
            </p>
          </div>
        </Card>

        <Card className="card-glass p-6">
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-success" />
            <h2 className="text-2xl font-bold text-foreground">Пути и циркуляция</h2>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p>
              <strong className="text-foreground">Минимальная ширина путей:</strong> ≥ 1.0 м
            </p>
            <p>
              <strong className="text-foreground">Резерв циркуляции:</strong> обычно 18–25% от общей площади пола
            </p>
            <p className="text-sm">
              Это пространство для проходов, шлюзов и манёвров.
            </p>
          </div>
        </Card>

        <Card className="card-glass p-6">
          <div className="mb-4 flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-warning" />
            <h2 className="text-2xl font-bold text-foreground">Зонирование (clean/dirty)</h2>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p>
              <strong className="text-success">Clean zones:</strong> sleep, ward, medical, stowage
            </p>
            <p>
              <strong className="text-destructive">Dirty zones:</strong> hygiene, UWMS, galley, workbench, exercise
            </p>
            <p className="text-sm">
              Рекомендуется разносить чистые и шумные зоны на разные уровни или дальше друг от друга.
            </p>
          </div>
        </Card>

        <Card className="card-glass p-6">
          <div className="mb-4 flex items-center gap-2">
            <Info className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Высота палубы</h2>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p>
              <strong className="text-foreground">Стандарт:</strong> 2.4 м между палубами
            </p>
            <p className="text-sm">
              Этого достаточно для комфортного роста человека + системы вентиляции и освещения.
            </p>
          </div>
        </Card>

        <Card className="card-glass p-6">
          <div className="mb-4 flex items-center gap-2">
            <Info className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Ограничения обтекателя</h2>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p>
              <strong className="text-foreground">Металлический модуль:</strong> диаметр ≤ диаметр обтекателя
            </p>
            <p>
              <strong className="text-foreground">Надувной модуль:</strong> может быть до 2× диаметра обтекателя
            </p>
            <p className="text-sm">
              Например, для обтекателя 5м: металл — до 5м, надувной — до 10м.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

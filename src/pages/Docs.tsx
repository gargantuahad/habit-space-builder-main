import { Card } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export default function Docs() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold text-gradient">Документация</h1>

      <div className="space-y-8">
        <Card className="card-glass p-6">
          <div className="mb-4 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Формулы и расчёты</h2>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-bold text-foreground">Площадь палубы</h3>
              <code className="block rounded bg-secondary p-2 font-mono text-sm text-muted-foreground">
                deckArea = π × (diameter / 2)²
              </code>
            </div>
            <div>
              <h3 className="mb-2 font-bold text-foreground">Общая площадь пола</h3>
              <code className="block rounded bg-secondary p-2 font-mono text-sm text-muted-foreground">
                totalFloorArea = deckArea × levels
              </code>
            </div>
            <div>
              <h3 className="mb-2 font-bold text-foreground">Герметизированный объём</h3>
              <code className="block rounded bg-secondary p-2 font-mono text-sm text-muted-foreground">
                pressurizedVolume = totalFloorArea × deckHeight
              </code>
            </div>
            <div>
              <h3 className="mb-2 font-bold text-foreground">NHV (эвристика)</h3>
              <code className="block rounded bg-secondary p-2 font-mono text-sm text-muted-foreground">
                nhvApprox = pressurizedVolume × 0.55
              </code>
              <p className="mt-2 text-sm text-muted-foreground">
                Коэффициент 0.55 — это упрощённая оценка для MVP
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-bold text-foreground">NHV на человека</h3>
              <code className="block rounded bg-secondary p-2 font-mono text-sm text-muted-foreground">
                nhvPerCrew = nhvApprox / max(1, crew)
              </code>
            </div>
          </div>
        </Card>

        <Card className="card-glass p-6">
          <h2 className="mb-4 text-2xl font-bold text-foreground">Функции и минимальные площади</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className="pb-2 font-bold text-foreground">Функция</th>
                  <th className="pb-2 font-bold text-foreground">Мин. площадь</th>
                  <th className="pb-2 font-bold text-foreground">Тип</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-2">Sleep</td>
                  <td className="py-2">1.82 м²/чел</td>
                  <td className="py-2 text-success">Clean</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2">Hygiene</td>
                  <td className="py-2">1.06 м²/чел</td>
                  <td className="py-2 text-destructive">Dirty</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2">UWMS</td>
                  <td className="py-2">0.91 м²</td>
                  <td className="py-2 text-destructive">Dirty</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2">Ward</td>
                  <td className="py-2">1.62 м²</td>
                  <td className="py-2 text-success">Clean</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2">Galley</td>
                  <td className="py-2">1.12 м²</td>
                  <td className="py-2 text-destructive">Dirty</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2">Workbench</td>
                  <td className="py-2">1.37 м²</td>
                  <td className="py-2 text-destructive">Dirty</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2">Exercise</td>
                  <td className="py-2">1.50 м²</td>
                  <td className="py-2 text-destructive">Dirty</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2">Medical</td>
                  <td className="py-2">1.87 м²</td>
                  <td className="py-2 text-success">Clean</td>
                </tr>
                <tr>
                  <td className="py-2">Stowage (опц.)</td>
                  <td className="py-2">3.0 м²</td>
                  <td className="py-2 text-success">Clean</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="card-glass p-6">
          <h2 className="mb-4 text-2xl font-bold text-foreground">Допущения MVP</h2>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>Это учебная эвристика, а не окончательная эргономика</li>
            <li>Модули не пересекаются физикой — чисто визуальный конструктор</li>
            <li>Автолэйаут использует золотой угол для распределения модулей</li>
            <li>Для WebXR требуется Android Chrome/Edge; iOS не поддерживает WebXR</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

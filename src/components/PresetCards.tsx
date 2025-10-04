import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PRESETS } from '@/lib/presets';
import { Users, Layers, Ruler } from 'lucide-react';

interface PresetCardsProps {
  onSelect: (presetId: string) => void;
}

export function PresetCards({ onSelect }: PresetCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Object.entries(PRESETS).map(([id, preset]) => (
        <Card key={id} className="card-glass p-6">
          <h3 className="mb-4 text-xl font-bold capitalize text-foreground">
            {preset.env.replace('_', ' ')}
          </h3>
          <div className="mb-4 space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>Экипаж: {preset.crew}</span>
            </div>
            <div className="flex items-center gap-2">
              <Ruler className="h-4 w-4 text-primary" />
              <span>Диаметр: {preset.diameter}м</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" />
              <span>Этажи: {preset.levels}</span>
            </div>
          </div>
          <Button onClick={() => onSelect(id)} className="w-full">
            Применить
          </Button>
        </Card>
      ))}
    </div>
  );
}

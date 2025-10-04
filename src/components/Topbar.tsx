import { Button } from '@/components/ui/button';
import { Share2, Box, Eye, Navigation } from 'lucide-react';
import { useHabitatStore } from '@/lib/store';
import { encodeStateToUrl } from '@/lib/share';
import { toast } from 'sonner';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PresetCards } from './PresetCards';
import { PRESETS } from '@/lib/presets';

interface TopbarProps {
  onARClick: () => void;
  arSupported: boolean;
}

export function Topbar({ onARClick, arSupported }: TopbarProps) {
  const store = useHabitatStore();
  const [presetsOpen, setPresetsOpen] = useState(false);

  const handleShare = () => {
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

    const encoded = encodeStateToUrl(state);
    const url = `${window.location.origin}/build?s=${encoded}`;

    navigator.clipboard.writeText(url).then(() => {
      toast.success('Ссылка скопирована в буфер обмена!');
    });
  };

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
      setPresetsOpen(false);
      toast.success('Пресет применён');
    }
  };

  return (
    <div className="flex h-16 items-center justify-between border-b border-border bg-card/50 px-4">
      <h1 className="text-xl font-bold text-foreground">Build Mode</h1>

      <div className="flex items-center gap-2">
        <Dialog open={presetsOpen} onOpenChange={setPresetsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Box className="mr-2 h-4 w-4" />
              Пресеты
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Выберите пресет</DialogTitle>
            </DialogHeader>
            <PresetCards onSelect={handlePresetSelect} />
          </DialogContent>
        </Dialog>

        <Button variant="outline" size="sm" onClick={handleShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Share URL
        </Button>

        {arSupported && (
          <Button variant="outline" size="sm" onClick={onARClick}>
            <Eye className="mr-2 h-4 w-4" />
            Enter AR
          </Button>
        )}

        <div className="flex gap-1 rounded-md border border-border p-1">
          <Button
            size="sm"
            variant={store.viewMode === 'edit' ? 'default' : 'ghost'}
            onClick={() => store.setViewMode('edit')}
            className="h-8"
          >
            <Box className="mr-1 h-4 w-4" />
            Edit
          </Button>
          <Button
            size="sm"
            variant={store.viewMode === 'walk' ? 'default' : 'ghost'}
            onClick={() => store.setViewMode('walk')}
            className="h-8"
          >
            <Navigation className="mr-1 h-4 w-4" />
            Walk
          </Button>
        </div>
      </div>
    </div>
  );
}

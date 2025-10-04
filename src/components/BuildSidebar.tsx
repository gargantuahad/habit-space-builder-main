import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useHabitatStore } from '@/lib/store';
import { FUNCTIONS } from '@/lib/rules';
import { Badge } from '@/components/ui/badge';

export function BuildSidebar() {
  const store = useHabitatStore();

  return (
    <div className="h-full w-80 overflow-y-auto border-r border-border bg-card/30 p-4">
      <div className="space-y-6">
        {/* Environment */}
        <Card className="card-glass p-4">
          <Label className="mb-2 block text-sm font-bold">Среда</Label>
          <Select value={store.environment} onValueChange={store.setEnvironment}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lunar_surface">Lunar Surface</SelectItem>
              <SelectItem value="transit">Transit</SelectItem>
              <SelectItem value="mars_surface">Mars Surface</SelectItem>
            </SelectContent>
          </Select>
        </Card>

        {/* Crew & Duration */}
        <Card className="card-glass p-4">
          <div className="space-y-3">
            <div>
              <Label className="mb-1 block text-sm font-bold">Экипаж</Label>
              <Input
                type="number"
                min="1"
                max="8"
                value={store.crew}
                onChange={(e) => store.setCrew(Number(e.target.value))}
              />
            </div>
          </div>
        </Card>

        {/* Geometry */}
        <Card className="card-glass p-4">
          <h3 className="mb-3 text-sm font-bold">Геометрия</h3>
          <div className="space-y-3">
            <div>
              <Label className="mb-1 block text-xs">Диаметр (м)</Label>
              <Input
                type="number"
                step="0.5"
                min="3"
                max="15"
                value={store.diameter}
                onChange={(e) => store.setDiameter(Number(e.target.value))}
              />
            </div>
            <div>
              <Label className="mb-1 block text-xs">Этажи</Label>
              <Input
                type="number"
                min="1"
                max="3"
                value={store.levels}
                onChange={(e) => store.setLevels(Number(e.target.value))}
              />
            </div>
            <div>
              <Label className="mb-1 block text-xs">Высота палубы (м)</Label>
              <Input
                type="number"
                step="0.1"
                min="2.0"
                max="3.5"
                value={store.deckHeight}
                onChange={(e) => store.setDeckHeight(Number(e.target.value))}
              />
            </div>
          </div>
        </Card>

        {/* Constraints */}
        <Card className="card-glass p-4">
          <h3 className="mb-3 text-sm font-bold">Ограничения</h3>
          <div className="space-y-3">
            <div>
              <Label className="mb-1 block text-xs">Ø обтекателя (м)</Label>
              <Input
                type="number"
                step="0.5"
                min="3"
                max="10"
                value={store.fairingLimit}
                onChange={(e) => store.setFairingLimit(Number(e.target.value))}
              />
            </div>
            <div>
              <Label className="mb-1 block text-xs">Мин. ширина путей (м)</Label>
              <Input
                type="number"
                step="0.1"
                min="0.8"
                max="2.0"
                value={store.minPathWidth}
                onChange={(e) => store.setMinPathWidth(Number(e.target.value))}
              />
            </div>
            <div>
              <Label className="mb-1 block text-xs">Резерв циркуляции (%)</Label>
              <Input
                type="number"
                min="10"
                max="40"
                value={store.circulationPct}
                onChange={(e) => store.setCirculationPct(Number(e.target.value))}
              />
            </div>
          </div>
        </Card>

        {/* Functions */}
        <Card className="card-glass p-4">
          <h3 className="mb-3 text-sm font-bold">Функции</h3>
          <div className="space-y-3">
            {FUNCTIONS.map((func) => {
              const isSelected = store.selectedFunctions.includes(func.id);
              const override = store.overrides[func.id];
              const minArea = func.minAreaPerCrew
                ? func.minAreaPerCrew * store.crew
                : func.minArea || 1.0;

              return (
                <div key={func.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => store.toggleFunction(func.id)}
                    />
                    <Label className="flex-1 text-xs">
                      {func.label}
                      <Badge
                        variant={func.zoneType === 'clean' ? 'default' : 'destructive'}
                        className="ml-2 text-xs"
                      >
                        {func.zoneType}
                      </Badge>
                    </Label>
                  </div>
                  {isSelected && (
                    <div className="ml-6">
                      <Label className="mb-1 block text-xs text-muted-foreground">
                        Площадь (м²) • мин: {minArea.toFixed(2)}
                      </Label>
                      <Input
                        type="number"
                        step="0.1"
                        min="0.2"
                        value={override ?? ''}
                        placeholder={minArea.toFixed(2)}
                        onChange={(e) =>
                          store.setOverride(func.id, e.target.value ? Number(e.target.value) : 0)
                        }
                        className="h-8"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

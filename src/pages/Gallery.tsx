import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { loadFromLocalStorage } from '@/lib/share';
import { useEffect, useState } from 'react';
import { ExternalLink, Info } from 'lucide-react';

export default function Gallery() {
  const [savedConfig, setSavedConfig] = useState<any>(null);

  useEffect(() => {
    const config = loadFromLocalStorage();
    setSavedConfig(config);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold text-gradient">Галерея конфигураций</h1>

      <div className="space-y-6">
        {savedConfig ? (
          <Card className="card-glass p-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-foreground">Последняя конфигурация</h2>
            </div>
            <div className="mb-4 grid gap-2 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Экипаж:</strong> {savedConfig.crew}
              </p>
              <p>
                <strong className="text-foreground">Диаметр:</strong> {savedConfig.diameter}м
              </p>
              <p>
                <strong className="text-foreground">Этажи:</strong> {savedConfig.levels}
              </p>
              <p>
                <strong className="text-foreground">Среда:</strong> {savedConfig.environment}
              </p>
            </div>
            <Button asChild>
              <a href="/build">
                <ExternalLink className="mr-2 h-4 w-4" />
                Открыть в редакторе
              </a>
            </Button>
          </Card>
        ) : (
          <Card className="card-glass p-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Info className="h-5 w-5" />
              <p>Нет сохранённых конфигураций. Создайте свою в редакторе!</p>
            </div>
          </Card>
        )}

        <Card className="card-glass p-6">
          <h2 className="mb-4 text-xl font-bold text-foreground">Как работает сохранение</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>
              • Конфигурации сохраняются локально в браузере (localStorage)
            </p>
            <p>
              • Используйте кнопку «Share URL» в редакторе для копирования ссылки
            </p>
            <p>
              • Ссылка содержит полную конфигурацию в параметре ?s=...
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

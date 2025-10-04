import { Link, useLocation } from 'wouter';
import { Rocket, Home, Hammer, BookOpen, Image, FileText } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/build', label: 'Build', icon: Hammer },
    { path: '/learn', label: 'Learn', icon: BookOpen },
    { path: '/gallery', label: 'Gallery', icon: Image },
    { path: '/docs', label: 'Docs', icon: FileText },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/">
            <a className="flex items-center gap-2 text-xl font-bold text-gradient">
              <Rocket className="h-6 w-6 text-primary" />
              HabitatLab
            </a>
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location === item.path;
              const Icon = item.icon;
              return (
                <Link key={item.path} href={item.path}>
                  <a
                    className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </a>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-card/50 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>HabitatLab © 2025 • Космическая эвристика для планирования хабитатов</p>
        </div>
      </footer>
    </div>
  );
}

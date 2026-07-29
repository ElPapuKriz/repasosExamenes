import { NavLink } from 'react-router-dom';
import { BookOpen, LineChart, UploadCloud } from 'lucide-react';
import { cn } from '../../lib/utils/cn';

const navLinks = [
  { to: '/', label: 'Nuevo quiz', icon: UploadCloud },
  { to: '/biblioteca', label: 'Biblioteca', icon: BookOpen },
  { to: '/estadisticas', label: 'Estadísticas', icon: LineChart },
];

export function NavBar() {
  return (
    <header className="mx-auto flex max-w-3xl items-center justify-between px-4 py-6">
      <span className="font-display text-xl text-ink">📚 Repasa</span>
      <nav className="flex gap-1 rounded-2xl bg-white p-1 shadow-soft">
        {navLinks.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors',
                isActive ? 'bg-primary text-white' : 'text-ink/50 hover:text-ink'
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

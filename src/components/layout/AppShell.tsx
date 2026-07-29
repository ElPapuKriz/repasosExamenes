import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar';

export function AppShell() {
  return (
    <div className="min-h-screen bg-bg">
      <NavBar />

      <main className="px-4 pb-16">
        <Outlet />
      </main>
      
    </div>
  );
}

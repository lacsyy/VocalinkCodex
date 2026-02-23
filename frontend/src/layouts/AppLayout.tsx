import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/phrases', label: 'Phrases' },
  { to: '/captions', label: 'Live Captions' },
  { to: '/student', label: 'Student Mode' },
];

export function AppLayout() {
  const { pathname } = useLocation();
  const { teacher, logout, token } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold text-blue-700">VocaLink</h1>
          <nav className="flex items-center gap-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded px-3 py-1 text-sm font-medium ${
                  pathname === link.to ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          {token ? (
            <button
              className="rounded bg-slate-900 px-3 py-1 text-sm font-semibold text-white"
              onClick={logout}
              type="button"
            >
              Logout {teacher?.name ?? ''}
            </button>
          ) : (
            <Link className="rounded bg-blue-600 px-3 py-1 text-sm font-semibold text-white" to="/login">
              Teacher Login
            </Link>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}

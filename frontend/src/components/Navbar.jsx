import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Education', path: '/education' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 flat no shadows">
      <div className="flex justify-between items-center px-12 h-16 w-full max-w-[1440px] mx-auto">
        <div className="text-xl font-black text-[#00FF41] tracking-widest font-mono">
          <Link to="/">
            <img src="/logo.svg" alt="logo" className="h-4 w-auto" />
          </Link>
        </div>
        <div className="hidden md:flex gap-8 items-center font-mono uppercase tracking-tighter text-sm">
          {links.map((link) => {
            const isActive = currentPath === link.path || (link.path === '/admin' && currentPath.startsWith('/admin'));
            return (
              <Link
                key={link.name}
                to={link.path}
                className={
                  isActive
                    ? "text-[#00FF41] border-b border-[#00FF41] pb-1 glow-border-sm duration-150 px-2 py-1"
                    : "text-slate-500 hover:text-[#00FF41] hover:bg-slate-900/50 transition-all duration-200 px-2 py-1"
                }
              >
                {link.name}
              </Link>
            );
          })}
        </div>
        <Link to="/contact" className="hidden md:block font-mono text-sm border border-outline-variant px-4 py-2 text-on-surface hover:border-[#00FF41] hover:text-[#00FF41] transition-colors duration-200 bg-surface-container">
          [ Execute_Contact ]
        </Link>
        <button className="md:hidden text-[#00FF41]">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </nav>
  );
}

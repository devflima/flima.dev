import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Messages', path: '/admin/messages' },
    { name: 'System Stats', path: '/admin/stats' },
    { name: 'Projects', path: '/admin/projects' },
    { name: 'Experience', path: '/admin/experience' },
    { name: 'Education', path: '/admin/education' },
    { name: 'Tech Stack', path: '/admin/tech-stack' },
    { name: 'Page Content', path: '/admin/content' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <main className="flex-grow pt-32 pb-24 px-6 md:px-12 w-full max-w-[1400px] mx-auto flex flex-col md:flex-row gap-8">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-surface-container border border-surface-container-highest p-6 sticky top-32">
          <div className="font-label-mono text-primary-container border-b border-surface-container-highest pb-4 mb-6 flex justify-between items-center gap-2">
            <div className="flex items-center gap-2 break-words">
              <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
              <span>ADMIN_CONSOLE</span>
            </div>
            <button 
              onClick={handleLogout}
              className="md:hidden font-code-snippet text-xs text-error hover:bg-error/10 px-2 py-1 border border-error/50 transition-colors"
              title="Logout"
            >
              [ LOGOUT ]
            </button>
          </div>
          <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
            {adminLinks.map((link) => {
              const isActive = currentPath.includes(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-code-snippet text-code-snippet p-3 whitespace-nowrap md:whitespace-normal border-b-2 md:border-b-0 md:border-l-2 transition-all duration-200 ${
                    isActive 
                      ? 'border-primary-container bg-surface-container-high text-on-surface' 
                      : 'border-transparent text-on-surface-variant hover:border-surface-variant hover:bg-surface-container-lowest'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="hidden md:block font-code-snippet text-code-snippet p-3 text-left border-l-2 border-transparent text-error hover:border-error hover:bg-error/10 transition-all duration-200 mt-4"
            >
              [ LOGOUT ]
            </button>
          </nav>
        </div>
      </aside>

      {/* Admin Content Area */}
      <div className="flex-grow bg-surface-container/50 border border-surface-container-highest p-8 backdrop-blur-sm overflow-hidden">
        <Outlet />
      </div>
    </main>
  );
}

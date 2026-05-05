import { Outlet, Link, useLocation } from 'react-router-dom';

export default function AdminLayout() {
  const location = useLocation();
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

  return (
    <main className="flex-grow pt-32 pb-24 px-6 md:px-12 w-full max-w-[1400px] mx-auto flex flex-col md:flex-row gap-8">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-surface-container border border-surface-container-highest p-6 sticky top-32">
          <div className="font-label-mono text-primary-container border-b border-surface-container-highest pb-4 mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
            ADMIN_CONSOLE
          </div>
          <nav className="flex flex-col gap-2">
            {adminLinks.map((link) => {
              const isActive = currentPath.includes(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-code-snippet text-code-snippet p-3 border-l-2 transition-all duration-200 ${
                    isActive 
                      ? 'border-primary-container bg-surface-container-high text-on-surface' 
                      : 'border-transparent text-on-surface-variant hover:border-surface-variant hover:bg-surface-container-lowest'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Admin Content Area */}
      <div className="flex-grow bg-surface-container/50 border border-surface-container-highest p-8 backdrop-blur-sm">
        <Outlet />
      </div>
    </main>
  );
}

export default function Footer() {
  return (
    <footer className="w-full py-8 bg-slate-950 dark:bg-slate-950 border-t border-slate-800 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 max-w-screen-2xl mx-auto gap-4">
        <div className="font-mono text-[10px] uppercase tracking-widest text-[#00FF41]">
          &copy; {new Date().getFullYear()} {'// ALL RIGHTS RESERVED'}
        </div>
        <div className="flex gap-6 font-mono text-[10px] uppercase tracking-widest text-slate-600">
          <a className="hover:text-white transition-opacity duration-300 relative group" href="https://github.com/devflima" target="_blank" rel="noopener noreferrer">
            <span>GitHub</span><span className="absolute -top-6 left-0 hidden group-hover:block bg-surface border border-outline-variant px-2 py-1 text-primary-container">git: [devflima]</span>
          </a>
          <a className="hover:text-white transition-opacity duration-300 relative group" href="https://www.linkedin.com/in/felipe-lima-19873a14b/" target="_blank" rel="noopener noreferrer">
            <span>LinkedIn</span><span className="absolute -top-6 left-0 hidden group-hover:block bg-surface border border-outline-variant px-2 py-1 text-primary-container">in: [felipe-lima]</span>
          </a>
          <a className="hover:text-white transition-opacity duration-300 relative group" href="mailto:contato@flima.dev">
            <span>Email</span><span className="absolute -top-6 left-0 hidden group-hover:block bg-surface border border-outline-variant px-2 py-1 text-primary-container">mail: [contato]</span>
          </a>
          <span className="hover:text-white transition-opacity duration-300 border-l border-slate-800 pl-6 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF41]"></div>
            <span>Status: Operational</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

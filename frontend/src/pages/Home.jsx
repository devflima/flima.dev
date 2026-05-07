import { useGetStatsQuery, useGetPageContentQuery, useGetTechStackQuery } from '../store/apiSlice';

export default function Home() {
  const { data: stats, isLoading: isLoadingStats } = useGetStatsQuery();
  const { data: pageContent, isLoading: isLoadingContent } = useGetPageContentQuery();
  const { data: techStack, isLoading: isLoadingTechStack } = useGetTechStackQuery();

  const getSplitTitle = (title) => {
    if (!title) return { before: 'ARCHITECTING', highlighted: 'DISTRIBUTED', after: 'SYSTEMS.' };
    const words = title.split(' ').filter(Boolean);
    const len = words.length;
    if (len < 3) return { before: words[0] || '', highlighted: words[1] || '', after: '' };
    
    const midIndex = Math.floor(len / 2);
    const startHighlight = len % 2 === 0 ? midIndex - 1 : midIndex;
    const highlightCount = len % 2 === 0 ? 2 : 1;
    
    return {
      before: words.slice(0, startHighlight).join(' '),
      highlighted: words.slice(startHighlight, startHighlight + highlightCount).join(' '),
      after: words.slice(startHighlight + highlightCount).join(' ')
    };
  };

  if (isLoadingStats || isLoadingContent || isLoadingTechStack) {
    return (
      <main className="flex-grow pt-[120px] pb-24 px-6 md:px-12 w-full max-w-[1440px] mx-auto">
        <div className="font-label-mono text-primary-container"><span className="cursor-blink">Loading...</span></div>
      </main>
    );
  }

  if (!stats) return null;

  return (
    <main className="flex-grow pt-[120px] pb-24 px-6 md:px-12 w-full max-w-[1440px] mx-auto">
      {/* Hero Section */}
      <section className="mb-32">
        <div className="font-label-mono text-label-mono text-primary-container mb-4 flex items-center gap-2">
          <span className="cursor-blink inline-block w-2 h-4 bg-primary-container"></span><span>STATUS: ONLINE</span>
        </div>
        <h1 className="font-headline-xl text-[48px] leading-[1.1] md:text-[80px] text-on-surface tracking-tighter font-black mb-6">
          {getSplitTitle(pageContent?.home?.title).before} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-secondary-container">
            {getSplitTitle(pageContent?.home?.title).highlighted}
          </span> <br />
          {getSplitTitle(pageContent?.home?.title).after}
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-12">
          {pageContent?.home?.subtitle || 'Specializing in high-performance backends, microservices, and cloud-native infrastructure. Building robust, scalable solutions for complex data pipelines.'}
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button className="font-label-mono text-label-mono bg-primary-container text-on-primary-container hover:bg-secondary-container px-6 py-3 transition-colors duration-200">
            [ View_Architecture ]
          </button>
          <button className="font-label-mono text-label-mono border border-outline-variant text-on-surface hover:border-primary-container hover:text-primary-container px-6 py-3 transition-colors duration-200">
            [ Contact_SysAdmin ]
          </button>
        </div>
      </section>

      {/* Telemetry/Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-32 border-t border-surface-container-highest pt-16">
        <div className="relative group">
          <div className="absolute inset-0 bg-primary-container/5 blur-xl group-hover:bg-primary-container/10 transition-colors"></div>
          <div className="relative border border-surface-container-highest bg-surface-container-low p-8 h-full glow-border transition-all">
            <span className="material-symbols-outlined text-4xl text-primary-container mb-4">dns</span>
            <div className="font-headline-xl text-headline-xl text-on-surface">{stats.yearsExperience}</div>
            <div className="font-label-mono text-label-mono text-on-surface-variant mt-2">YEARS_EXPERIENCE</div>
          </div>
        </div>
        
        <div className="relative group">
          <div className="absolute inset-0 bg-secondary-container/5 blur-xl group-hover:bg-secondary-container/10 transition-colors"></div>
          <div className="relative border border-surface-container-highest bg-surface-container-low p-8 h-full glow-border transition-all">
            <span className="material-symbols-outlined text-4xl text-secondary-container mb-4">memory</span>
            <div className="font-headline-xl text-headline-xl text-on-surface">{stats.systemDeployed}</div>
            <div className="font-label-mono text-label-mono text-on-surface-variant mt-2">SYS_DEPLOYED</div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-tertiary-container/5 blur-xl group-hover:bg-tertiary-container/10 transition-colors"></div>
          <div className="relative border border-surface-container-highest bg-surface-container-low p-8 h-full glow-border transition-all">
            <span className="material-symbols-outlined text-4xl text-tertiary-container mb-4">public</span>
            <div className="font-headline-xl text-headline-xl text-on-surface">{stats.uptimeSLA}</div>
            <div className="font-label-mono text-label-mono text-on-surface-variant mt-2">UPTIME_SLA</div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-error-container/5 blur-xl group-hover:bg-error-container/10 transition-colors"></div>
          <div className="relative border border-surface-container-highest bg-surface-container-low p-8 h-full glow-border transition-all">
            <span className="material-symbols-outlined text-4xl text-error-container mb-4">code_blocks</span>
            <div className="font-headline-xl text-headline-xl text-on-surface">{stats.commitsLogged}</div>
            <div className="font-label-mono text-label-mono text-on-surface-variant mt-2">COMMITS_LOGGED</div>
          </div>
        </div>
      </section>

      {/* Core Tech Stack Terminal Mockup */}
      <section className="border border-surface-container-highest bg-surface-container-lowest max-w-4xl mx-auto">
        <div className="flex items-center px-4 py-2 bg-surface-container border-b border-surface-container-highest">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-error"></div>
            <div className="w-3 h-3 rounded-full bg-[#f1c40f]"></div>
            <div className="w-3 h-3 rounded-full bg-primary-container"></div>
          </div>
          <div className="mx-auto font-label-mono text-label-mono text-on-surface-variant opacity-70">
            tech_stack.sh
          </div>
        </div>
        <div className="p-6 md:p-8 font-code-snippet text-code-snippet text-on-surface-variant leading-relaxed">
          <span className="text-primary-container">sysadmin@backend:~$</span> cat core_stack.json <br />
          {'{'} <br />
          &nbsp;&nbsp;<span className="text-secondary-container">"languages"</span>: {JSON.stringify(techStack?.languages || ["Gol"])}, <br />
          &nbsp;&nbsp;<span className="text-secondary-container">"databases"</span>: {JSON.stringify(techStack?.databases || ["Pos"])}, <br />
          &nbsp;&nbsp;<span className="text-secondary-container">"infrastructure"</span>: {JSON.stringify(techStack?.infrastructure || ["Kub"])}, <br />
          &nbsp;&nbsp;<span className="text-secondary-container">"messaging"</span>: {JSON.stringify(techStack?.messaging || ["Kaf"])} <br />
          {'}'} <br />
          <span className="text-primary-container">sysadmin@backend:~$</span> <span className="cursor-blink inline-block w-2 h-4 bg-primary-container align-middle"></span>
        </div>
      </section>
    </main>
  );
}

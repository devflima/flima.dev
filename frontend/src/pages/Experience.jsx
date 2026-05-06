import { useGetExperienceQuery, useGetPageContentQuery } from '../store/apiSlice';

export default function Experience() {
  const { data: experiences, isLoading: isLoadingExp } = useGetExperienceQuery();
  const { data: pageContent, isLoading: isLoadingContent } = useGetPageContentQuery();

  if (isLoadingExp || isLoadingContent) {
    return (
      <main className="flex-grow pt-[120px] pb-24 px-6 md:px-12 w-full max-w-[1000px] mx-auto">
        <div className="font-label-mono text-primary-container"><span className="cursor-blink">Loading...</span></div>
      </main>
    );
  }

  if (!experiences) return null;

  return (
    <main className="flex-grow pt-[120px] pb-24 px-6 md:px-12 w-full max-w-[1000px] mx-auto">
      <h1 className="font-headline-xl text-[40px] md:text-[64px] text-on-surface tracking-tighter font-black mb-4">
        {pageContent?.experience?.title || 'RUNTIME_HISTORY'}
      </h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-16">
        {pageContent?.experience?.subtitle || 'A chronological log of my professional execution states and deployed responsibilities.'}
      </p>

      <div className="relative border-l border-surface-container-highest ml-4 md:ml-6 pl-8 md:pl-12 space-y-16">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative group">
            {/* Timeline Node */}
            <div className={`absolute -left-[41px] md:-left-[57px] top-0 w-8 h-8 rounded-full bg-surface border-2 border-surface-container-highest flex items-center justify-center group-hover:border-primary-container transition-colors duration-300 z-10`}>
              <div className="w-2 h-2 rounded-full bg-primary-container glow-border-sm"></div>
            </div>

            <article className="border border-surface-container-highest bg-surface-container-lowest p-6 md:p-8 hover:border-surface-variant transition-colors duration-300">
              <header className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface mb-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-container">{exp.icon}</span>
                    {exp.title}
                  </h2>
                  <div className="font-code-snippet text-code-snippet text-surface-variant">
                    @{exp.company}
                  </div>
                </div>
                <div className="font-label-mono text-label-mono text-on-surface-variant bg-surface-container px-3 py-1 border border-surface-container-highest inline-block">
                  {exp.period}
                </div>
              </header>

              <ul className="space-y-4 mb-8">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="font-body-base text-body-base text-on-surface-variant flex items-start gap-3">
                    <span className="text-primary-container mt-1">&gt;</span>
                    {bullet}
                  </li>
                ))}
              </ul>

              <footer className="pt-4 border-t border-surface-container-highest">
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map(tech => (
                    <span key={tech} className="font-label-mono text-[10px] text-on-surface bg-surface-container-high px-2 py-1 uppercase tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>
              </footer>
            </article>
          </div>
        ))}
      </div>
    </main>
  );
}

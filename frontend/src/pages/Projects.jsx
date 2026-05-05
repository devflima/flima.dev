import { useGetProjectsQuery, useGetPageContentQuery } from '../store/apiSlice';

export default function Projects() {
  const { data: projects, isLoading: isLoadingProjects } = useGetProjectsQuery();
  const { data: pageContent, isLoading: isLoadingContent } = useGetPageContentQuery();

  if (isLoadingProjects || isLoadingContent) {
    return (
      <main className="flex-grow pt-[120px] pb-24 px-6 md:px-12 w-full max-w-[1440px] mx-auto">
        <div className="font-label-mono text-primary-container"><span className="cursor-blink">Loading...</span></div>
      </main>
    );
  }

  if (!projects) return null;

  return (
    <main className="flex-grow pt-[120px] pb-24 px-6 md:px-12 w-full max-w-[1440px] mx-auto">
      <h1 className="font-headline-xl text-[40px] md:text-[64px] text-on-surface tracking-tighter font-black mb-4">
        {pageContent?.projects?.title || 'ARCHITECTURE_REPOSITORY'}
      </h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-16">
        {pageContent?.projects?.subtitle || 'A selection of distributed systems, microservices, and high-performance APIs I have designed and implemented.'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((proj) => (
          <article key={proj.id} className="border border-surface-container-highest bg-surface-container-lowest group relative overflow-hidden flex flex-col">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-container to-secondary-container transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            
            <div className="p-8 flex flex-col flex-grow">
              <header className="mb-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="material-symbols-outlined text-4xl text-primary-container">{proj.icon}</span>
                  <div className="font-label-mono text-label-mono text-surface-variant border border-surface-container-highest px-3 py-1">
                    v{proj.id}.0
                  </div>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface mb-2">{proj.title}</h2>
                <div className="font-code-snippet text-code-snippet text-secondary-container">{proj.subtitle}</div>
              </header>
              
              <p className="font-body-base text-body-base text-on-surface-variant mb-8 flex-grow">
                {proj.description}
              </p>

              <div className="mb-8 p-4 bg-surface-container border border-surface-container-highest font-code-snippet text-sm text-on-surface-variant overflow-x-auto">
                <pre><code>{proj.codeSnippet}</code></pre>
              </div>

              <footer className="mt-auto pt-6 border-t border-surface-container-highest">
                <div className="flex flex-wrap gap-2">
                  {proj.technologies.map(tech => (
                    <span key={tech} className="font-label-mono text-[10px] text-on-surface bg-surface-container-high px-2 py-1 uppercase tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>
              </footer>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

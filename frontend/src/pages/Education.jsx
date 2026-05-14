import { useGetEducationQuery, useGetPageContentQuery } from '../store/apiSlice';

export default function Education() {
  const { data: education, isLoading: isLoadingEdu } = useGetEducationQuery();
  const { data: pageContent, isLoading: isLoadingContent } = useGetPageContentQuery();

  if (isLoadingEdu || isLoadingContent) {
    return (
      <main className="flex-grow pt-[120px] pb-24 px-6 md:px-12 w-full max-w-[1000px] mx-auto">
        <div className="font-label-mono text-primary-container"><span className="cursor-blink">Loading...</span></div>
      </main>
    );
  }

  if (!education) return null;

  const parseCertificationTitle = (fullTitle) => {
    const match = fullTitle.match(/(.*)\s*\((.*?)\)$/);
    if (match) {
      return { title: match[1].trim(), origin: match[2].trim() };
    }
    return { title: fullTitle, origin: '' };
  };

  return (
    <main className="flex-grow pt-[120px] pb-24 px-6 md:px-12 w-full max-w-[1000px] mx-auto">
      <h1 className="font-headline-xl text-[40px] md:text-[64px] text-on-surface tracking-tighter font-black mb-4">
        {pageContent?.education?.title || 'ACADEMIC_RECORD'}
      </h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-16">
        {pageContent?.education?.subtitle || 'Degrees, certifications, and formal training.'}
      </p>

      <div className="space-y-12">
        {/* Degrees Section */}
        <section>
          <div className="font-label-mono text-label-mono text-on-surface-variant border-b border-surface-container-highest pb-2 mb-8 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container">school</span><span>ACADEMIC_DEGREES</span>
          </div>
          <div className="space-y-6">
            {education.filter(e => e.typeEducation === 'DEGREE').map(deg => (
              <article key={deg.id} className="border border-surface-container-highest bg-surface-container-lowest p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary-container"></div>
                <div className="md:w-1/3">
                  <div className="font-label-mono text-label-mono text-surface-variant mb-2">{deg.period}</div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface mb-1">{deg.degree}</h2>
                  <div className="font-code-snippet text-code-snippet text-primary-container">{deg.title}</div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4">{deg.institution}</h3>
                  <div className="space-y-2 mb-6">
                    <div>
                      <div className="font-label-mono text-label-mono text-surface-variant mb-3">SPECIALIZATION:</div>
                      <div className="font-body-base text-body-base text-on-surface">{deg.specialization}</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-label-mono text-label-mono text-surface-variant mb-3">CORE_ARCHITECTURES:</div>
                    <div className="flex flex-wrap gap-2">
                      {deg.architectures.map(arch => (
                        <span key={arch} className="font-label-mono text-[10px] text-on-surface bg-surface-container px-2 py-1 uppercase tracking-wider border border-surface-container-highest">
                          {arch}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section>
          <div className="font-label-mono text-label-mono text-on-surface-variant border-b border-surface-container-highest pb-2 mb-8 flex items-center gap-2 mt-16">
            <span className="material-symbols-outlined text-secondary-container">verified</span><span>CERTIFICATIONS_&_MODULES</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.filter(e => e.typeEducation === 'CERTIFICATION').map(cert => {
              const parsed = parseCertificationTitle(cert.title);
              return (
              <div key={cert.id} className="border border-surface-container-highest bg-surface-container-lowest max-w-4xl w-full flex flex-col group hover:border-secondary-container transition-colors duration-300">
                {/* Terminal Header */}
                <div className="flex items-center px-4 py-2 bg-surface-container border-b border-surface-container-highest group-hover:bg-surface-container-high transition-colors">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-error"></div>
                    <div className="w-3 h-3 rounded-full bg-[#f1c40f]"></div>
                    <div className="w-3 h-3 rounded-full bg-primary-container"></div>
                  </div>
                  <div className="mx-auto font-label-mono text-label-mono text-on-surface-variant opacity-70 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-secondary-container">{(cert.skills?.[0] !== 'N/A' ? cert.skills?.[0] : null) || cert.icon || 'verified'}</span>
                    {parsed.origin || 'CERTIFICATE'}
                  </div>
                </div>
                
                {/* Terminal Body */}
                <div className="p-6 md:p-8 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface break-words">{parsed.title}</h3>
                    <div className="font-code-snippet text-[10px] text-primary-container uppercase tracking-widest border border-primary-container/30 px-2 py-1 bg-primary-container/5 whitespace-nowrap">ISSUED: {cert.period}</div>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-auto">{(cert.specialization !== 'N/A' ? cert.specialization : null) || cert.description}</p>
                </div>
              </div>
            )})}
          </div>
        </section>
      </div>
    </main>
  );
}

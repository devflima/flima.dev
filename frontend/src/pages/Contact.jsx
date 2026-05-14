import { useState, useEffect } from 'react';
import { useAddMessageMutation, useGetPageContentQuery } from '../store/apiSlice';

export default function Contact() {
  const { data: pageContent, isLoading: isLoadingContent } = useGetPageContentQuery();
  const [formData, setFormData] = useState({ user_name: '', user_email: '', title_header: '', message_body: '' });
  const [status, setStatus] = useState('idle'); // idle, success, error
  const [cooldown, setCooldown] = useState(0);

  const [addMessage, { isLoading }] = useAddMessageMutation();

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown(c => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cooldown > 0) return;

    try {
      const payload = {
        username: formData.user_name,
        email: formData.user_email,
        subject: formData.title_header,
        message: formData.message_body,
      };

      await addMessage(payload).unwrap();

      setStatus('success');
      setFormData({ user_name: '', user_email: '', title_header: '', message_body: '' });
      setCooldown(60); // 60 seconds cooldown to prevent spam

      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
    }
  };

  if (isLoadingContent) {
    return (
      <main className="flex-grow pt-[120px] pb-24 px-6 md:px-12 w-full max-w-[1000px] mx-auto">
        <div className="font-label-mono text-primary-container"><span className="cursor-blink">Loading...</span></div>
      </main>
    );
  }

  return (
    <main className="flex-grow pt-[120px] pb-24 px-6 md:px-12 w-full max-w-container-max mx-auto flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl border border-surface-container-highest bg-surface/80 backdrop-blur-md">
        {/* Terminal Header */}
        <div className="flex items-center px-4 py-2 bg-surface-container border-b border-surface-container-highest">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-error"></div>
            <div className="w-3 h-3 rounded-full bg-[#f1c40f]"></div>
            <div className="w-3 h-3 rounded-full bg-primary-container"></div>
          </div>
          <div className="mx-auto font-label-mono text-label-mono text-on-surface-variant opacity-70">
            user@backend-architect: ~/contact
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-8 md:p-12 space-y-12">
          <div>
            <h1 className="font-headline-xl text-[40px] md:text-headline-xl break-words leading-tight text-on-background mb-4">
              {pageContent?.contact?.title || 'INITIATE_CONTACT'}
            </h1>
            <p className="font-body-base text-body-base text-on-surface-variant max-w-xl">
              {pageContent?.contact?.subtitle || 'Awaiting input. Provide valid parameters to establish a secure connection or transmit a payload directly via the form interface below.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="user_name" className="font-label-mono text-label-mono text-primary-container flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">terminal</span><span>Input: user_name</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-code-snippet text-code-snippet text-on-surface-variant">&gt;</span>
                  <input id="user_name" required name="user_name" value={formData.user_name} onChange={handleChange} className="w-full bg-surface-container-low border border-surface-container-highest focus:border-primary-container focus:ring-0 text-on-background font-code-snippet text-code-snippet pl-8 py-3 outline-none transition-colors" placeholder="Enter string..." type="text" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="user_email" className="font-label-mono text-label-mono text-primary-container flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">terminal</span><span>Input: user_email</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-code-snippet text-code-snippet text-on-surface-variant">&gt;</span>
                  <input id="user_email" required name="user_email" value={formData.user_email} onChange={handleChange} className="w-full bg-surface-container-low border border-surface-container-highest focus:border-primary-container focus:ring-0 text-on-background font-code-snippet text-code-snippet pl-8 py-3 outline-none transition-colors" placeholder="user@domain.tld" type="email" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="title_header" className="font-label-mono text-label-mono text-primary-container flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">terminal</span><span>Input: title_header</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-code-snippet text-code-snippet text-on-surface-variant">&gt;</span>
                  <input id="title_header" required name="title_header" value={formData.title_header} onChange={handleChange} className="w-full bg-surface-container-low border border-surface-container-highest focus:border-primary-container focus:ring-0 text-on-background font-code-snippet text-code-snippet pl-8 py-3 outline-none transition-colors" placeholder="Enter metadata..." type="text" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message_body" className="font-label-mono text-label-mono text-primary-container flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">terminal</span><span>Input: message_body</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-4 font-code-snippet text-code-snippet text-on-surface-variant">&gt;</span>
                  <textarea id="message_body" required name="message_body" value={formData.message_body} onChange={handleChange} className="w-full bg-surface-container-low border border-surface-container-highest focus:border-primary-container focus:ring-0 text-on-background font-code-snippet text-code-snippet pl-8 py-3 outline-none transition-colors resize-none" placeholder="Enter payload data..." rows="5"></textarea>
                </div>
              </div>

              {status === 'success' && (
                <div className="p-3 border border-primary-container/50 bg-primary-container/10 text-primary-container font-code-snippet text-sm glow-border-sm">
                  &gt; Payload transmitted successfully. Connection closed.
                </div>
              )}
              {status === 'error' && (
                <div className="p-3 border border-error/50 bg-error/10 text-error font-code-snippet text-sm">
                  &gt; Transmission failed. Check connection logs.
                </div>
              )}

              <div className="pt-4">
                <button disabled={isLoading || cooldown > 0} className="w-full font-label-mono text-label-mono border border-surface-container-highest text-on-surface hover:text-surface-container-lowest hover:bg-primary-container hover:border-primary-container py-4 transition-all duration-200 flex justify-center items-center gap-2 uppercase tracking-widest group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-on-surface disabled:hover:border-surface-container-highest" type="submit">
                  {isLoading ? (
                    ' [ Transmitting... ] '
                  ) : cooldown > 0 ? (
                    ` [ Rate_Limit: ${cooldown}s ] `
                  ) : (
                    ' [ Execute_Transmission ] '
                  )}
                  {!isLoading && cooldown === 0 && <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">send</span>}
                </button>
              </div>
            </form>

            {/* Direct Links Section */}
            <div className="flex flex-col gap-6">
              <div className="font-label-mono text-label-mono text-on-surface-variant border-b border-surface-container-highest pb-2 mb-2">
                {'// DIRECT_LINKS'}
              </div>
              <a className="group flex items-center justify-between p-4 border border-surface-container-highest bg-surface-container-low hover:border-secondary-container transition-colors gap-4" href="https://github.com/devflima" target="_blank" rel="noopener noreferrer">
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <span className="material-symbols-outlined text-secondary-container flex-shrink-0">code</span>
                  <div className="min-w-0 flex-1">
                    <div className="font-label-mono text-label-mono text-on-background truncate">GitHub</div>
                    <div className="font-code-snippet text-code-snippet text-on-surface-variant truncate">github.com/backend_arch</div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary-container transition-colors flex-shrink-0">arrow_outward</span>
              </a>
              <a className="group flex items-center justify-between p-4 border border-surface-container-highest bg-surface-container-low hover:border-secondary-container transition-colors gap-4" href="https://www.linkedin.com/in/felipe-lima-19873a14b/" target="_blank" rel="noopener noreferrer">
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <span className="material-symbols-outlined text-secondary-container flex-shrink-0">work</span>
                  <div className="min-w-0 flex-1">
                    <div className="font-label-mono text-label-mono text-on-background truncate">LinkedIn</div>
                    <div className="font-code-snippet text-code-snippet text-on-surface-variant truncate">linkedin.com/in/backend_arch</div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary-container transition-colors flex-shrink-0">arrow_outward</span>
              </a>
              <a className="group flex items-center justify-between p-4 border border-surface-container-highest bg-surface-container-low hover:border-secondary-container transition-colors gap-4" href="mailto:contato@flima.dev">
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <span className="material-symbols-outlined text-secondary-container flex-shrink-0">mail</span>
                  <div className="min-w-0 flex-1">
                    <div className="font-label-mono text-label-mono text-on-background truncate">Email</div>
                    <div className="font-code-snippet text-code-snippet text-on-surface-variant truncate">sysadmin@backend.local</div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary-container transition-colors flex-shrink-0">arrow_outward</span>
              </a>

              {/* Terminal Output Mockup */}
              <div className="mt-auto pt-8">
                <div className="font-code-snippet text-code-snippet text-on-surface-variant bg-surface-container-lowest p-4 border border-surface-container-highest">
                  <span className="text-primary-container">sys@admin</span>:~$ status check<br />
                  &gt; System online.<br />
                  &gt; Listening on port 443.<br />
                  &gt; Ready for input <span className="cursor-blink inline-block w-2 h-4 bg-primary-container align-middle ml-1"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

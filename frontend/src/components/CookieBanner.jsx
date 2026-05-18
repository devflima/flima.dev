import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('lgpd_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    } else if (consent === 'accepted' && !localStorage.getItem('visitor_id')) {
      // Ensure visitor_id is set if accepted but missing
      localStorage.setItem('visitor_id', crypto.randomUUID());
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('lgpd_cookie_consent', 'accepted');
    if (!localStorage.getItem('visitor_id')) {
      localStorage.setItem('visitor_id', crypto.randomUUID());
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('lgpd_cookie_consent', 'declined');
    localStorage.removeItem('visitor_id');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface-container border-t border-surface-container-highest p-4 shadow-lg animate-slide-up">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="font-code-snippet text-sm text-on-surface">
            <strong>[ LGPD_NOTICE ]</strong> Nós utilizamos cookies essenciais e analíticos para melhorar sua experiência e contabilizar visitas de forma anônima. 
            Ao continuar navegando, você concorda com a nossa <a href="/privacy" className="text-primary-container hover:underline">Política de Privacidade</a>.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={handleDecline}
            className="font-label-mono text-label-mono text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest border border-surface-container-highest px-4 py-2 transition-colors"
          >
            [ Recusar ]
          </button>
          <button 
            onClick={handleAccept}
            className="font-label-mono text-label-mono text-surface-container-lowest bg-primary-container hover:bg-primary border border-primary-container hover:border-primary px-4 py-2 transition-colors"
          >
            [ Aceitar_Cookies ]
          </button>
        </div>
      </div>
    </div>
  );
}

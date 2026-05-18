export default function PrivacyPolicy() {
  return (
    <main className="flex-grow pt-[120px] pb-24 px-6 md:px-12 w-full max-w-[800px] mx-auto">
      <div className="font-label-mono text-primary-container mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-[16px]">gavel</span><span>LEGAL_NOTICE</span>
      </div>
      <h1 className="font-headline-xl text-[40px] md:text-headline-xl text-on-surface tracking-tighter font-black mb-8">
        Política de Privacidade
      </h1>
      
      <div className="space-y-8 text-on-surface-variant font-body-base text-body-base leading-relaxed">
        <section>
          <h2 className="font-headline-md text-on-surface mb-3">1. Coleta de Dados</h2>
          <p>
            Coletamos informações apenas quando você preenche ativamente o nosso formulário de contato. Os dados coletados incluem: 
            Nome, E-mail, Assunto e Mensagem.
          </p>
        </section>
        
        <section>
          <h2 className="font-headline-md text-on-surface mb-3">2. Uso dos Dados</h2>
          <p>
            Os dados fornecidos no formulário de contato são utilizados exclusivamente para que possamos responder à sua mensagem. 
            Não compartilhamos, vendemos ou alugamos suas informações para terceiros.
          </p>
        </section>

        <section>
          <h2 className="font-headline-md text-on-surface mb-3">3. Cookies e Rastreamento</h2>
          <p>
            Utilizamos um cookie essencial no seu navegador ("visitor_id") com o seu consentimento. 
            Ele gera um identificador único anônimo apenas para evitar a contagem duplicada de acessos no nosso painel de estatísticas. 
            Não utilizamos rastreadores de terceiros, como Google Analytics ou Meta Pixel, portanto sua navegação não é monitorada para fins de publicidade.
          </p>
        </section>

        <section>
          <h2 className="font-headline-md text-on-surface mb-3">4. Direitos do Titular</h2>
          <p>
            Conforme a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018), você tem o direito de solicitar a exclusão de seus dados 
            ou a revogação do consentimento a qualquer momento. Para isso, basta entrar em contato através do e-mail <strong>contato@flima.dev</strong>.
          </p>
        </section>

        <section>
          <h2 className="font-headline-md text-on-surface mb-3">5. Segurança</h2>
          <p>
            Adotamos medidas técnicas e administrativas para proteger seus dados contra acessos não autorizados ou situações acidentais de perda, 
            alteração ou destruição. Todas as comunicações com o servidor são criptografadas via HTTPS.
          </p>
        </section>
      </div>
    </main>
  );
}

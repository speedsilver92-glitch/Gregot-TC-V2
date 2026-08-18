import { useState, useRef, useEffect } from 'react';
import { translations, Language } from './translations';

interface LogoProps {
  className: string;
  textColor?: string;
  barColor?: string;
  arrowColor?: string;
}

const LogoSVG = ({ className, textColor = "#1e3a5f", arrowColor = "#b8960c" }: LogoProps) => (
  <svg className={className} viewBox="0 0 260 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* GREGOR in large navy serif letters */}
    <text x="130" y="48" textAnchor="middle" fontFamily="Georgia, serif" fontSize="44" fontWeight="bold" fill={textColor} letterSpacing="3">GREGOR</text>
    {/* Decorative line - T&C - s.r.o. */}
    <line x1="30" y1="76" x2="90" y2="76" stroke={arrowColor} strokeWidth="2" />
    <text x="130" y="86" textAnchor="middle" fontFamily="Georgia, serif" fontSize="30" fontWeight="bold" fill={arrowColor} letterSpacing="3">T&amp;C</text>
    <text x="130" y="108" textAnchor="middle" fontFamily="Georgia, serif" fontSize="18" fill={textColor} letterSpacing="1">s.r.o.</text>
    <line x1="170" y1="76" x2="230" y2="76" stroke={arrowColor} strokeWidth="2" />
  </svg>
);

const LogoWhiteSVG = ({ className }: { className: string }) => (
  <svg className={className} viewBox="0 0 260 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* GREGOR in large white serif letters */}
    <text x="130" y="48" textAnchor="middle" fontFamily="Georgia, serif" fontSize="44" fontWeight="bold" fill="#ffffff" letterSpacing="3">GREGOR</text>
    {/* Decorative line - T&C - s.r.o. */}
    <line x1="30" y1="76" x2="90" y2="76" stroke="#d4af37" strokeWidth="2" />
    <text x="130" y="86" textAnchor="middle" fontFamily="Georgia, serif" fontSize="30" fontWeight="bold" fill="#d4af37" letterSpacing="3">T&amp;C</text>
    <text x="130" y="108" textAnchor="middle" fontFamily="Georgia, serif" fontSize="18" fill="#ffffff" letterSpacing="1">s.r.o.</text>
    <line x1="170" y1="76" x2="230" y2="76" stroke="#d4af37" strokeWidth="2" />
  </svg>
);

export default function App() {
  const [showDodavky, setShowDodavky] = useState(false);
  const [showObchod, setShowObchod] = useState(false);
  const [showEnergia, setShowEnergia] = useState(false);
  const [showOrg, setShowOrg] = useState(false);
  const [showFinancie, setShowFinancie] = useState(false);
  const [language, setLanguage] = useState<Language>('sk');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [hasSentMessage, setHasSentMessage] = useState(false);
  const [sentMessageText, setSentMessageText] = useState('');
  const chatInputRef = useRef<HTMLInputElement>(null);

  const t = translations[language];
  const isSk = language === 'sk';

  useEffect(() => {
    if (chatOpen && chatInputRef.current) {
      chatInputRef.current.focus();
    }
  }, [chatOpen]);

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setSentMessageText(chatMessage.trim());
      setHasSentMessage(true);
      setChatMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'sk' ? 'en' : 'sk');
  };

  const getFooterText = () => {
    return isSk ? 'Finančné, energetické a organizačné poradenstvo' : 'Financial, energy and organisational consulting';
  };

  const emailSubject = encodeURIComponent(isSk ? 'Správa z webu - Gregor T&C' : 'Website Message - Gregor T&C');
  const emailBody = encodeURIComponent(
    isSk 
      ? `Dobrý deň,\n\nMám otázku:\n${sentMessageText}\n\nĎakujem.`
      : `Hello,\n\nI have a question:\n${sentMessageText}\n\nThank you.`
  );
  const whatsappMessage = encodeURIComponent(
    isSk 
      ? `Dobrý deň, mám otázku: ${sentMessageText}`
      : `Hello, I have a question: ${sentMessageText}`
  );

  if (showFinancie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-zinc-100">
        <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <LogoSVG className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">GREGOR T&C s.r.o.</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={toggleLanguage} className="px-3 py-1 text-sm font-medium text-slate-600 hover:text-blue-600 transition border border-slate-300 rounded-lg">
                {isSk ? t.lang_en : t.lang_sk}
              </button>
              <button onClick={() => setShowFinancie(false)} className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>{t.back}</span>
              </button>
            </div>
          </div>
        </header>

        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t.fin_page_title}</h1>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto">{t.fin_page_hero}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-slate-600 leading-relaxed text-lg">{t.fin_page_intro}</p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">{t.fin_page_services_title}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 2v20M17 5H9.5a2.5 2.5 0 000 5H12" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.fin_page_service1}</h4>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 2v20M17 5H9.5a2.5 2.5 0 000 5H12" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.fin_page_service2}</h4>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 2v20M17 5H9.5a2.5 2.5 0 000 5H12" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.fin_page_service3}</h4>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
<svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <path d="M8 6h8M8 10h8M8 14h4" />
                </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.fin_page_service4}</h4>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.fin_page_service5}</h4>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M9 12l2 2 4-4" />
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.fin_page_service6}</h4>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.fin_page_service7}</h4>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">{t.fin_page_benefits_title}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.fin_page_benefit1}</h4>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.fin_page_benefit2}</h4>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.fin_page_benefit3}</h4>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M13 2L3 14h9l-1 8L21 10h-9l1-8z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.fin_page_benefit4}</h4>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <div>
                  <h4 className="font-bold text-amber-900 mb-2">{t.fin_page_disclaimer_title}</h4>
                  <p className="text-amber-800 text-sm leading-relaxed">{t.fin_page_disclaimer}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">{t.fin_page_cta}</h2>
            <a href="#kontakt" onClick={(e) => { e.preventDefault(); setShowFinancie(false); }} className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-medium text-lg hover:shadow-lg transition">
              {t.fin_page_cta_btn}
            </a>
          </div>
        </section>

        <footer className="bg-slate-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <LogoWhiteSVG className="w-10 h-10" />
                <span className="text-xl font-bold">GREGOR T&C s.r.o.</span>
              </div>
              <p className="text-slate-400 mb-6">{getFooterText()}</p>
              <div className="border-t border-slate-800 pt-6">
                <p className="text-slate-500 text-sm">
                  &copy; {new Date().getFullYear()} GREGOR T&C s.r.o. {t.footer_rights}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  if (showOrg) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-zinc-100">
        <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <LogoSVG className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">GREGOR T&C s.r.o.</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={toggleLanguage} className="px-3 py-1 text-sm font-medium text-slate-600 hover:text-blue-600 transition border border-slate-300 rounded-lg">
                {isSk ? t.lang_en : t.lang_sk}
              </button>
              <button onClick={() => setShowOrg(false)} className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>{t.back}</span>
              </button>
            </div>
          </div>
        </header>

        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t.org_page_title}</h1>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto">{t.org_page_hero}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-slate-600 leading-relaxed text-lg">{t.org_page_intro}</p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">{t.fin_page_services_title}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.org_page_service1}</h4>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 16V8a2 2 0 00-1-1.73l-8-5a2 2 0 00-2 0l-8 5a2 2 0 00-1 1.73v8a2 2 0 001 1.73l8 5a2 2 0 002 0l8-5a2 2 0 001-1.73z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.org_page_service2}</h4>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M13 2L3 14h9l-1 8L21 10h-9l1-8z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.org_page_service3}</h4>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.org_page_service4}</h4>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.org_page_service5}</h4>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M9 12l2 2 4-4" />
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.org_page_service6}</h4>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.org_page_service7}</h4>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-pink-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 16V8a2 2 0 00-1-1.73l-8-5a2 2 0 00-2 0l-8 5a2 2 0 00-1 1.73v8a2 2 0 001 1.73l8 5a2 2 0 002 0l8-5a2 2 0 001-1.73z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.org_page_service8}</h4>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">{t.fin_page_benefits_title}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.org_page_benefit1}</h4>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 16V8a2 2 0 00-1-1.73l-8-5a2 2 0 00-2 0l-8 5a2 2 0 00-1 1.73v8a2 2 0 001 1.73l8 5a2 2 0 002 0l8-5a2 2 0 001-1.73z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.org_page_benefit2}</h4>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.org_page_benefit3}</h4>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M9 12l2 2 4-4" />
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.org_page_benefit4}</h4>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M13 2L3 14h9l-1 8L21 10h-9l1-8z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.org_page_benefit5}</h4>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <div>
                  <h4 className="font-bold text-amber-900 mb-2">{t.fin_page_disclaimer_title}</h4>
                  <p className="text-amber-800 text-sm leading-relaxed">{t.org_page_disclaimer}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">{t.org_page_cta}</h2>
            <a href="#kontakt" onClick={(e) => { e.preventDefault(); setShowOrg(false); }} className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-medium text-lg hover:shadow-lg transition">
              {t.fin_page_cta_btn}
            </a>
          </div>
        </section>

        <footer className="bg-slate-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <LogoWhiteSVG className="w-10 h-10" />
                <span className="text-xl font-bold">GREGOR T&C s.r.o.</span>
              </div>
              <p className="text-slate-400 mb-6">{getFooterText()}</p>
              <div className="border-t border-slate-800 pt-6">
                <p className="text-slate-500 text-sm">
                  &copy; {new Date().getFullYear()} GREGOR T&C s.r.o. {t.footer_rights}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  if (showEnergia) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-zinc-100">
        <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <LogoSVG className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">GREGOR T&C s.r.o.</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={toggleLanguage} className="px-3 py-1 text-sm font-medium text-slate-600 hover:text-blue-600 transition border border-slate-300 rounded-lg">
                {isSk ? t.lang_en : t.lang_sk}
              </button>
              <button onClick={() => setShowEnergia(false)} className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>{t.back}</span>
              </button>
            </div>
          </div>
        </header>

        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t.eng_page_title}</h1>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto">{t.eng_page_hero}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-slate-600 leading-relaxed text-lg">{t.eng_page_intro}</p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">{t.fin_page_services_title}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M13 2L3 14h9l-1 8L21 10h-9l1-8z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.eng_page_service1}</h4>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 16V8a2 2 0 00-1-1.73l-8-5a2 2 0 00-2 0l-8 5a2 2 0 00-1 1.73v8a2 2 0 001 1.73l8 5a2 2 0 002 0l8-5a2 2 0 001-1.73z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.eng_page_service2}</h4>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 1v22M17 5H9.5a2.5 2.5 0 000 5H12" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.eng_page_service3}</h4>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.eng_page_service4}</h4>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.eng_page_service5}</h4>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">{t.fin_page_benefits_title}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.eng_page_benefit1}</h4>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 1v22M17 5H9.5a2.5 2.5 0 000 5H12" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.eng_page_benefit2}</h4>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.eng_page_benefit3}</h4>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.eng_page_benefit4}</h4>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <div>
                  <h4 className="font-bold text-amber-900 mb-2">{t.fin_page_disclaimer_title}</h4>
                  <p className="text-amber-800 text-sm leading-relaxed">{t.eng_page_disclaimer}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">{t.eng_page_cta}</h2>
            <a href="#kontakt" onClick={(e) => { e.preventDefault(); setShowEnergia(false); }} className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-medium text-lg hover:shadow-lg transition">
              {t.fin_page_cta_btn}
            </a>
          </div>
        </section>

        <footer className="bg-slate-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <LogoWhiteSVG className="w-10 h-10" />
                <span className="text-xl font-bold">GREGOR T&C s.r.o.</span>
              </div>
              <p className="text-slate-400 mb-6">{getFooterText()}</p>
              <div className="border-t border-slate-800 pt-6">
                <p className="text-slate-500 text-sm">
                  &copy; {new Date().getFullYear()} GREGOR T&C s.r.o. {t.footer_rights}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  if (showObchod) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-zinc-100">
        <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <LogoSVG className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">GREGOR T&C s.r.o.</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={toggleLanguage} className="px-3 py-1 text-sm font-medium text-slate-600 hover:text-blue-600 transition border border-slate-300 rounded-lg">
                {isSk ? t.lang_en : t.lang_sk}
              </button>
              <button onClick={() => setShowObchod(false)} className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>{t.back}</span>
              </button>
            </div>
          </div>
        </header>

        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t.intl_page_title}</h1>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto">{t.intl_page_hero}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-slate-600 leading-relaxed text-lg">{t.intl_page_intro}</p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">{t.fin_page_services_title}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 16V8a2 2 0 00-1-1.73l-8-5a2 2 0 00-2 0l-8 5a2 2 0 00-1 1.73v8a2 2 0 001 1.73l8 5a2 2 0 002 0l8-5a2 2 0 001-1.73z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.intl_page_service1}</h4>
                <p className="text-slate-600 text-sm">{t.intl_page_service1_desc}</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M13 2L3 14h9l-1 8L21 10h-9l1-8z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.intl_page_service2}</h4>
                <p className="text-slate-600 text-sm">{t.intl_page_service2_desc}</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.intl_page_service3}</h4>
                <p className="text-slate-600 text-sm">{t.intl_page_service3_desc}</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.intl_page_service4}</h4>
                <p className="text-slate-600 text-sm">{t.intl_page_service4_desc}</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.intl_page_service5}</h4>
                <p className="text-slate-600 text-sm">{t.intl_page_service5_desc}</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M9 12l2 2 4-4" />
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.intl_page_service6}</h4>
                <p className="text-slate-600 text-sm">{t.intl_page_service6_desc}</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <path d="M14 2v4a2 2 0 002 2h4" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.intl_page_service7}</h4>
                <p className="text-slate-600 text-sm">{t.intl_page_service7_desc}</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-pink-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M13 2L3 14h9l-1 8L21 10h-9l1-8z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.intl_page_service8}</h4>
                <p className="text-slate-600 text-sm">{t.intl_page_service8_desc}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">{t.fin_page_benefits_title}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.intl_page_benefit1}</h4>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.intl_page_benefit2}</h4>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M13 2L3 14h9l-1 8L21 10h-9l1-8z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.intl_page_benefit3}</h4>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.intl_page_benefit4}</h4>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t.intl_page_benefit5}</h4>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <div>
                  <h4 className="font-bold text-amber-900 mb-2">{t.fin_page_disclaimer_title}</h4>
                  <p className="text-amber-800 text-sm leading-relaxed">{t.intl_page_disclaimer}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">{t.intl_page_cta}</h2>
            <a href="#kontakt" onClick={(e) => { e.preventDefault(); setShowObchod(false); }} className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-medium text-lg hover:shadow-lg transition">
              {t.fin_page_cta_btn}
            </a>
          </div>
        </section>

        <footer className="bg-slate-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <LogoWhiteSVG className="w-10 h-10" />
                <span className="text-xl font-bold">GREGOR T&C s.r.o.</span>
              </div>
              <p className="text-slate-400 mb-6">{getFooterText()}</p>
              <div className="border-t border-slate-800 pt-6">
                <p className="text-slate-500 text-sm">
                  &copy; {new Date().getFullYear()} GREGOR T&C s.r.o. {t.footer_rights}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  if (showDodavky) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-zinc-100">
        <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <LogoSVG className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">GREGOR T&C s.r.o.</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={toggleLanguage} className="px-3 py-1 text-sm font-medium text-slate-600 hover:text-blue-600 transition border border-slate-300 rounded-lg">
                {isSk ? t.lang_en : t.lang_sk}
              </button>
              <button onClick={() => setShowDodavky(false)} className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>{t.back}</span>
              </button>
            </div>
          </div>
        </header>

        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t.sup_page_title}</h1>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto">{t.sup_page_hero}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-slate-600 leading-relaxed text-lg">{t.sup_page_intro}</p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">{t.sup_page_kbe_badge}</div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.sup_page_kbe_title}</h2>
                <p className="text-slate-600 leading-relaxed mb-4">{t.sup_page_kbe_desc}</p>
                <p className="text-slate-600 leading-relaxed">{t.sup_page_kbe_text}</p>
                <p className="text-slate-600 leading-relaxed mt-4">{t.sup_page_kbe_text2}</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{t.sup_page_kbe_offer_title}</h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                    <span className="text-slate-600">{t.sup_page_kbe_offer1}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                    <span className="text-slate-600">{t.sup_page_kbe_offer2}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                    <span className="text-slate-600">{t.sup_page_kbe_offer3}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                    <span className="text-slate-600">{t.sup_page_kbe_offer4}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{t.sup_page_kbe_offer_title}</h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></span>
                    <span className="text-slate-600">{t.sup_page_znshin_offer1}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></span>
                    <span className="text-slate-600">{t.sup_page_znshin_offer2}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></span>
                    <span className="text-slate-600">{t.sup_page_znshin_offer3}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></span>
                    <span className="text-slate-600">{t.sup_page_znshin_offer4}</span>
                  </li>
                </ul>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">{t.sup_page_znshin_badge}</div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.sup_page_znshin_title}</h2>
                <p className="text-slate-600 leading-relaxed mb-4">{t.sup_page_znshin_desc}</p>
                <p className="text-slate-600 leading-relaxed">{t.sup_page_znshin_text}</p>
                <p className="text-slate-600 leading-relaxed mt-4">{t.sup_page_znshin_text2}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">{t.sup_page_catl_badge}</div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.sup_page_catl_title}</h2>
                <p className="text-slate-600 leading-relaxed mb-4">{t.sup_page_catl_desc}</p>
                <p className="text-slate-600 leading-relaxed">{t.sup_page_catl_text}</p>
                <p className="text-slate-600 leading-relaxed mt-4">{t.sup_page_catl_text2}</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{t.sup_page_kbe_offer_title}</h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></span>
                    <span className="text-slate-600">{t.sup_page_catl_offer1}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></span>
                    <span className="text-slate-600">{t.sup_page_catl_offer2}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></span>
                    <span className="text-slate-600">{t.sup_page_catl_offer3}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></span>
                    <span className="text-slate-600">{t.sup_page_catl_offer4}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">{t.sup_page_advantages_title}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{t.sup_page_adv1}</h4>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{t.sup_page_adv2}</h4>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M13 2L3 14h9l-1 8L21 10h-9l1-8z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{t.sup_page_adv3}</h4>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{t.sup_page_adv4}</h4>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M13 2L3 14h9l-1 8L21 10h-9l1-8z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{t.sup_page_adv5}</h4>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{t.sup_page_adv6}</h4>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">{t.sup_page_cta}</h2>
            <a href="#kontakt" onClick={(e) => { e.preventDefault(); setShowDodavky(false); }} className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-medium text-lg hover:shadow-lg transition">
              {t.fin_page_cta_btn}
            </a>
          </div>
        </section>

        <footer className="bg-slate-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <LogoWhiteSVG className="w-10 h-10" />
                <span className="text-xl font-bold">GREGOR T&C s.r.o.</span>
              </div>
              <p className="text-slate-400 mb-6">{getFooterText()}</p>
              <div className="border-t border-slate-800 pt-6">
                <p className="text-slate-500 text-sm">
                  &copy; {new Date().getFullYear()} GREGOR T&C s.r.o. {t.footer_rights}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-zinc-100">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <LogoSVG className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">GREGOR T&C s.r.o.</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={toggleLanguage} className="px-3 py-1 text-sm font-medium text-slate-600 hover:text-blue-600 transition border border-slate-300 rounded-lg">
              {isSk ? t.lang_en : t.lang_sk}
            </button>
            <nav className="hidden md:flex space-x-8">
              <a href="#sluzby" className="text-slate-600 hover:text-blue-600 transition">{t.nav_sluzby}</a>
              <a href="#o-nas" className="text-slate-600 hover:text-blue-600 transition">{t.nav_onas}</a>
              <a href="#certifikaty" className="text-slate-600 hover:text-blue-600 transition">{t.nav_certifikaty}</a>
              <a href="#kontakt" className="text-slate-600 hover:text-blue-600 transition">{t.nav_kontakt}</a>
            </nav>
          </div>
        </div>
      </header>

      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">{t.hero_badge}</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                {t.hero_title} <span className="text-blue-600">{t.hero_title_highlight}</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">{t.hero_description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#kontakt" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition transform text-center">{t.hero_cta_contact}</a>
                <a href="#sluzby" className="px-8 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition text-center">{t.hero_cta_services}</a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative bg-white rounded-3xl shadow-xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-slate-50 rounded-2xl">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <rect x="4" y="2" width="16" height="20" rx="2" />
                        <path d="M8 6h8M8 10h8M8 14h4" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-slate-900">{t.card_financie}</h3>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-2xl">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-slate-900">{t.card_energetika}</h3>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-2xl">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <rect x="4" y="2" width="16" height="20" rx="2" />
                        <path d="M9 22V12h6v10M9 6h.01M15 6h.01" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-slate-900">{t.card_organizacia}</h3>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-2xl">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                        <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-slate-900">{t.card_dodavky}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="sluzby" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.services_title}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{t.services_subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <button onClick={() => { setShowFinancie(true); window.scrollTo(0, 0); }} className="group bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition text-left w-full cursor-pointer">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <path d="M8 6h8M8 10h8M8 14h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t.fin_title}</h3>
              <p className="text-slate-600 mb-4">{t.fin_desc}</p>
              <ul className="space-y-2 text-sm text-slate-500">
                {t.fin_items.map((item, i) => (
                  <li key={i} className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>{item}</li>
                ))}
              </ul>
            </button>

            <button onClick={() => { setShowEnergia(true); window.scrollTo(0, 0); }} className="group bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition text-left w-full cursor-pointer">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <svg className="w-8 h-8 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t.eng_title}</h3>
              <p className="text-slate-600 mb-4">{t.eng_desc}</p>
              <ul className="space-y-2 text-sm text-slate-500">
                {t.eng_items.map((item, i) => (
                  <li key={i} className="flex items-center"><span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></span>{item}</li>
                ))}
              </ul>
            </button>

            <button onClick={() => { setShowOrg(true); window.scrollTo(0, 0); }} className="group bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition text-left w-full cursor-pointer">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <svg className="w-8 h-8 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <path d="M9 22V12h6v10M9 6h.01M15 6h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t.org_title}</h3>
              <p className="text-slate-600 mb-4">{t.org_desc}</p>
              <ul className="space-y-2 text-sm text-slate-500">
                {t.org_items.map((item, i) => (
                  <li key={i} className="flex items-center"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2"></span>{item}</li>
                ))}
              </ul>
            </button>

            <button onClick={() => { setShowDodavky(true); window.scrollTo(0, 0); }} className="group bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition text-left w-full cursor-pointer">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <svg className="w-8 h-8 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                  <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t.sup_title}</h3>
              <p className="text-slate-600 mb-4">{t.sup_desc}</p>
              <ul className="space-y-2 text-sm text-slate-500">
                {t.sup_items.map((item, i) => (
                  <li key={i} className="flex items-center"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>{item}</li>
                ))}
              </ul>
            </button>

            <button onClick={() => { setShowObchod(true); window.scrollTo(0, 0); }} className="group bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition text-left w-full cursor-pointer">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <svg className="w-8 h-8 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t.intl_title}</h3>
              <p className="text-slate-600 mb-4">{t.intl_desc}</p>
              <ul className="space-y-2 text-sm text-slate-500">
                {t.intl_items.map((item, i) => (
                  <li key={i} className="flex items-center"><span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>{item}</li>
                ))}
              </ul>
            </button>

            <div className="group bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition text-white">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M22 11.08V12a8 8 0 01-16 0V5l-2 2 2 2" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{t.comb_title}</h3>
              <p className="text-blue-100 mb-4">{t.comb_desc}</p>
              <a href="#kontakt" className="inline-block text-sm font-medium bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition">{t.comb_cta}</a>
            </div>
          </div>
        </div>
      </section>

      <section id="o-nas" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.about_title}</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <p className="text-slate-600 leading-relaxed text-lg">{t.about_p1}</p>
            <p className="text-slate-600 leading-relaxed">{t.about_p2}</p>
            <p className="text-slate-600 leading-relaxed">{t.about_p3}</p>
            <p className="text-slate-600 leading-relaxed">{t.about_p4}</p>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">{t.why_title}</h3>
              <ul className="space-y-3">
                {[t.why_1, t.why_2, t.why_3, t.why_4, t.why_5].map((item, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <span className="text-blue-600 mt-1">✔</span>
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">{t.values_title}</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{t.values_prof_title}</h4>
                  <p className="text-slate-600 text-sm">{t.values_prof_desc}</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{t.values_reli_title}</h4>
                  <p className="text-slate-600 text-sm">{t.values_reli_desc}</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{t.values_eff_title}</h4>
                  <p className="text-slate-600 text-sm">{t.values_eff_desc}</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 00-3-3.87" />
                      <path d="M16 3.13a4 4 0 010 7.75" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{t.values_part_title}</h4>
                  <p className="text-slate-600 text-sm">{t.values_part_desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="certifikaty" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.cert_title}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{t.cert_subtitle}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
              <div className="p-8 md:p-12">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-500 mb-1">{t.cert_page_title}</h3>
                    <p className="text-xs text-slate-400">{t.cert_page_address}</p>
                    <p className="text-xs text-slate-400">{t.cert_page_phone}</p>
                    <p className="text-xs text-blue-500">{t.cert_page_email}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-slate-800">KBE</div>
                    <div className="text-sm text-slate-500">{t.cert_page_berlin}</div>
                  </div>
                </div>

                <div className="border-t-2 border-red-400 mb-8"></div>

                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">{t.cert_page_cert_title}</h2>

                <div className="text-center space-y-6">
                  <p className="text-slate-600">{t.cert_page_company_text}</p>

                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Gregor T&C s.r.o.</h3>
                    <p className="text-slate-500">Michalská 9, 811 03 Bratislava, Slovakia</p>
                  </div>

                  <p className="text-slate-600">{t.cert_page_distributor_text}</p>

                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900">KBE Elektrotechnik GmbH</h3>
                    <p className="text-slate-500">{t.cert_page_in_slovakia}</p>
                  </div>

                  <p className="text-slate-600">{t.cert_page_valid}</p>

                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900">{t.cert_page_year}</h3>
                  </div>

                  <p className="text-slate-600">
                    {t.cert_page_product}<br />
                    <span className="font-medium">{t.cert_page_product_detail}</span>
                  </p>
                </div>

                <div className="mt-12 flex items-end justify-between">
                  <div>
                    <p className="text-slate-600 mb-4">{t.cert_page_date}</p>
                    <p className="text-slate-600 font-medium">{t.cert_page_sales}</p>
                    <p className="text-slate-500">{t.cert_page_sales_title}</p>
                  </div>
                  <div className="transform -rotate-12">
                    <div className="border-2 border-blue-500 rounded-lg p-3 text-blue-500 font-bold text-sm">
                      <div>{t.cert_page_stamp1}</div>
                      <div>{t.cert_page_stamp2}</div>
                      <div>{t.cert_page_stamp3}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <div className="bg-red-500 text-white px-4 py-2 rounded text-sm font-medium">{t.cert_page_tagline}</div>
                  <p className="text-slate-500 text-sm">{t.cert_page_page}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="kontakt" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.contact_title}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{t.contact_subtitle}</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 shadow-xl">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <rect x="6" y="2" width="12" height="20" rx="2" />
                      <path d="M12 18h.01" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">{t.contact_phone}</div>
                    <a href="tel:+421902512338" className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition">
                      +421 902 512 338
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 7l-10 6L2 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">{t.contact_email}</div>
                    <a href="mailto:gregortc2017@gmail.com" className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition">
                      gregortc2017@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <circle cx="12" cy="10" r="3" />
                      <path d="M12 2a8 8 0 00-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 00-8-8z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">{t.contact_location}</div>
                    <div className="text-lg font-semibold text-slate-900">{t.contact_location_value}</div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        <path d="M9 22V12h6v10" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">{t.contact_address}</div>
                    </div>
                  </div>
                  <div className="ml-16 space-y-3">
                    <div>
                      <div className="text-sm font-medium text-slate-700">{t.contact_correspondence}</div>
                      <a href="https://www.google.com/maps/search/Michalská+9+811+03+Bratislava" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 transition underline">{t.contact_correspondence_value}</a>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-700">{t.contact_business}</div>
                      <a href="https://www.google.com/maps/search/Za+kasárnou+1+831+02+Bratislava" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 transition underline">{t.contact_business_value}</a>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">{t.contact_map}</div>
                      <div className="text-base font-semibold text-slate-900">{t.contact_map_title}</div>
                    </div>
                  </div>
                  <div className="ml-16 rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2663.5!2d17.12!3d48.16!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c89b5c0b5c0b5%3A0x0!2sZa+kasárnou+1%2C+831+02+Bratislava!5e0!3m2!1ssk!2ssk!4v1700000000000!5m2!1ssk!2ssk"
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Mapa - Za kasárnou 1, Bratislava"
                      className="rounded-xl"
                    />
                  </div>
                  <div className="mt-3 flex justify-center">
                    <a href="https://share.google/HCpvh5pKL1nc5Hc5L" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 transition font-medium">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      <span>{t.contact_map_link}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen ? (
          <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 overflow-hidden border border-slate-200 mb-4">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Gregor T&C s.r.o.</h3>
                  <p className="text-xs text-blue-200">{isSk ? 'Online' : 'Online'}</p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-white/80 hover:text-white transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Content */}
            <div className="h-96 overflow-y-auto p-4 bg-slate-50">
              {!hasSentMessage ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-600 mb-1">{isSk ? 'Napíšte nám správu' : 'Send us a message'}</p>
                  <p className="text-xs text-slate-400">{isSk ? 'Odpovieme čo najskôr' : 'We will respond as soon as possible'}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="max-w-[80%] px-4 py-2 bg-blue-600 text-white rounded-2xl rounded-br-none text-sm">
                      {isSk ? 'Mám otázku' : 'I have a question'}
                    </div>
                  </div>
                  
                  {/* Auto-reply */}
                  <div className="flex justify-start">
                    <div className="max-w-[90%] px-4 py-2 bg-white text-slate-700 shadow-sm rounded-2xl rounded-bl-none text-sm">
                      Ďakujem, správu som prijal ✅ Teraz ju doručte priamo nám jedným klikom:
                    </div>
                  </div>

                  {/* Yellow box with buttons */}
                  <div className="bg-yellow-400 rounded-xl p-4 text-center">
                    <p className="text-xs font-bold text-slate-800 mb-3 uppercase">
                      Správa dorazí priamo Maximovi – odpoveď zvyčajne v ten istý pracovný deň.
                    </p>
                    <div className="flex gap-2">
                      <a
                        href={`mailto:gregortc2017@gmail.com?subject=${emailSubject}&body=${emailBody}`}
                        className="flex-1 bg-black text-white py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center space-x-2 hover:bg-slate-800 transition"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                        <span>{isSk ? 'ODOSLA E-MAILOM' : 'SEND EMAIL'}</span>
                      </a>
                      <a
                        href={`https://wa.me/421902512338?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center space-x-2 hover:bg-green-600 transition"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        <span>{isSk ? 'ODOSLAŤ NA WHATSAPP' : 'SEND WHATSAPP'}</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            {!hasSentMessage && (
              <div className="p-4 bg-white border-t border-slate-100">
                <div className="flex items-center space-x-2">
                  <input
                    ref={chatInputRef}
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={isSk ? 'Napíšte správu...' : 'Type a message...'}
                    className="flex-1 px-4 py-2 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={!chatMessage.trim()}
                    className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setChatOpen(true)}
            className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition transform flex items-center justify-center"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          </button>
        )}
      </div>

      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <LogoWhiteSVG className="w-10 h-10" />
              <span className="text-xl font-bold">GREGOR T&C s.r.o.</span>
            </div>
            <p className="text-slate-400 mb-6">{getFooterText()}</p>
            <p className="text-slate-500 text-sm">{t.footer_work}</p>
            <div className="border-t border-slate-800 pt-6">
              <p className="text-slate-500 text-sm">
                &copy; {new Date().getFullYear()} GREGOR T&C s.r.o. {t.footer_rights}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

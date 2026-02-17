import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, ChevronUp, ChevronDown } from 'lucide-react';

interface FloatingControlsProps {
  onOpenCookieModal: () => void;
}

export function FloatingControls({ onOpenCookieModal }: FloatingControlsProps) {
  const { t, i18n } = useTranslation();
  const [showScrollNav, setShowScrollNav] = useState(false);
  const [showUpButton, setShowUpButton] = useState(false);
  const [showDownButton, setShowDownButton] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      setShowScrollNav(scrolled > 100);
      setShowUpButton(scrolled > 200);
      setShowDownButton(scrolled < totalHeight - 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const contactLabelByLang: Record<string, string> = {
    es: 'CONTACTAR',
    en: 'CONTACT US',
    de: 'KONTAKT',
  };
  const contactLabel = contactLabelByLang[i18n.language] ?? contactLabelByLang.es;

  return (
    <>
      {/* Left Side: Cookie Control */}
      <div className="floating-controls-left">
        <button 
          className="btn-cookie-trigger pointer-events-auto"
          onClick={onOpenCookieModal}
          title={t('cookie.settings')}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" fill="var(--pe-black)"/>
            <circle cx="12" cy="17" r="1.5" fill="var(--pe-black)"/>
            <circle cx="12" cy="12" r="1.5" fill="var(--pe-black)"/>
            <circle cx="12" cy="7" r="1.5" fill="var(--pe-black)"/>
          </svg>
        </button>
      </div>

      {/* Right Side: Scroll & Contact Stack */}
      <div className="floating-controls-right">
        {/* Scroll Navigation */}
        <div className={`scroll-navigation ${showScrollNav ? 'visible' : ''}`}>
          <button 
            className={`btn-scroll ${!showUpButton ? 'hidden' : ''}`}
            onClick={scrollToTop}
            title={t('scroll.up')}
          >
            <ChevronUp className="w-4 h-4" strokeWidth={2.5} />
          </button>
          <button 
            className={`btn-scroll ${!showDownButton ? 'hidden' : ''}`}
            onClick={scrollToBottom}
            title={t('scroll.down')}
          >
            <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
        
        {/* Contact Button */}
        <button 
          className="btn-anclora-premium btn-contact-floating pointer-events-auto"
          onClick={scrollToContact}
        >
          <MessageCircle className="w-[18px] h-[18px]" strokeWidth={2} />
          <span>{contactLabel}</span>
        </button>
      </div>
    </>
  );
}

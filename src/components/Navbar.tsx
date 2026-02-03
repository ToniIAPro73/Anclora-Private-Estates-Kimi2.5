import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu } from 'lucide-react';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const currentLang = i18n.language;

  return (
    <>
      <header 
        className={`site-header fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          isScrolled 
            ? 'py-2.5 bg-[rgba(5,7,10,0.98)] border-b border-[#D4AF37]' 
            : 'py-5 bg-[rgba(5,7,10,0.15)] border-b border-[rgba(255,255,255,0.05)]'
        }`}
        style={{ 
          backdropFilter: 'blur(12px)',
          height: isScrolled ? '70px' : '90px'
        }}
      >
        <div className="w-full h-full px-[5%] flex items-center">
          <div className="w-full flex items-center justify-between">
            {/* Left Section - Menu Toggle + Valuation Button */}
            <div className="flex items-center gap-6 flex-shrink-0">
              {/* Menu Toggle */}
              <div 
                className="flex items-center gap-2.5 cursor-pointer text-[#F5F5F0] hover:text-[#D4AF37] transition-all duration-500"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <div className="relative w-6 h-0.5 bg-current">
                  <div className="absolute w-full h-0.5 bg-current -top-2 left-0" />
                  <div className="absolute w-full h-0.5 bg-current -bottom-2 left-0" />
                </div>
                <span className="text-xs font-bold tracking-[2px] uppercase">MENU</span>
              </div>

              {/* Valuation Button */}
              <button 
                onClick={() => scrollToSection('#valuation')}
                className="btn-valuation hidden md:inline-flex"
              >
                {t('nav.valuation')}
              </button>
            </div>

            {/* Center - Logo */}
            <div className="flex-1 flex justify-center">
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <img 
                  src="/logo-anclora-private-estate&exp.png" 
                  alt="Anclora Private Estates" 
                  className={`transition-all duration-500 object-contain ${
                    isScrolled ? 'h-[50px]' : 'h-[65px]'
                  }`}
                  style={{ filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.5))' }}
                />
              </a>
            </div>

            {/* Right Section - Nav Links + Language */}
            <div className="flex items-center gap-8 flex-shrink-0">
              {/* Desktop Navigation */}
              <nav className="hidden lg:block">
                <ul className="flex gap-6 list-none">
                  <li>
                    <button 
                      onClick={() => scrollToSection('#properties')}
                      className="text-[0.7rem] font-semibold uppercase tracking-[1.5px] text-[#F5F5F0]/80 hover:text-[#D4AF37] transition-all duration-500"
                    >
                      {t('nav.properties')}
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('#about')}
                      className="text-[0.7rem] font-semibold uppercase tracking-[1.5px] text-[#F5F5F0]/80 hover:text-[#D4AF37] transition-all duration-500"
                    >
                      {t('nav.about')}
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('#contact')}
                      className="text-[0.7rem] font-semibold uppercase tracking-[1.5px] text-[#F5F5F0]/80 hover:text-[#D4AF37] transition-all duration-500"
                    >
                      {t('nav.contact')}
                    </button>
                  </li>
                </ul>
              </nav>

              {/* Language Switcher */}
              <div className="lang-switcher">
                <button 
                  className={`lang-btn ${currentLang === 'es' ? 'active' : ''}`}
                  onClick={() => changeLanguage('es')}
                >
                  ES
                </button>
                <button 
                  className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`}
                  onClick={() => changeLanguage('en')}
                >
                  EN
                </button>
                <button 
                  className={`lang-btn ${currentLang === 'de' ? 'active' : ''}`}
                  onClick={() => changeLanguage('de')}
                >
                  DE
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[999] bg-[rgba(5,7,10,0.98)] backdrop-blur-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            <button 
              onClick={() => scrollToSection('#properties')}
              className="text-2xl font-semibold text-[#F5F5F0] hover:text-[#D4AF37] transition-colors"
            >
              {t('nav.properties')}
            </button>
            <button 
              onClick={() => scrollToSection('#about')}
              className="text-2xl font-semibold text-[#F5F5F0] hover:text-[#D4AF37] transition-colors"
            >
              {t('nav.about')}
            </button>
            <button 
              onClick={() => scrollToSection('#valuation')}
              className="text-2xl font-semibold text-[#F5F5F0] hover:text-[#D4AF37] transition-colors"
            >
              {t('nav.valuation')}
            </button>
            <button 
              onClick={() => scrollToSection('#contact')}
              className="text-2xl font-semibold text-[#F5F5F0] hover:text-[#D4AF37] transition-colors"
            >
              {t('nav.contact')}
            </button>
            <button 
              onClick={() => scrollToSection('#contact')}
              className="btn-anclora-premium mt-8"
            >
              {t('nav.bookCall')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

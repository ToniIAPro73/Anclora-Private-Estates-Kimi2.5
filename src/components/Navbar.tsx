import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const nexusLoginUrl = import.meta.env.VITE_ANCLORA_NEXUS_LOGIN_URL ?? 'https://nexus.anclora.group/login';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen || isPartnerModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, isPartnerModalOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setIsPartnerModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const changeLanguage = (lang: string) => {
    if (lang === i18n.language) return;

    const footer = document.querySelector('#footer') as HTMLElement | null;
    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      const footerVisible = footerRect.top < window.innerHeight && footerRect.bottom > 0;
      if (footerVisible) {
        const footerTop = window.scrollY + footerRect.top;
        sessionStorage.setItem('anclora:lang-anchor', '#footer');
        sessionStorage.setItem('anclora:lang-offset', String(window.scrollY - footerTop));
        sessionStorage.removeItem('anclora:lang-pinned-progress');
        sessionStorage.setItem('anclora:lang-y', String(window.scrollY));
        sessionStorage.setItem('anclora:lang-switching', '1');
        document.documentElement.setAttribute('data-lang-switching', 'true');
        i18n.changeLanguage(lang);
        return;
      }
    }

    const activePinned = ScrollTrigger.getAll().find((trigger) => {
      if (!trigger.vars.pin) return false;
      const end = trigger.end ?? trigger.start;
      return window.scrollY >= trigger.start && window.scrollY <= end;
    });

    let activeSection: HTMLElement | null = null;
    const pinnedTriggerEl = activePinned?.vars.trigger as HTMLElement | undefined;
    if (pinnedTriggerEl instanceof HTMLElement) {
      activeSection = pinnedTriggerEl;
    } else {
      const centerElement = document.elementFromPoint(
        window.innerWidth * 0.5,
        window.innerHeight * 0.5
      ) as HTMLElement | null;
      activeSection = centerElement?.closest('section, footer') as HTMLElement | null;
    }

    if (activeSection?.id) {
      sessionStorage.setItem('anclora:lang-anchor', `#${activeSection.id}`);
      const sectionTop = window.scrollY + activeSection.getBoundingClientRect().top;
      sessionStorage.setItem('anclora:lang-offset', String(window.scrollY - sectionTop));
    } else {
      sessionStorage.removeItem('anclora:lang-anchor');
      sessionStorage.removeItem('anclora:lang-offset');
    }

    if (activePinned) {
      const start = activePinned.start;
      const end = activePinned.end ?? activePinned.start;
      const span = Math.max(1, end - start);
      const progress = Math.min(1, Math.max(0, (window.scrollY - start) / span));
      sessionStorage.setItem('anclora:lang-pinned-progress', String(progress));
    } else {
      sessionStorage.removeItem('anclora:lang-pinned-progress');
    }

    sessionStorage.setItem('anclora:lang-y', String(window.scrollY));
    sessionStorage.setItem('anclora:lang-switching', '1');
    document.documentElement.setAttribute('data-lang-switching', 'true');

    i18n.changeLanguage(lang);
  };

  const scrollToSection = (href: string) => {
    const performScroll = () => {
      const element = document.querySelector(href);
      if (!element) return;

      const elementNode = element as HTMLElement;
      const pinSpacer = elementNode.closest('.pin-spacer') as HTMLElement | null;
      const anchorTop = pinSpacer
        ? pinSpacer.offsetTop
        : window.scrollY + elementNode.getBoundingClientRect().top;

      const headerHeight = isScrolled ? 70 : 90;
      const viewportAvailable = window.innerHeight - headerHeight;
      const targetTop = anchorTop;

      let top = targetTop - headerHeight - 10;

      if (href === '#contact') {
        // Keep the exact same navigation behavior as the floating CONTACTAR button.
        elementNode.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      if (href === '#properties') {
        // Pinned section: use the actual ScrollTrigger range and jump into the stable zone.
        const st = ScrollTrigger.getAll().find((trigger) => {
          const triggerEl = trigger.vars.trigger as Element | undefined;
          return triggerEl === elementNode;
        });

        if (st) {
          const span = Math.max(0, (st.end ?? st.start) - st.start);
          top = st.start + span * 0.42;
        } else {
          // Fallback if trigger is not available yet.
          top = targetTop + window.innerHeight * 0.32;
        }
      } else if (href === '#valuation') {
        // Center the valuation form card in visible viewport so bottom is never clipped.
        const formCard = document.querySelector('#valuation-form-card') as HTMLElement | null;
        if (formCard) {
          const formTop = window.scrollY + formCard.getBoundingClientRect().top;
          const centeredOffset = Math.max(0, (viewportAvailable - formCard.offsetHeight) / 2);
          top = formTop - headerHeight - centeredOffset;
        } else {
          top = targetTop - headerHeight - 10;
        }
      } else if (href === '#insights') {
        // Center the 3-card block in the visible viewport.
        const cardsBlock = elementNode.querySelector('[data-insights-cards]') as HTMLElement | null;
        if (cardsBlock) {
          const cardsTop = window.scrollY + cardsBlock.getBoundingClientRect().top;
          const centeredOffset = Math.max(0, (viewportAvailable - cardsBlock.offsetHeight) / 2);
          // Keep a bit more top breathing room so title + cards remain fully visible.
          top = cardsTop - headerHeight - centeredOffset + 24;
        } else {
          top = targetTop - headerHeight - 10;
        }
      } else if (href === '#about') {
        // Land on the first meaningful content block instead of section padding.
        const firstCard = elementNode.querySelector('.card-premium') as HTMLElement | null;
        if (firstCard) {
          const cardTop = window.scrollY + firstCard.getBoundingClientRect().top;
          top = cardTop - headerHeight - 18;
        } else {
          top = targetTop - headerHeight - 10;
        }
      }

      window.scrollTo({
        top: Math.max(0, top),
        behavior: 'auto',
      });
    };

    if (isMenuOpen) {
      setIsMenuOpen(false);
      requestAnimationFrame(() => requestAnimationFrame(performScroll));
      return;
    }

    performScroll();
  };

  const openAgentPortal = () => {
    setIsMenuOpen(false);
    window.location.href = nexusLoginUrl;
  };

  const openPartnerModal = () => {
    setIsMenuOpen(false);
    setIsPartnerModalOpen(true);
  };

  const currentLang = i18n.language;

  return (
    <>
      <header 
        className={`site-header fixed top-0 left-0 w-full z-[1000] transition-[all] [transition-duration:800ms] ${
          isScrolled 
            ? 'py-[10px] bg-[rgba(7,37,47,0.98)] border-b border-[var(--anclora-gold)]' 
            : 'py-[20px] bg-[rgba(11,49,63,0.15)] border-b border-[rgba(255,255,255,0.05)]'
        }`}
        style={{ 
          backdropFilter: 'blur(12px)',
          transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)',
          height: isScrolled ? '70px' : '90px'
        }}
      >
        <div className="w-full h-full px-[5%] flex items-center">
          <div className="w-full flex items-center justify-between">
            {/* Left Section - Menu Toggle + Valuation Button */}
            <div className="flex items-center gap-6 flex-shrink-0">
              {/* Menu Toggle */}
              <div 
                className="flex items-center gap-2.5 cursor-pointer text-[var(--pe-cream)] hover:text-[var(--anclora-gold)] transition-[all] [transition-duration:800ms]"
                style={{ transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)' }}
                onClick={() => setIsMenuOpen((prev) => !prev)}
              >
                <div className="relative w-6 h-[2px] bg-current">
                  <div className="absolute w-full h-[2px] bg-current -top-2 left-0" />
                  <div className="absolute w-full h-[2px] bg-current -bottom-2 left-0" />
                </div>
                <span className="text-[0.75rem] font-bold tracking-[2px] uppercase">MENU</span>
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
              <a 
                href="#" 
                className="logo-container-premium group"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'auto' }); }}
                style={{
                  padding: isScrolled ? '4px 12px' : '6px 14px'
                }}
              >
                <img 
                  src="/logo-anclora-private-estate&exp.png" 
                  alt="Anclora Private Estates" 
                  className={`transition-[all] [transition-duration:800ms] object-contain group-hover:scale-[1.05] group-hover:brightness-[1.2] ${
                    isScrolled ? 'h-[45px]' : 'h-[55px]'
                  }`}
                  style={{ 
                    filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.5))',
                    transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)'
                  }}
                />
              </a>
            </div>

            {/* Right Section - Nav Links + Language */}
            <div className="flex items-center gap-[30px] flex-shrink-0">
              {/* Desktop Navigation */}
              <nav className="hidden lg:block">
                <ul className="flex gap-6 list-none">
                  <li>
                    <button 
                      onClick={() => scrollToSection('#properties')}
                      className="nav-link-premium"
                    >
                      {t('nav.properties')}
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('#about')}
                      className="nav-link-premium"
                    >
                      {t('nav.about')}
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('#contact')}
                      className="nav-link-premium"
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

      {isMenuOpen && (
        <div className="premium-menu-overlay" onClick={() => setIsMenuOpen(false)}>
          <div className="premium-menu-shell" onClick={(e) => e.stopPropagation()}>
            <div className="premium-menu-header">
              <button className="premium-menu-close-trigger" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                <span className="premium-menu-close-icon" aria-hidden>
                  <i />
                  <i />
                </span>
                <span>{t('menuOverlay.close')}</span>
              </button>

              <div className="premium-menu-brand">
                <img src="/logo-anclora-private-estates-exp.png" alt="Anclora Private Estates" />
              </div>

              <div className="premium-menu-header-meta">
                <span>{currentLang.toUpperCase()}</span>
              </div>
            </div>

            <div className="premium-menu-grid">
              <div className="premium-menu-column premium-menu-column-links">
                <p className="premium-menu-eyebrow">{t('menuOverlay.explore')}</p>
                <button className="premium-menu-link" onClick={() => scrollToSection('#hero')}>{t('nav.home')}</button>
                <button className="premium-menu-link" onClick={() => scrollToSection('#properties')}>{t('nav.properties')}</button>
                <button className="premium-menu-link" onClick={() => scrollToSection('#invest')}>{t('nav.invest')}</button>
                <button className="premium-menu-link" onClick={() => scrollToSection('#valuation')}>{t('nav.valuation')}</button>
                <button className="premium-menu-link" onClick={() => scrollToSection('#insights')}>{t('nav.insights')}</button>
                <button className="premium-menu-link" onClick={() => scrollToSection('#about')}>{t('nav.about')}</button>
                <button className="premium-menu-link" onClick={() => scrollToSection('#contact')}>{t('nav.contact')}</button>
              </div>

              <div className="premium-menu-column premium-menu-column-private">
                <p className="premium-menu-eyebrow">{t('menuOverlay.privateArea')}</p>
                <p className="premium-menu-description">{t('menuOverlay.privateAreaDescription')}</p>

                <button className="premium-private-card" onClick={openAgentPortal}>
                  <span>{t('menuOverlay.agentPortalTitle')}</span>
                  <small>{t('menuOverlay.agentPortalDescription')}</small>
                </button>

                <button className="premium-private-card" onClick={openPartnerModal}>
                  <span>{t('menuOverlay.partnerPortalTitle')}</span>
                  <small>{t('menuOverlay.partnerPortalDescription')}</small>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isPartnerModalOpen && (
        <div className="premium-status-overlay" onClick={() => setIsPartnerModalOpen(false)}>
          <div className="premium-status-card" onClick={(e) => e.stopPropagation()}>
            <h3>{t('menuOverlay.partnerModalTitle')}</h3>
            <p>{t('menuOverlay.partnerModalText')}</p>
            <button className="btn-anclora-premium !min-w-[190px] !h-[50px] !text-[0.62rem]" onClick={() => setIsPartnerModalOpen(false)}>
              {t('menuOverlay.partnerModalCta')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

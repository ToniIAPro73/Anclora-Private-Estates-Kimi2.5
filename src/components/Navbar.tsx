import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ensureLanguageResources } from '../i18n';
import { buildMenuGroups } from './menuOverlayConfig';

export function Navbar() {
  const pendingScrollTargetKey = 'anclora:pending-scroll-target';
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [activeMenuGroup, setActiveMenuGroup] = useState<string | null>(null);
  const scrollToSectionRef = useRef<(href: string) => void>(() => {});
  const [isMobileViewport, setIsMobileViewport] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768;
  });
  const nexusLoginUrl =
    import.meta.env.VITE_ANCLORA_NEXUS_LOGIN_URL ??
    import.meta.env.VITE_NEXUS_LOGIN_URL ??
    'https://nexus.anclora.group/login';

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
        setActiveMenuGroup(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobileViewport(window.innerWidth <= 768);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const reconcilePendingNavigation = () => {
      const pendingHref = sessionStorage.getItem(pendingScrollTargetKey);
      if (!pendingHref) return;

      const target = document.querySelector(pendingHref) as HTMLElement | null;
      if (!target) {
        window.dispatchEvent(new Event('anclora:reveal-deferred-sections'));
        return;
      }

      sessionStorage.removeItem(pendingScrollTargetKey);
      scrollToSectionRef.current(pendingHref);
    };

    const intervalId = window.setInterval(reconcilePendingNavigation, 150);
    return () => window.clearInterval(intervalId);
  }, [pendingScrollTargetKey]);

  const getScrollTrigger = async () => {
    const module = await import('gsap/ScrollTrigger');
    return module.ScrollTrigger;
  };

  const changeLanguage = async (lang: string) => {
    const targetLanguage = await ensureLanguageResources(lang);
    if (targetLanguage === i18n.language) return;

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
        await i18n.changeLanguage(targetLanguage);
        window.localStorage.setItem('i18nextLng', targetLanguage);
        return;
      }
    }

    const ScrollTrigger = await getScrollTrigger();
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

    await i18n.changeLanguage(targetLanguage);
    window.localStorage.setItem('i18nextLng', targetLanguage);
  };

  const scrollToSection = (href: string) => {
    const performScroll = async () => {
      const jumpTo = (y: number) => {
        const targetY = Math.max(0, y);
        const root = document.documentElement;
        const body = document.body;
        const previousRootBehavior = root.style.scrollBehavior;
        const previousBodyBehavior = body.style.scrollBehavior;

        // Force instant jump even when global CSS sets `scroll-behavior: smooth`.
        root.style.scrollBehavior = 'auto';
        body.style.scrollBehavior = 'auto';

        window.scrollTo({ top: targetY, left: 0, behavior: 'auto' });
        root.scrollTop = targetY;
        body.scrollTop = targetY;

        requestAnimationFrame(() => {
          root.style.scrollBehavior = previousRootBehavior;
          body.style.scrollBehavior = previousBodyBehavior;
        });
      };

      const resolveElement = async () => {
        const maxWaitMs = 8000;
        const pollIntervalMs = 50;
        const startedAt = performance.now();
        let lastRevealRequestAt = -Infinity;

        while (performance.now() - startedAt < maxWaitMs) {
          const target = document.querySelector(href) as HTMLElement | null;
          if (target) return target;

          // Ask HomePage to mount deferred sections; keep retrying in case
          // the listener is not attached yet on a hard reload.
          const now = performance.now();
          if (now - lastRevealRequestAt >= 250) {
            window.dispatchEvent(new Event('anclora:reveal-deferred-sections'));
            lastRevealRequestAt = now;
          }

          await new Promise<void>((resolve) => {
            window.setTimeout(() => resolve(), pollIntervalMs);
          });
        }

        return null;
      };

      const element = await resolveElement();
      if (!element) {
        sessionStorage.setItem(pendingScrollTargetKey, href);
        return;
      }

      sessionStorage.removeItem(pendingScrollTargetKey);

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
        // Force an immediate jump to avoid animated traversal across pinned sections.
        jumpTo(targetTop - headerHeight - 10);
        return;
      }

      if (href === '#properties' || href === '#invest' || href === '#neighborhood') {
        // Pinned section: use the actual ScrollTrigger range and jump into the stable zone.
        const ScrollTrigger = await getScrollTrigger();
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
      } else if (href === '#philosophy') {
        // Push a bit deeper to avoid showing Hero strip at the top.
        top = targetTop - headerHeight + 120;
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

      jumpTo(top);
    };

    if (isMenuOpen) {
      setIsMenuOpen(false);
      requestAnimationFrame(() => requestAnimationFrame(() => { void performScroll(); }));
      return;
    }

    void performScroll();
  };

  scrollToSectionRef.current = scrollToSection;

  const openAgentPortal = () => {
    setIsMenuOpen(false);
    setActiveMenuGroup(null);
    window.location.href = nexusLoginUrl;
  };

  const openPartnerModal = () => {
    setIsMenuOpen(false);
    setActiveMenuGroup(null);
    setIsPartnerModalOpen(true);
  };

  useEffect(() => {
    if (!isMenuOpen) {
      setActiveMenuGroup(null);
    }
  }, [isMenuOpen]);

  const currentLang = i18n.language;
  const currentLangCode = currentLang.toLowerCase().startsWith('en')
    ? 'EN'
    : currentLang.toLowerCase().startsWith('de')
      ? 'DE'
      : 'ES';
  const menuGroups = buildMenuGroups(t, {
    toPhilosophy: () => scrollToSection('#philosophy'),
    toInvest: () => scrollToSection('#invest'),
    toNeighborhood: () => scrollToSection('#neighborhood'),
    toInsights: () => scrollToSection('#insights'),
    openAgentPortal,
    openPartnerModal,
  });

  const activeGroup = menuGroups.find((group) => group.id === activeMenuGroup) ?? null;
  const menuEntries: Array<
    | { type: 'link'; label: string; action: () => void }
    | { type: 'submenu'; id: string; label: string }
  > = [
    { type: 'link', label: t('nav.properties'), action: () => scrollToSection('#properties') },
    { type: 'link', label: t('menuOverlay.links.valuation'), action: () => scrollToSection('#valuation') },
    { type: 'submenu', id: 'invest', label: t('menuOverlay.groups.invest') },
    { type: 'submenu', id: 'private', label: t('menuOverlay.privateArea') },
    { type: 'link', label: t('nav.about'), action: () => scrollToSection('#about') },
    { type: 'link', label: t('menuOverlay.links.contact'), action: () => scrollToSection('#contact') },
  ];

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
            <div className="flex items-center gap-3 md:gap-6 flex-shrink-0">
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
                <span className="text-[0.7rem] md:text-[0.75rem] font-bold tracking-[2px] uppercase">MENU</span>
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
            <div className="flex-1 flex justify-center px-2">
              <a 
                href="#" 
                className="logo-container-premium group"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'auto' }); }}
                style={{
                  padding: isScrolled ? '4px 12px' : '6px 14px'
                }}
              >
                <img
                  src="/logos/logo-anclora-private-estates-exp.png"
                  alt="Anclora Private Estates"
                  loading="eager"
                  decoding="async"
                  className={`transition-[all] [transition-duration:800ms] object-contain group-hover:scale-[1.05] group-hover:brightness-[1.2] ${
                    isMobileViewport
                      ? isScrolled
                        ? 'h-[28px] sm:h-[32px]'
                        : 'h-[32px] sm:h-[36px]'
                      : isScrolled
                        ? 'h-[45px]'
                        : 'h-[55px]'
                  }`}
                  style={{
                    filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.5))',
                    transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)',
                  }}
                />
              </a>
            </div>

            {/* Right Section - Nav Links + Language */}
            <div className="hidden md:flex items-center gap-[30px] flex-shrink-0">
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

            {/* Mobile Language Switcher */}
            <div className="md:hidden flex-shrink-0">
              <div className="lang-switcher mobile-header-lang-switcher">
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
                <span>{t('menuOverlay.menuWord')}</span>
              </button>

              <div className="premium-menu-brand">
                <img
                  src="/logo-anclora-private-estates-texto.png"
                  alt={t('menuOverlay.brand')}
                  loading="eager"
                  decoding="async"
                  className="premium-menu-brand-logo"
                />
              </div>

              <div className="premium-menu-header-meta">
                <span className="premium-menu-current-lang" aria-label="Current language">
                  {currentLangCode}
                </span>
              </div>
            </div>

            <div className="premium-menu-content">
              {!activeGroup && (
                <>
                  <ul className="premium-menu-list" role="list">
                    {menuEntries.map((entry) => {
                      if (entry.type === 'link') {
                        return (
                          <li key={entry.label}>
                            <button className="premium-menu-row" onClick={entry.action}>
                              <span>{entry.label}</span>
                            </button>
                          </li>
                        );
                      }

                      return (
                        <li key={entry.id}>
                          <button
                            className="premium-menu-row"
                            onClick={() => setActiveMenuGroup(entry.id)}
                            aria-label={entry.label}
                          >
                            <span>{entry.label}</span>
                            <span className="premium-menu-row-arrow" aria-hidden>&rsaquo;</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}

              {activeGroup && (
                <>
                  <div className="premium-menu-subheader">
                    <button
                      className="premium-menu-back"
                      onClick={() => setActiveMenuGroup(null)}
                      aria-label={t('menuOverlay.back')}
                    >
                      <span aria-hidden>&larr;</span>
                      <span>{t('menuOverlay.back')}</span>
                    </button>
                    <span className="premium-menu-subtitle">{activeGroup.label}</span>
                  </div>

                  <ul className="premium-menu-list premium-menu-sublist" role="list">
                    {activeGroup.items.map((item) => (
                      <li key={item.label}>
                        <button className="premium-menu-row premium-menu-row-detail" onClick={item.action}>
                          <span className="premium-menu-row-main">{item.label}</span>
                          {item.description && <small className="premium-menu-row-description">{item.description}</small>}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
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

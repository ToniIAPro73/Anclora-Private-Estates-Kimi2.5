import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

// i18n initialization
import './i18n';

// Context
import { ThemeProvider } from './context/ThemeContext';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { SocialSidebar } from './components/SocialSidebar';
import { FloatingControls } from './components/FloatingControls';

// Sections
import { HeroSection } from './sections/HeroSection';
import { PhilosophySection } from './sections/PhilosophySection';
import { PropertiesSection } from './sections/PropertiesSection';
import { InvestmentSection } from './sections/InvestmentSection';
import { NeighborhoodSection } from './sections/NeighborhoodSection';
import { ValuationSection } from './sections/ValuationSection';
import { InsightsSection } from './sections/InsightsSection';
import { AboutSection } from './sections/AboutSection';
import { ContactSection } from './sections/ContactSection';

// Legal Pages
import { 
  PrivacyPage, 
  CookiesPage, 
  TermsPage, 
  DisclaimerPage, 
  EthicsPage 
} from './pages/legal';

gsap.registerPlugin(ScrollTrigger);

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Main Home Page
function HomePage() {
  const { i18n } = useTranslation();
  const [cookieModalOpen, setCookieModalOpen] = useState(false);
  const globalSnapRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const getActiveSection = () => {
      const footer = document.querySelector('#footer') as HTMLElement | null;
      if (footer) {
        const rect = footer.getBoundingClientRect();
        const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        if (visible > window.innerHeight * 0.3) {
          return footer;
        }
      }

      const sections = Array.from(document.querySelectorAll('main section')) as HTMLElement[];
      if (sections.length === 0) return null;

      const viewportCenter = window.innerHeight * 0.5;
      let best: HTMLElement | null = null;
      let bestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const center = rect.top + rect.height * 0.5;
        const distance = Math.abs(center - viewportCenter);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = section;
        }
      });

      return best;
    };

    const restoreSection = (
      section: HTMLElement | null,
      fallbackY: number,
      exactOffset: number | null,
      pinnedProgress: number | null
    ) => {
      if (!section) {
        window.scrollTo({ top: fallbackY, behavior: 'auto' });
        return;
      }

      if (section.id === 'contact' || section.id === 'footer') {
        // Keep the exact relative offset inside Contact/Footer across language changes.
        if (exactOffset !== null) {
          const sectionTop = window.scrollY + section.getBoundingClientRect().top;
          window.scrollTo({ top: Math.max(0, sectionTop + exactOffset), behavior: 'auto' });
        } else {
          window.scrollTo({ top: Math.max(0, fallbackY), behavior: 'auto' });
        }
        return;
      }

      const headerHeight = window.scrollY > 50 ? 70 : 90;
      const sectionTop = window.scrollY + section.getBoundingClientRect().top;
      let top = sectionTop - headerHeight - 10;

      if (section.classList.contains('section-pinned')) {
        const st = ScrollTrigger.getAll().find((trigger) => {
          const triggerEl = trigger.vars.trigger as Element | undefined;
          return triggerEl === section;
        });

        if (st) {
          const span = Math.max(0, (st.end ?? st.start) - st.start);
          if (pinnedProgress !== null) {
            top = st.start + span * pinnedProgress;
          } else {
            top = st.start + span * 0.42;
          }
        }
      } else if (exactOffset !== null) {
        top = sectionTop + exactOffset;
      } else if (section.id === 'valuation') {
        const formCard = document.querySelector('#valuation-form-card') as HTMLElement | null;
        if (formCard) {
          const viewportAvailable = window.innerHeight - headerHeight;
          const formTop = window.scrollY + formCard.getBoundingClientRect().top;
          const centeredOffset = Math.max(0, (viewportAvailable - formCard.offsetHeight) / 2);
          top = formTop - headerHeight - centeredOffset;
        }
      } else if (section.id === 'insights') {
        const cardsBlock = section.querySelector('[data-insights-cards]') as HTMLElement | null;
        if (cardsBlock) {
          const viewportAvailable = window.innerHeight - headerHeight;
          const cardsTop = window.scrollY + cardsBlock.getBoundingClientRect().top;
          const centeredOffset = Math.max(0, (viewportAvailable - cardsBlock.offsetHeight) / 2);
          // Match menu navigation position for insights.
          top = cardsTop - headerHeight - centeredOffset + 24;
        }
      } else if (section.id === 'about') {
        const firstCard = section.querySelector('.card-premium') as HTMLElement | null;
        if (firstCard) {
          const cardTop = window.scrollY + firstCard.getBoundingClientRect().top;
          top = cardTop - headerHeight - 18;
        }
      }

      window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
    };

    // Initialize global snap for pinned sections
    const setupGlobalSnap = () => {
      globalSnapRef.current?.kill();
      globalSnapRef.current = null;

      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));
      let lastValue = 0;

      globalSnapRef.current = ScrollTrigger.create({
        snap: {
          snapTo: (value) => {
            const activeRange = pinnedRanges.find(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!activeRange) return value;

            // Avoid jitter: only snap near the section center and never against scroll direction.
            const direction = value >= lastValue ? 1 : -1;
            lastValue = value;

            const distanceToCenter = activeRange.center - value;
            if (Math.abs(distanceToCenter) > 0.06) return value;

            if (direction > 0) {
              return distanceToCenter > 0 ? activeRange.center : value;
            }
            return distanceToCenter < 0 ? activeRange.center : value;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    };

    // Delay to ensure all ScrollTriggers are created
    const currentY = window.scrollY;
    const activeSection = getActiveSection();
    const storedAnchor = sessionStorage.getItem('anclora:lang-anchor');
    const storedYRaw = sessionStorage.getItem('anclora:lang-y');
    const storedOffsetRaw = sessionStorage.getItem('anclora:lang-offset');
    const storedPinnedProgressRaw = sessionStorage.getItem('anclora:lang-pinned-progress');
    const wasLangSwitching = sessionStorage.getItem('anclora:lang-switching') === '1';
    const storedY = storedYRaw ? Number(storedYRaw) : currentY;
    const storedOffset = storedOffsetRaw ? Number(storedOffsetRaw) : null;
    const storedPinnedProgress = storedPinnedProgressRaw ? Number(storedPinnedProgressRaw) : null;
    const exactOffset = storedOffset !== null && Number.isFinite(storedOffset) ? storedOffset : null;
    const pinnedProgress =
      storedPinnedProgress !== null && Number.isFinite(storedPinnedProgress)
        ? Math.min(1, Math.max(0, storedPinnedProgress))
        : null;
    const fallbackY = Number.isFinite(storedY) ? storedY : currentY;
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      // Keep user's current section stable after i18n re-render.
      const anchorSection = storedAnchor
        ? (document.querySelector(storedAnchor) as HTMLElement | null)
        : null;
      restoreSection(anchorSection ?? activeSection, fallbackY, exactOffset, pinnedProgress);
      // Re-enable global snap after restoring position to avoid transition flicker.
      requestAnimationFrame(() => {
        setupGlobalSnap();
        requestAnimationFrame(() => {
          if (wasLangSwitching) {
            document.documentElement.removeAttribute('data-lang-switching');
            sessionStorage.removeItem('anclora:lang-switching');
          }
        });
      });
      sessionStorage.removeItem('anclora:lang-anchor');
      sessionStorage.removeItem('anclora:lang-y');
      sessionStorage.removeItem('anclora:lang-offset');
      sessionStorage.removeItem('anclora:lang-pinned-progress');
    }, 100);

    const failsafe = window.setTimeout(() => {
      document.documentElement.removeAttribute('data-lang-switching');
      sessionStorage.removeItem('anclora:lang-switching');
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(failsafe);
      globalSnapRef.current?.kill();
      globalSnapRef.current = null;
    };
  }, [i18n.language]);

  return (
    <>
      {/* Social Sidebar - Only on home page */}
      <SocialSidebar />
      
      {/* Floating Controls - Only on home page */}
      <FloatingControls onOpenCookieModal={() => setCookieModalOpen(true)} />
      
      <main className="relative">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Philosophy Section */}
        <PhilosophySection />
        
        {/* Pinned Sections - z-index stacking */}
        <PropertiesSection />
        <InvestmentSection />
        <NeighborhoodSection />
        
        {/* Flowing Sections */}
        <ValuationSection />
        <InsightsSection />
        <AboutSection />
        <ContactSection />
        
        {/* Footer */}
        <Footer />
      </main>
      
      {/* Cookie Banner/Modal */}
      <CookieBanner isOpen={cookieModalOpen} onClose={() => setCookieModalOpen(false)} />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        
        {/* Grain Overlay */}
        <div className="grain-overlay" />
        
        {/* Navigation - Only show on home page */}
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="*" element={null} />
        </Routes>
        
        {/* Main Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/legal/privacidad" element={<PrivacyPage />} />
          <Route path="/legal/cookies" element={<CookiesPage />} />
          <Route path="/legal/terminos" element={<TermsPage />} />
          <Route path="/legal/disclaimer" element={<DisclaimerPage />} />
          <Route path="/legal/codigo-etico" element={<EthicsPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

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
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      setupGlobalSnap();
      // Keep the user's current section/position stable after i18n re-render.
      window.scrollTo({ top: currentY, behavior: 'auto' });
    }, 100);

    return () => {
      clearTimeout(timer);
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

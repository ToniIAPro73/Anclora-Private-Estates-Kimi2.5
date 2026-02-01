import { useEffect } from 'react';
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

// Sections
import { HeroSection } from './sections/HeroSection';
import { PropertiesSection } from './sections/PropertiesSection';
import { InvestmentSection } from './sections/InvestmentSection';
import { NeighborhoodSection } from './sections/NeighborhoodSection';
import { ValuationSection } from './sections/ValuationSection';
import { InsightsSection } from './sections/InsightsSection';
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

  useEffect(() => {
    // Initialize global snap for pinned sections
    const setupGlobalSnap = () => {
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

      ScrollTrigger.create({
        snap: {
          snapTo: (value) => {
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    };

    // Delay to ensure all ScrollTriggers are created
    const timer = setTimeout(setupGlobalSnap, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [i18n.language]); // Re-run when language changes

  return (
    <main className="relative">
      {/* Pinned Sections - z-index stacking */}
      <HeroSection />
      <PropertiesSection />
      <InvestmentSection />
      <NeighborhoodSection />
      
      {/* Flowing Sections */}
      <ValuationSection />
      <InsightsSection />
      <ContactSection />
      
      {/* Footer */}
      <Footer />
    </main>
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
        
        {/* Cookie Banner */}
        <CookieBanner />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

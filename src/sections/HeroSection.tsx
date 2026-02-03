import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { Search, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const [propertyType, setPropertyType] = useState('any');
  const [location, setLocation] = useState('all');
  const [priceRange, setPriceRange] = useState('2m');

  useEffect(() => {
    const section = sectionRef.current;
    const heroBg = heroBgRef.current;
    const tagline = taglineRef.current;
    const title = titleRef.current;
    const widget = widgetRef.current;

    if (!section || !heroBg || !tagline || !title || !widget) return;

    const ctx = gsap.context(() => {
      // Hero background animation - blur to sharp
      gsap.fromTo(
        heroBg,
        { scale: 1.15, filter: 'blur(20px) brightness(0.6)' },
        { 
          scale: 1.05, 
          filter: 'blur(0px) brightness(0.85)', 
          duration: 4, 
          ease: 'power2.out' 
        }
      );

      // Tagline animation
      gsap.fromTo(
        tagline,
        { opacity: 0, filter: 'blur(10px)' },
        { 
          opacity: 1, 
          filter: 'blur(0px)', 
          duration: 2, 
          delay: 1,
          ease: 'power2.out' 
        }
      );

      // Title animation
      gsap.fromTo(
        title,
        { opacity: 0, filter: 'blur(10px)', scale: 0.95 },
        { 
          opacity: 1, 
          filter: 'blur(0px)', 
          scale: 1,
          duration: 2, 
          delay: 3.5,
          ease: 'power2.out' 
        }
      );

      // Widget animation
      gsap.fromTo(
        widget,
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        { 
          opacity: 1, 
          filter: 'blur(0px)', 
          y: 0,
          duration: 2, 
          delay: 3.5,
          ease: 'power2.out' 
        }
      );

      // Parallax effect on scroll
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(heroBg, {
            scale: 1.05 + progress * 0.15,
            y: progress * 100
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToPhilosophy = () => {
    const element = document.querySelector('#philosophy');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = () => {
    const element = document.querySelector('#properties');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen flex items-center justify-center text-center overflow-hidden"
    >
      {/* Hero Background */}
      <div 
        ref={heroBgRef}
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundImage: 'url(/images/hero-villa.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Hero Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(5, 7, 10, 0.4) 0%, rgba(5, 7, 10, 0.2) 50%, rgba(5, 7, 10, 0.6) 100%)'
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-[1100px] px-[5%] flex flex-col items-center justify-center">
        {/* Tagline */}
        <p 
          ref={taglineRef}
          className="text-[1.1rem] text-white tracking-[8px] uppercase font-semibold mb-8"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
        >
          {t('hero.tagline')}
        </p>

        {/* Main Title */}
        <h1 
          ref={titleRef}
          className="font-['Playfair_Display'] text-[clamp(2rem,5vw,3.5rem)] font-bold max-w-[900px] leading-[1.3] tracking-[2px] mb-12"
          style={{
            background: 'linear-gradient(to bottom, #FFF 0%, #FFF 60%, #E6C96E 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          {t('hero.title')}
        </h1>

        {/* Search Widget */}
        <div ref={widgetRef} className="search-widget">
          <div className="search-input-group">
            <span className="search-label">{t('search.propertyType')}</span>
            <select 
              className="search-select"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="any">{t('search.anyType')}</option>
              <option value="villa">Villa</option>
              <option value="penthouse">Penthouse</option>
              <option value="finca">Finca</option>
            </select>
          </div>
          <div className="search-input-group">
            <span className="search-label">{t('search.location')}</span>
            <select 
              className="search-select"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="all">{t('search.allMallorca')}</option>
              <option value="palma">Palma</option>
              <option value="andratx">Andratx</option>
              <option value="calvia">Calvia</option>
            </select>
          </div>
          <div className="search-input-group">
            <span className="search-label">{t('search.priceRange')}</span>
            <select 
              className="search-select"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="2m">€2.000.000+</option>
              <option value="5m">€5.000.000+</option>
              <option value="10m">€10.000.000+</option>
            </select>
          </div>
          <button 
            onClick={handleSearch}
            className="btn-anclora-premium !min-w-[180px] !h-[60px] !py-0"
          >
            <Search className="w-[18px] h-[18px]" strokeWidth={2.5} />
            {t('search.button')}
          </button>
        </div>
      </div>

      {/* Hero Down Indicator */}
      <button 
        onClick={scrollToPhilosophy}
        className="hero-down"
      >
        <span>{t('hero.discover')}</span>
        <ChevronDown className="w-6 h-6" strokeWidth={2} />
      </button>
    </section>
  );
}

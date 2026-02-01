import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const mediaCardRef = useRef<HTMLDivElement>(null);
  const textPanelRef = useRef<HTMLDivElement>(null);
  const ctaRowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const mediaCard = mediaCardRef.current;
    const textPanel = textPanelRef.current;
    const ctaRow = ctaRowRef.current;
    const headline = headlineRef.current;

    if (!section || !mediaCard || !textPanel || !ctaRow || !headline) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Media card entrance
      loadTl.fromTo(
        mediaCard,
        { x: '-18vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, duration: 0.9 }
      );

      // Text panel entrance
      loadTl.fromTo(
        textPanel,
        { x: '10vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        0.15
      );

      // Headline words stagger
      const words = headline.querySelectorAll('.word');
      loadTl.fromTo(
        words,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.03 },
        0.25
      );

      // CTA row entrance
      loadTl.fromTo(
        ctaRow,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.55
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set([mediaCard, textPanel, ctaRow], {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            });
          },
        },
      });

      // ENTRANCE (0-30%): No animation, already visible from load
      // SETTLE (30-70%): Static

      // EXIT (70-100%)
      scrollTl.fromTo(
        mediaCard,
        { x: 0, opacity: 1, scale: 1 },
        { x: '-40vw', opacity: 0.25, scale: 0.96, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        textPanel,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0.2, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        ctaRow,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, section);

    return () => ctx.revert();
  }, [t]); // Re-run when translation changes

  const scrollToProperties = () => {
    const element = document.querySelector('#properties');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-anclora-cream dark:bg-anclora-teal z-10"
    >
      {/* Background vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-anclora-cream/40 dark:to-anclora-teal-dark/40 pointer-events-none" />

      {/* Left Media Card */}
      <div
        ref={mediaCardRef}
        className="absolute left-[6vw] top-[14vh] w-[52vw] h-[72vh] card-premium overflow-hidden"
      >
        <img
          src="/images/hero-villa.jpg"
          alt="Villa Cala Llamp"
          className="w-full h-full object-cover"
        />
        {/* Badge */}
        <div className="absolute top-6 left-6">
          <span className="font-mono text-xs uppercase tracking-[0.14em] bg-anclora-gold text-anclora-teal dark:text-anclora-teal px-3 py-1.5 rounded">
            {t('hero.badge')}
          </span>
        </div>
        {/* Gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-anclora-teal/60 dark:from-anclora-teal/60 to-transparent" />
      </div>

      {/* Right Text Panel */}
      <div
        ref={textPanelRef}
        className="absolute left-[62vw] top-[18vh] w-[32vw]"
      >
        {/* Eyebrow */}
        <span className="text-eyebrow block mb-4">{t('hero.eyebrow')}</span>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-anclora-navy dark:text-anclora-cream leading-tight mb-4"
        >
          <span className="word inline-block">Villa</span>{' '}
          <span className="word inline-block">Cala</span>{' '}
          <span className="word inline-block">Llamp</span>
        </h1>

        {/* Subheadline */}
        <p className="text-anclora-navy/70 dark:text-anclora-text-muted text-lg mb-4">
          {t('hero.subtitle')}
        </p>

        {/* Body */}
        <p className="text-anclora-navy/70 dark:text-anclora-text-muted leading-relaxed mb-6">
          {t('hero.description')}
        </p>

        {/* Gold divider */}
        <div className="w-28 h-0.5 bg-anclora-gold mb-8" />
      </div>

      {/* CTA Row */}
      <div
        ref={ctaRowRef}
        className="absolute left-[62vw] top-[72vh] w-[32vw]"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={scrollToProperties}
            className="btn-primary flex items-center justify-center gap-2"
          >
            {t('hero.ctaPrimary')}
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={scrollToProperties}
            className="text-anclora-gold hover:text-anclora-gold-light transition-colors flex items-center gap-1 text-sm font-medium"
          >
            {t('hero.ctaSecondary')}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

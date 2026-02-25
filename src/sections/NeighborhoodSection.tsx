import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function NeighborhoodSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const mediaCardRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const [isMobileLayout, setIsMobileLayout] = useState(() => window.innerWidth <= 1024);

  useEffect(() => {
    const onResize = () => setIsMobileLayout(window.innerWidth <= 1024);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (isMobileLayout) return;

    const section = sectionRef.current;
    const headline = headlineRef.current;
    const mediaCard = mediaCardRef.current;
    const caption = captionRef.current;

    if (!section || !headline || !mediaCard || !caption) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
        },
      });

      // ENTRANCE (0-30%)
      // Wide media card
      scrollTl.fromTo(
        mediaCard,
        { x: '24vw', y: '4vh', opacity: 0, scale: 0.98 },
        { x: 0, y: 0, opacity: 1, scale: 1, duration: 0.22, ease: 'none' },
        0
      );

      // Headline block
      scrollTl.fromTo(
        headline,
        { x: '-12vw', y: 0, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 0.22, ease: 'none' },
        0.03
      );

      // Caption
      scrollTl.fromTo(
        caption,
        { y: '4vh', opacity: 0 },
        { y: 0, opacity: 1, duration: 0.18, ease: 'none' },
        0.11
      );

      // SETTLE (30-70%): Static

      // EXIT (70-100%)
      scrollTl.to(
        headline,
        { x: '-6vw', y: '-3vh', opacity: 0, duration: 0.26 },
        0.66
      );

      scrollTl.fromTo(
        mediaCard,
        { x: 0, y: 0, opacity: 1, scale: 1 },
        { x: '16vw', y: '-3vh', opacity: 0.22, scale: 0.985, duration: 0.24, ease: 'none' },
        0.8
      );

      scrollTl.to(
        caption,
        { x: '10vw', y: '-2vh', opacity: 0, duration: 0.24 },
        0.83
      );
    }, section);

    return () => ctx.revert();
  }, [isMobileLayout, t]);

  return (
    <section
      ref={sectionRef}
      id="neighborhood"
      className="section-pinned bg-anclora-cream dark:bg-anclora-teal z-40"
    >
      {isMobileLayout ? (
        <div className="relative h-auto px-5 pt-24 pb-10">
          <span className="text-eyebrow block mb-3">{t('neighborhood.eyebrow')}</span>
          <h2 className="font-display text-4xl font-bold text-anclora-navy dark:text-anclora-cream leading-[1.06] mb-4">
            Palma<br />Old Town
          </h2>
          <p className="text-anclora-navy/75 dark:text-anclora-text-muted leading-relaxed mb-5">
            {t('neighborhood.description')}
          </p>

          <div className="card-premium overflow-hidden mb-5">
            <img
              src="/images/oldtown-palma.jpg"
              alt="Palma Old Town"
              className="w-full h-72 object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>

          <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-anclora-navy/70 dark:text-anclora-text-muted mb-6">
            {t('neighborhood.caption')}
          </p>

          <button className="inline-flex items-center gap-2 text-anclora-gold hover:text-anclora-gold-light transition-colors font-medium">
            {t('neighborhood.cta')}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <>
          {/* Left Headline Block */}
          <div
            ref={headlineRef}
            className="absolute left-[6vw] top-[16vh] w-[34vw]"
          >
            <span className="text-eyebrow block mb-4">{t('neighborhood.eyebrow')}</span>
            <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-anclora-navy dark:text-anclora-cream leading-tight mb-6">
              Palma<br />Old Town
            </h2>
            <p className="text-anclora-navy/70 dark:text-anclora-text-muted leading-relaxed mb-8">
              {t('neighborhood.description')}
            </p>

            <div className="w-28 h-0.5 bg-anclora-gold mb-8" />

            <button className="flex items-center gap-2 text-anclora-gold hover:text-anclora-gold-light transition-colors font-medium">
              {t('neighborhood.cta')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Wide Media Card */}
          <div
            ref={mediaCardRef}
            className="absolute left-[44vw] top-[16vh] w-[50vw] h-[68vh] card-premium overflow-hidden"
          >
            <img
              src="/images/oldtown-palma.jpg"
              alt="Palma Old Town"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-anclora-teal/60 dark:from-anclora-teal/60 via-transparent to-transparent" />
          </div>

          <p
            ref={captionRef}
            className="absolute left-[44vw] top-[86vh] font-mono text-xs uppercase tracking-[0.14em] text-anclora-navy/60 dark:text-anclora-text-muted"
          >
            {t('neighborhood.caption')}
          </p>
        </>
      )}
    </section>
  );
}

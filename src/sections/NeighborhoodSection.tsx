import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const mediaCard = mediaCardRef.current;
    const caption = captionRef.current;

    if (!section || !headline || !mediaCard || !caption) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      // Wide media card
      scrollTl.fromTo(
        mediaCard,
        { x: '55vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Headline block
      scrollTl.fromTo(
        headline,
        { x: '-14vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.06
      );

      // Caption
      scrollTl.fromTo(
        caption,
        { y: '4vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );

      // SETTLE (30-70%): Static

      // EXIT (70-100%)
      scrollTl.fromTo(
        mediaCard,
        { x: 0, opacity: 1, scale: 1 },
        { x: '28vw', opacity: 0.25, scale: 0.98, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        headline,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0.2, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        caption,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, section);

    return () => ctx.revert();
  }, [t]);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-anclora-cream dark:bg-anclora-teal z-40"
    >
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

        {/* Gold divider */}
        <div className="w-28 h-0.5 bg-anclora-gold mb-8" />

        {/* CTA */}
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

      {/* Caption */}
      <p
        ref={captionRef}
        className="absolute left-[44vw] top-[86vh] font-mono text-xs uppercase tracking-[0.14em] text-anclora-navy/60 dark:text-anclora-text-muted"
      >
        {t('neighborhood.caption')}
      </p>
    </section>
  );
}

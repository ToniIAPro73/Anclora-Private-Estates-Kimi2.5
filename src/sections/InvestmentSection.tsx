import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { ArrowRight, TrendingUp, Users, DollarSign } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  {
    icon: TrendingUp,
    value: '+8.2%',
    labelKey: 'investment.metric1',
  },
  {
    icon: Users,
    value: '>72%',
    labelKey: 'investment.metric2',
  },
  {
    icon: DollarSign,
    value: '€4.1B',
    labelKey: 'investment.metric3',
  },
];

export function InvestmentSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const mediaCardRef = useRef<HTMLDivElement>(null);
  const textPanelRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const [isMobileLayout, setIsMobileLayout] = useState(() => window.innerWidth <= 1024);

  useEffect(() => {
    const onResize = () => setIsMobileLayout(window.innerWidth <= 1024);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (isMobileLayout) return;

    const section = sectionRef.current;
    const mediaCard = mediaCardRef.current;
    const textPanel = textPanelRef.current;
    const metricsEls = metricsRef.current.filter(Boolean);
    const cta = ctaRef.current;

    if (!section || !mediaCard || !textPanel || !cta) return;

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
      // Left media card
      scrollTl.fromTo(
        mediaCard,
        { x: '-26vw', y: '4vh', opacity: 0, scale: 0.98 },
        { x: 0, y: 0, opacity: 1, scale: 1, duration: 0.22, ease: 'none' },
        0
      );

      // Right text panel
      scrollTl.fromTo(
        textPanel,
        { x: '18vw', y: '4vh', opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 0.22, ease: 'none' },
        0.03
      );

      // Metrics stagger
      metricsEls.forEach((metric, index) => {
        scrollTl.fromTo(
          metric,
          { x: '10vw', y: '3vh', opacity: 0, rotate: 0.5 },
          { x: 0, y: 0, opacity: 1, rotate: 0, duration: 0.2, ease: 'none' },
          0.08 + index * 0.03
        );
      });

      // CTA
      scrollTl.fromTo(
        cta,
        { y: '4vh', opacity: 0 },
        { y: 0, opacity: 1, duration: 0.18, ease: 'none' },
        0.11
      );

      // SETTLE (30-70%): Static

      // EXIT (70-100%)
      // Text panel exits first to avoid overlap with metrics while transitioning.
      scrollTl.fromTo(
        textPanel,
        { x: 0, y: 0, opacity: 1 },
        { x: '8vw', y: '-3vh', opacity: 0, duration: 0.26, ease: 'none' },
        0.66
      );

      // Media exits softly to the left/up.
      scrollTl.fromTo(
        mediaCard,
        { x: 0, y: 0, opacity: 1, scale: 1 },
        { x: '-14vw', y: '-3vh', opacity: 0.22, scale: 0.985, duration: 0.24, ease: 'none' },
        0.8
      );

      // Metrics cards exit in the same order, to the right/up (no downward clipping).
      const exitX = ['10vw', '14vw', '18vw'];
      metricsEls.forEach((metric, index) => {
        scrollTl.to(
          metric,
          {
            x: exitX[index] ?? '14vw',
            y: '-4vh',
            opacity: 0,
            rotate: 0.35,
            duration: 0.28,
          },
          0.82 + index * 0.02
        );
      });

      // CTA exits with the same direction/order as right-side elements.
      scrollTl.to(
        cta,
        { x: '11vw', y: '-3vh', opacity: 0, duration: 0.24, ease: 'none' },
        0.83
      );
    }, section);

    return () => ctx.revert();
  }, [isMobileLayout, t]);

  return (
    <section
      ref={sectionRef}
      id="invest"
      className="section-pinned bg-anclora-cream dark:bg-anclora-teal z-30"
    >
      {isMobileLayout ? (
        <div className="relative h-auto px-5 pt-24 pb-10">
          <div className="card-premium overflow-hidden mb-6">
            <img
              src="/images/aerial-coast.jpg"
              alt="Balearic Coastline"
              className="w-full h-64 object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>

          <span className="text-eyebrow block mb-3">{t('investment.eyebrow')}</span>
          <h2 className="font-display text-4xl font-bold text-anclora-navy dark:text-anclora-cream leading-[1.06] mb-4">
            {t('investment.title')}
          </h2>
          <p className="text-anclora-navy/75 dark:text-anclora-text-muted leading-relaxed mb-6">
            {t('investment.description')}
          </p>

          <div className="grid grid-cols-3 gap-3">
            {metrics.map((metric) => (
              <div
                key={metric.labelKey}
                className="text-center p-3 bg-anclora-teal-bg dark:bg-anclora-teal-bg/65 rounded-xl border border-anclora-navy/10 dark:border-white/10"
              >
                <metric.icon className="w-5 h-5 text-anclora-gold mx-auto mb-2" />
                <div className="font-display text-[1.45rem] font-bold text-anclora-gold mb-1">
                  {metric.value}
                </div>
                <div className="text-[0.72rem] text-anclora-text-muted leading-tight">
                  {t(metric.labelKey)}
                </div>
              </div>
            ))}
          </div>

          <button className="mt-7 inline-flex items-center gap-2 text-anclora-gold hover:text-anclora-gold-light transition-colors font-medium">
            {t('investment.cta')}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <>
          {/* Left Media Card */}
          <div
            ref={mediaCardRef}
            className="absolute left-[6vw] top-[14vh] w-[52vw] h-[72vh] card-premium overflow-hidden"
          >
            <img
              src="/images/aerial-coast.jpg"
              alt="Balearic Coastline"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-anclora-teal/40 dark:from-anclora-teal/40 via-transparent to-transparent" />
          </div>

          {/* Right Text Panel */}
          <div
            ref={textPanelRef}
            className="absolute left-[62vw] top-[16vh] w-[32vw]"
          >
            <span className="text-eyebrow block mb-4">{t('investment.eyebrow')}</span>
            <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-anclora-navy dark:text-anclora-cream leading-tight mb-6">
              {t('investment.title')}
            </h2>
            <p className="text-anclora-navy/70 dark:text-anclora-text-muted leading-relaxed mb-6">
              {t('investment.description')}
            </p>

            <div className="w-28 h-0.5 bg-anclora-gold mb-8" />
          </div>

          {/* Metrics Row */}
          <div className="absolute left-[62vw] top-[62vh] w-[32vw]">
            <div className="grid grid-cols-3 gap-4">
              {metrics.map((metric, index) => (
                <div
                  key={metric.labelKey}
                  ref={(el) => { metricsRef.current[index] = el; }}
                  className="text-center p-3 bg-anclora-teal-bg dark:bg-anclora-teal-bg/50 rounded-xl border border-anclora-navy/10 dark:border-white/10"
                >
                  <metric.icon className="w-5 h-5 text-anclora-gold mx-auto mb-2" />
                  <div className="font-display text-2xl lg:text-3xl font-bold text-anclora-gold mb-1">
                    {metric.value}
                  </div>
                  <div className="text-xs text-anclora-text-muted leading-tight">
                    {t(metric.labelKey)}
                  </div>
                </div>
              ))}
            </div>

            <button ref={ctaRef} className="mt-8 flex items-center gap-2 text-anclora-gold hover:text-anclora-gold-light transition-colors font-medium">
              {t('investment.cta')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </section>
  );
}

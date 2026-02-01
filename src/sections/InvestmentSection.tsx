import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const section = sectionRef.current;
    const mediaCard = mediaCardRef.current;
    const textPanel = textPanelRef.current;
    const metricsEls = metricsRef.current.filter(Boolean);

    if (!section || !mediaCard || !textPanel) return;

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
      // Left media card
      scrollTl.fromTo(
        mediaCard,
        { x: '-55vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Right text panel
      scrollTl.fromTo(
        textPanel,
        { x: '18vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.06
      );

      // Metrics stagger
      metricsEls.forEach((metric, index) => {
        scrollTl.fromTo(
          metric,
          { y: '8vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.16 + index * 0.04
        );
      });

      // SETTLE (30-70%): Static

      // EXIT (70-100%)
      scrollTl.fromTo(
        mediaCard,
        { x: 0, opacity: 1, scale: 1 },
        { x: '-28vw', opacity: 0.25, scale: 0.98, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        textPanel,
        { x: 0, opacity: 1 },
        { x: '14vw', opacity: 0.2, ease: 'power2.in' },
        0.7
      );

      metricsEls.forEach((metric) => {
        scrollTl.fromTo(
          metric,
          { y: 0, opacity: 1 },
          { y: '10vh', opacity: 0, ease: 'power2.in' },
          0.75
        );
      });
    }, section);

    return () => ctx.revert();
  }, [t]);

  return (
    <section
      ref={sectionRef}
      id="invest"
      className="section-pinned bg-anclora-cream dark:bg-anclora-teal z-30"
    >
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
        className="absolute left-[62vw] top-[18vh] w-[32vw]"
      >
        <span className="text-eyebrow block mb-4">{t('investment.eyebrow')}</span>
        <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-anclora-navy dark:text-anclora-cream leading-tight mb-6">
          {t('investment.title')}
        </h2>
        <p className="text-anclora-navy/70 dark:text-anclora-text-muted leading-relaxed mb-8">
          {t('investment.description')}
        </p>

        {/* Gold divider */}
        <div className="w-28 h-0.5 bg-anclora-gold mb-8" />
      </div>

      {/* Metrics Row */}
      <div className="absolute left-[62vw] top-[56vh] w-[32vw]">
        <div className="grid grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <div
              key={metric.labelKey}
              ref={(el) => { metricsRef.current[index] = el; }}
              className="text-center p-4 bg-anclora-teal-bg dark:bg-anclora-teal-bg/50 rounded-xl border border-anclora-navy/10 dark:border-white/10"
            >
              <metric.icon className="w-6 h-6 text-anclora-gold mx-auto mb-3" />
              <div className="font-display text-2xl lg:text-3xl font-bold text-anclora-gold mb-1">
                {metric.value}
              </div>
              <div className="text-xs text-anclora-navy/70 dark:text-anclora-text-muted leading-tight">
                {t(metric.labelKey)}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="mt-8 flex items-center gap-2 text-anclora-gold hover:text-anclora-gold-light transition-colors font-medium">
          {t('investment.cta')}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

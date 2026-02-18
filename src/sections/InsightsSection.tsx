import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    id: 1,
    titleKey: 'insights.article1.title',
    subtitleKey: 'insights.article1.subtitle',
    image: '/images/insight-1.jpg',
  },
  {
    id: 2,
    titleKey: 'insights.article2.title',
    subtitleKey: 'insights.article2.subtitle',
    image: '/images/insight-2.jpg',
  },
  {
    id: 3,
    titleKey: 'insights.article3.title',
    subtitleKey: 'insights.article3.subtitle',
    image: '/images/insight-3.jpg',
  },
];

export function InsightsSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !headline || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.fromTo(
        headline,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headline,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger reveal
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

    }, section);

    return () => ctx.revert();
  }, [t]);

  return (
    <section
      ref={sectionRef}
      id="insights"
      className="section-flowing bg-anclora-cream dark:bg-anclora-teal py-24 lg:py-32"
    >
      <div className="w-full px-6 lg:pl-12 lg:pr-[136px]">
        {/* Headline */}
        <div ref={headlineRef} className="mb-12">
          <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-anclora-navy dark:text-anclora-cream leading-tight mb-4">
            {t('insights.title')}
          </h2>
          <p className="text-anclora-navy/70 dark:text-anclora-text-muted leading-relaxed max-w-xl">
            {t('insights.description')}
          </p>
        </div>

        {/* Article Cards */}
        <div data-insights-cards className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {articles.map((article, index) => (
            <div
              key={article.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group cursor-pointer"
            >
              <div className="card-premium overflow-hidden h-[52vh] relative">
                {/* Image */}
                <div className="h-[65%] overflow-hidden">
                  <img
                    src={article.image}
                    alt={t(article.titleKey)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Content */}
                <div className="h-[35%] p-6 bg-anclora-teal-bg dark:bg-anclora-teal-bg flex flex-col justify-center">
                  <h3 className="font-display text-xl font-semibold text-anclora-cream mb-1 group-hover:text-anclora-gold transition-colors">
                    {t(article.titleKey)}
                  </h3>
                  <p className="text-sm text-anclora-text-muted">
                    {t(article.subtitleKey)}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-anclora-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Read more
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

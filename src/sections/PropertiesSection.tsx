import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { ArrowRight, MapPin, Bed, Maximize } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const properties = [
  {
    id: 1,
    name: 'Cala Fornells',
    typeKey: 'properties.villa1',
    location: 'Cala Fornells, Mallorca',
    beds: 5,
    sqm: 450,
    price: '€3,200,000',
    image: '/images/collection-villa-1.jpg',
  },
  {
    id: 2,
    name: 'Santa Ponsa',
    typeKey: 'properties.villa2',
    location: 'Santa Ponsa, Mallorca',
    beds: 4,
    sqm: 380,
    price: '€2,850,000',
    image: '/images/collection-villa-2.jpg',
  },
  {
    id: 3,
    name: 'Palma Old Town',
    typeKey: 'properties.villa3',
    location: 'Palma de Mallorca',
    beds: 3,
    sqm: 220,
    price: '€1,950,000',
    image: '/images/collection-villa-3.jpg',
  },
];

export function PropertiesSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
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
    const headline = headlineRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const cta = ctaRef.current;

    if (!section || !headline || cards.length === 0 || !cta) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 1.4,
          anticipatePin: 1,
        },
      });

      // ENTRANCE (0-30%)
      // Headline block
      scrollTl.fromTo(
        headline,
        { x: '-12vw', y: 0, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 0.22, ease: 'none' },
        0
      );

      // Cards stagger (left to right)
      cards.forEach((card, index) => {
        scrollTl.fromTo(
          card,
          { x: '14vw', y: '3.5vh', opacity: 0, rotate: 0.45 },
          { x: 0, y: 0, opacity: 1, rotate: 0, duration: 0.27, ease: 'none' },
          0.05 + index * 0.035
        );
      });

      // CTA
      scrollTl.fromTo(
        cta,
        { y: '2.5vh', opacity: 0 },
        { y: 0, opacity: 1, duration: 0.24, ease: 'none' },
        0.125
      );

      // SETTLE (30-70%): Static

      // EXIT (70-100%)
      // Cards exit to the right and up for consistent behavior in both scroll directions.
      const lateralExitByIndex = ['12vw', '16vw', '20vw'];
      cards.forEach((card, index) => {
        scrollTl.to(
          card,
          {
            x: lateralExitByIndex[index] ?? '24vw',
            y: '-4vh',
            opacity: 0,
            rotate: 0.35,
            duration: 0.28,
          },
          0.8 + index * 0.02
        );
      });

      // Headline exit
      scrollTl.to(
        headline,
        { x: '-6vw', y: '-3vh', opacity: 0, duration: 0.26 },
        0.66
      );

      // CTA exit
      scrollTl.to(
        cta,
        { x: '11vw', y: '-3vh', opacity: 0, duration: 0.24 },
        0.83
      );
    }, section);

    return () => ctx.revert();
  }, [isMobileLayout, t]);

  return (
    <section
      ref={sectionRef}
      id="properties"
      className="section-pinned bg-anclora-cream dark:bg-anclora-teal z-20"
    >
      {isMobileLayout ? (
        <div className="relative h-auto px-5 pt-24 pb-10">
          <div className="mb-8">
            <span className="text-eyebrow block mb-3">{t('properties.eyebrow')}</span>
            <h2 className="font-display text-4xl font-bold text-anclora-navy dark:text-anclora-cream leading-[1.05] mb-4">
              {t('properties.title').split('.')[0]}.<br />{t('properties.title').split('.')[1]}.
            </h2>
            <p className="text-anclora-navy/75 dark:text-anclora-text-muted leading-relaxed">
              {t('properties.description')}
            </p>
          </div>

          <div className="space-y-4">
            {properties.map((property) => (
              <article key={property.id} className="card-premium overflow-hidden">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-anclora-teal/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] bg-anclora-teal-dark/85 text-anclora-cream px-2.5 py-1 rounded">
                      {t(property.typeKey)}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-anclora-teal-bg">
                  <h3 className="font-display text-[1.45rem] font-semibold text-anclora-cream mb-1">{property.name}</h3>
                  <div className="flex items-center gap-1 text-anclora-text-muted text-sm mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-anclora-text-muted mb-3">
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      <span>{property.beds}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize className="w-4 h-4" />
                      <span>{property.sqm} m²</span>
                    </div>
                  </div>
                  <span className="font-display text-2xl font-bold text-anclora-gold">{property.price}</span>
                </div>
              </article>
            ))}
          </div>

          <button className="btn-anclora-premium w-full !min-w-0 !h-[56px] !mt-7 !px-6">
            <span>{t('properties.cta')}</span>
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
            <span className="text-eyebrow block mb-4">{t('properties.eyebrow')}</span>
            <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-anclora-navy dark:text-anclora-cream leading-tight mb-6">
              {t('properties.title').split('.')[0]}.<br />{t('properties.title').split('.')[1]}.
            </h2>
            <p className="text-anclora-navy/70 dark:text-anclora-text-muted leading-relaxed max-w-md">
              {t('properties.description')}
            </p>
          </div>

          {/* Property Cards */}
          <div className="absolute left-[44vw] top-[16vh] w-[50vw] h-[68vh] flex gap-[1.6vw]">
            {properties.map((property, index) => (
              <div
                key={property.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="w-[15.3vw] h-full card-premium group cursor-pointer overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-[55%] overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-anclora-teal/80 dark:from-anclora-teal/80 via-transparent to-transparent" />
                  
                  {/* Type badge */}
                  <div className="absolute top-4 left-4">
                    <span className="font-mono text-xs uppercase tracking-[0.14em] bg-anclora-teal-dark/80 dark:bg-anclora-teal-dark/80 text-anclora-cream px-2.5 py-1 rounded backdrop-blur-sm">
                      {t(property.typeKey)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="h-[45%] p-5 bg-anclora-teal-bg dark:bg-anclora-teal-bg flex flex-col">
                  <h3 className="font-display text-xl font-semibold text-anclora-cream mb-2">
                    {property.name}
                  </h3>
                  
                  <div className="flex items-center gap-1 text-anclora-text-muted text-sm mb-4">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{property.location}</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-anclora-text-muted mb-4">
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      <span>{property.beds}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize className="w-4 h-4" />
                      <span>{property.sqm} m²</span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <span className="font-display text-2xl font-bold text-anclora-gold">
                      {property.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            ref={ctaRef}
            className="absolute left-[44vw] top-[87vh] btn-anclora-premium !px-8 !min-w-[240px]"
          >
            <span>{t('properties.cta')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </>
      )}
    </section>
  );
}

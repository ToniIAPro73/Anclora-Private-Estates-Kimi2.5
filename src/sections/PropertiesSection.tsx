import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const cta = ctaRef.current;

    if (!section || !headline || cards.length === 0) return;

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
      // Headline block
      scrollTl.fromTo(
        headline,
        { x: '-12vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Cards stagger (left to right)
      cards.forEach((card, index) => {
        scrollTl.fromTo(
          card,
          { x: '40vw', y: '10vh', opacity: 0, rotate: 2 },
          { x: 0, y: 0, opacity: 1, rotate: 0, ease: 'none' },
          0.05 + index * 0.04
        );
      });

      // CTA
      scrollTl.fromTo(
        cta,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );

      // SETTLE (30-70%): Static

      // EXIT (70-100%)
      // Cards exit downward (right to left)
      cards.reverse().forEach((card, index) => {
        scrollTl.fromTo(
          card,
          { y: 0, opacity: 1 },
          { y: '55vh', opacity: 0.25, ease: 'power2.in' },
          0.7 + index * 0.03
        );
      });

      // Headline exit
      scrollTl.fromTo(
        headline,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0.2, ease: 'power2.in' },
        0.7
      );

      // CTA exit
      scrollTl.fromTo(
        cta,
        { y: 0, opacity: 1 },
        { y: '8vh', opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, section);

    return () => ctx.revert();
  }, [t]);

  return (
    <section
      ref={sectionRef}
      id="properties"
      className="section-pinned bg-anclora-cream dark:bg-anclora-teal z-20"
    >
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
              <h3 className="font-display text-xl font-semibold text-anclora-navy dark:text-anclora-cream mb-2">
                {property.name}
              </h3>
              
              <div className="flex items-center gap-1 text-anclora-navy/70 dark:text-anclora-text-muted text-sm mb-4">
                <MapPin className="w-3.5 h-3.5" />
                <span>{property.location}</span>
              </div>

              <div className="flex items-center gap-4 text-sm text-anclora-navy/70 dark:text-anclora-text-muted mb-4">
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
        className="absolute left-[44vw] top-[88vh] flex items-center gap-2 text-anclora-gold hover:text-anclora-gold-light transition-colors font-medium"
      >
        {t('properties.cta')}
        <ArrowRight className="w-4 h-4" />
      </button>
    </section>
  );
}

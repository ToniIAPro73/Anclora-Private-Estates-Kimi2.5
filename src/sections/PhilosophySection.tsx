import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { Trophy, BarChart3, Scale } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function PhilosophySection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards) return;

    const ctx = gsap.context(() => {
      // Reveal animation for cards
      const cardElements = cards.querySelectorAll('.premium-card');
      
      cardElements.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const philosophyCards = [
    {
      icon: Trophy,
      title: t('philosophy.trophy.title'),
      description: t('philosophy.trophy.description'),
    },
    {
      icon: BarChart3,
      title: t('philosophy.dataLab.title'),
      description: t('philosophy.dataLab.description'),
    },
    {
      icon: Scale,
      title: t('philosophy.legal.title'),
      description: t('philosophy.legal.description'),
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="py-24 lg:py-32 bg-[var(--pe-black)]"
    >
      <div className="max-w-[1400px] mx-auto px-[5%]">
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {philosophyCards.map((card, index) => (
            <div 
              key={index} 
              className="premium-card p-10 lg:p-12 text-center"
            >
              <div className="flex justify-center mb-6">
                <card.icon 
                  className="w-12 h-12 text-anclora-gold" 
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="[font-family:var(--font-headlines)] text-2xl lg:text-3xl italic text-anclora-gold mb-5">
                {card.title}
              </h3>
              <p className="text-anclora-text-muted text-base leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { Calculator, TrendingUp, FileText, Send, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function ValuationSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const formRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    {
      icon: Calculator,
      titleKey: 'valuation.service1.title',
      descriptionKey: 'valuation.service1.description',
    },
    {
      icon: TrendingUp,
      titleKey: 'valuation.service2.title',
      descriptionKey: 'valuation.service2.description',
    },
    {
      icon: FileText,
      titleKey: 'valuation.service3.title',
      descriptionKey: 'valuation.service3.description',
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const form = formRef.current;

    if (!section || !headline || cards.length === 0 || !form) return;

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

      // Form panel reveal
      gsap.fromTo(
        form,
        { x: '8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', address: '', message: '' });
    }, 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="valuation"
      className="section-flowing bg-anclora-cream dark:bg-anclora-teal py-10 lg:py-12 z-50"
    >
      <div className="w-full px-6 lg:pl-12 lg:pr-[190px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-start">
          {/* Left Column */}
          <div className="lg:col-span-7">
            {/* Headline */}
            <div ref={headlineRef} className="mb-8">
              <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-anclora-navy dark:text-anclora-cream leading-tight mb-6">
                {t('valuation.title')}
              </h2>
              <p className="text-anclora-navy/70 dark:text-anclora-text-muted leading-relaxed max-w-xl">
                {t('valuation.description')}
              </p>
            </div>

            {/* Service Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {services.map((service, index) => (
                <div
                  key={service.titleKey}
                  ref={(el) => { cardsRef.current[index] = el; }}
                  className="valuation-service-card p-5 group min-h-[230px]"
                >
                  <service.icon className="w-8 h-8 text-anclora-gold mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display text-lg font-semibold text-anclora-cream mb-2">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-sm text-anclora-text-muted leading-relaxed">
                    {t(service.descriptionKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-5 lg:pr-2">
            <div
              id="valuation-form-card"
              ref={formRef}
              className="card-premium p-5 max-w-[680px] ml-auto"
            >
              <h3 className="font-display text-2xl font-semibold text-anclora-cream mb-5">
                {t('valuation.form.title')}
              </h3>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="w-16 h-16 text-anclora-gold mb-4" />
                  <h4 className="font-display text-xl font-semibold text-anclora-cream mb-2">
                    {t('valuation.form.success')}
                  </h4>
                  <p className="text-anclora-text-muted">
                    {t('valuation.form.successMessage')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label htmlFor="name" className="block text-sm text-anclora-text-muted mb-1.5">
                      {t('valuation.form.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-anclora w-full"
                      placeholder={t('valuation.form.placeholderName')}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm text-anclora-text-muted mb-1.5">
                      {t('valuation.form.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-anclora w-full"
                      placeholder={t('valuation.form.placeholderEmail')}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm text-anclora-text-muted mb-1.5">
                      {t('valuation.form.address')}
                    </label>
                    <input
                      type="text"
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="input-anclora w-full"
                      placeholder={t('valuation.form.placeholderAddress')}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm text-anclora-text-muted mb-1.5">
                      {t('valuation.form.message')}
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="input-anclora w-full h-16 resize-none"
                      placeholder={t('valuation.form.placeholderMessage')}
                    />
                  </div>

                  <div className="mt-4 flex justify-center max-sm:block">
                    <button
                      type="submit"
                      className="btn-valuation inline-flex items-center justify-center gap-2 !min-w-[260px] !px-8 max-sm:w-full max-sm:!min-w-0"
                    >
                      <Send className="w-4 h-4" />
                      {t('valuation.form.submit')}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

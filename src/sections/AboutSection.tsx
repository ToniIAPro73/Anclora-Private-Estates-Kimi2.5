import { useTranslation } from 'react-i18next';

export function AboutSection() {
  const { t } = useTranslation();

  return (
    <section id="about" className="section-flowing py-24 lg:py-28 bg-anclora-cream dark:bg-anclora-teal">
      <div className="w-full px-6 lg:pl-12 lg:pr-[136px]">
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-stretch">
          <div className="card-premium p-8 lg:p-10">
            <p className="text-eyebrow mb-4">{t('aboutSection.eyebrow')}</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-anclora-cream leading-tight mb-5">
              {t('aboutSection.title')}
            </h2>
            <p className="text-anclora-text-muted text-lg leading-relaxed mb-4">
              {t('aboutSection.description')}
            </p>
            <p className="text-anclora-text-muted leading-relaxed">
              {t('aboutSection.description2')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="card-premium p-7">
              <h3 className="font-display text-2xl text-anclora-gold mb-3">{t('aboutSection.pillar1Title')}</h3>
              <p className="text-anclora-text-muted leading-relaxed">{t('aboutSection.pillar1Text')}</p>
            </div>
            <div className="card-premium p-7">
              <h3 className="font-display text-2xl text-anclora-gold mb-3">{t('aboutSection.pillar2Title')}</h3>
              <p className="text-anclora-text-muted leading-relaxed">{t('aboutSection.pillar2Text')}</p>
            </div>
            <div className="card-premium p-7">
              <h3 className="font-display text-2xl text-anclora-gold mb-3">{t('aboutSection.pillar3Title')}</h3>
              <p className="text-anclora-text-muted leading-relaxed">{t('aboutSection.pillar3Text')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

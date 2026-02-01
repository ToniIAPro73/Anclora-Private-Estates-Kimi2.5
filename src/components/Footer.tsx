import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-anclora-teal-dark dark:bg-anclora-teal-dark border-t border-white/10">
      {/* Main Footer */}
      <div className="w-full px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="font-display text-2xl font-bold">
                <span className="text-anclora-gold">ANCLORA</span>
                <span className="text-anclora-cream"> PRIVATE ESTATES</span>
              </span>
            </Link>
            <p className="text-anclora-text-muted text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-anclora-cream/60 hover:text-anclora-gold hover:border-anclora-gold transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-anclora-cream/60 hover:text-anclora-gold hover:border-anclora-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-anclora-cream mb-6">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              {[
                { label: t('nav.properties'), href: '#properties' },
                { label: t('nav.invest'), href: '#invest' },
                { label: t('nav.valuation'), href: '#valuation' },
                { label: t('nav.insights'), href: '#insights' },
                { label: t('nav.contact'), href: '#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-anclora-text-muted hover:text-anclora-gold transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-anclora-cream mb-6">
              {t('footer.legal')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/legal/privacidad"
                  className="text-anclora-text-muted hover:text-anclora-gold transition-colors text-sm"
                >
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  to="/legal/cookies"
                  className="text-anclora-text-muted hover:text-anclora-gold transition-colors text-sm"
                >
                  {t('footer.cookies')}
                </Link>
              </li>
              <li>
                <Link
                  to="/legal/terminos"
                  className="text-anclora-text-muted hover:text-anclora-gold transition-colors text-sm"
                >
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link
                  to="/legal/disclaimer"
                  className="text-anclora-text-muted hover:text-anclora-gold transition-colors text-sm"
                >
                  {t('footer.legalNotice')}
                </Link>
              </li>
              <li>
                <Link
                  to="/legal/codigo-etico"
                  className="text-anclora-text-muted hover:text-anclora-gold transition-colors text-sm"
                >
                  {t('footer.ethics')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-anclora-cream mb-6">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-anclora-gold flex-shrink-0 mt-0.5" />
                <span className="text-anclora-text-muted text-sm">
                  Paseo del Borne, 15<br />
                  07012 Palma de Mallorca<br />
                  Islas Baleares, España
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-anclora-gold flex-shrink-0" />
                <a
                  href="tel:+34600000000"
                  className="text-anclora-text-muted hover:text-anclora-gold transition-colors text-sm"
                >
                  +34 600 000 000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-anclora-gold flex-shrink-0" />
                <a
                  href="mailto:hello@ancloraprivateestates.com"
                  className="text-anclora-text-muted hover:text-anclora-gold transition-colors text-sm"
                >
                  hello@ancloraprivateestates.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Legal Bar */}
      <div className="border-t border-white/5">
        <div className="w-full px-6 lg:px-12 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-xs text-anclora-text-muted/60 text-center lg:text-left">
              <p className="mb-1">
                <strong className="text-anclora-cream/80">Anclora Private Estates S.L.</strong> | 
                CIF: B-XXXXXXXX | 
                Registro Mercantil de Palma de Mallorca
              </p>
              <p>
                API (Agente de la Propiedad Inmobiliaria) Nº XXXX - Colegio API Baleares | 
                Seguro de Responsabilidad Civil: 300.000€
              </p>
            </div>
            <p className="text-xs text-anclora-text-muted/40">
              © {currentYear} Anclora Private Estates. {t('footer.rights')}
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-white/5 bg-anclora-teal-dark/50">
        <div className="w-full px-6 lg:px-12 py-6">
          <p className="text-xs text-anclora-text-muted/50 leading-relaxed text-center lg:text-left">
            <strong className="text-anclora-cream/60">Legal Notice:</strong> The information on this website 
            is for informational purposes only and does not constitute legal, tax, or investment advice. 
            Property photographs and renders may not exactly match reality. All prices are subject to change 
            without notice. Anclora Private Estates is not responsible for errors or omissions in the 
            published information. Please verify all information directly with our agents before making any decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}

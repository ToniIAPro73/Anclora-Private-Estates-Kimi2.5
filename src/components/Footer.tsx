import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, CheckSquare, BarChart3, FileText } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert(t('newsletter.success'));
    setEmail('');
    setName('');
  };

  return (
    <footer className="premium-footer">
      {/* Decorative Wave SVG */}
      <div className="footer-wave-decoration">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="footer-wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#D4AF37', stopOpacity: 0 }} />
              <stop offset="30%" style={{ stopColor: '#D4AF37', stopOpacity: 0.4 }} />
              <stop offset="70%" style={{ stopColor: '#B9915F', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: '#D4AF37', stopOpacity: 0 }} />
            </linearGradient>
            <linearGradient id="footer-wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" style={{ stopColor: '#D4AF37', stopOpacity: 0 }} />
              <stop offset="40%" style={{ stopColor: '#D4AF37', stopOpacity: 0.25 }} />
              <stop offset="100%" style={{ stopColor: '#B9915F', stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          <path 
            className="wave-path" 
            d="M-50,450 Q150,350 300,400 T550,300 T800,350" 
            stroke="url(#footer-wave-gradient)" 
            strokeWidth="3" 
            opacity="0.5"
            fill="none"
          />
          <path 
            className="wave-path" 
            d="M-100,500 Q200,400 350,450 T600,350 T850,400" 
            stroke="url(#footer-wave-gradient)" 
            strokeWidth="1.5" 
            opacity="0.35"
            fill="none"
          />
          <path 
            className="wave-path" 
            d="M-80,550 Q180,480 320,520 T580,420 T820,480" 
            stroke="url(#footer-wave-gradient-2)" 
            strokeWidth="2" 
            opacity="0.25"
            fill="none"
          />
        </svg>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main-content">
        {/* Left Column - Anclora Nexus Group Brand */}
        <div className="footer-brand-column">
          <img 
            src="/logo-anclora-nexus-group.png" 
            alt="Anclora Nexus Group" 
            className="footer-logo-premium"
          />
          
          <div className="footer-brand-text">ANCLORA NEXUS GROUP</div>
          
          <div className="footer-brand-slogan">
            {t('footer.slogan')}
          </div>

          {/* Trust Icons */}
          <div className="footer-trust-icons">
            <div className="trust-item">
              <div className="trust-icon-box">
                <CheckSquare className="w-7 h-7" />
              </div>
              <span>GDPR</span>
            </div>
            <div className="trust-item">
              <div className="trust-icon-box">
                <BarChart3 className="w-7 h-7" />
              </div>
              <span>ISO 9001</span>
            </div>
            <div className="trust-item">
              <div className="trust-icon-box">
                <FileText className="w-7 h-7" />
              </div>
              <span>EU REG</span>
            </div>
          </div>
        </div>

        {/* Center Column - Contact Info */}
        <div className="footer-contact-column">
          <h4 className="footer-section-title">{t('footer.contact')}</h4>

          <a href="tel:+34971000000" className="footer-contact-item">
            <Phone className="w-5 h-5" strokeWidth={2} />
            +34 971 00 00 00
          </a>
          <a href="mailto:private@anclora.com" className="footer-contact-item">
            <Mail className="w-5 h-5" strokeWidth={2} />
            private@anclora.com
          </a>
        </div>

        {/* Right Column - Newsletter */}
        <div className="footer-newsletter-column">
          <h4 className="footer-section-title">{t('newsletter.title')}</h4>

          <p className="newsletter-description">
            {t('newsletter.description')}
          </p>

          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <div className="newsletter-input-group">
              <input 
                type="text" 
                className="newsletter-input" 
                placeholder={t('newsletter.namePlaceholder')}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="newsletter-input-group">
              <input 
                type="email" 
                className="newsletter-input" 
                placeholder={t('newsletter.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="newsletter-submit">
              {t('newsletter.submit')}
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-content">
          {/* Legal Links */}
          <div className="footer-legal-links">
            <Link to="/legal/privacidad">
              {t('footer.privacy')}
            </Link>
            <Link to="/legal/cookies">
              {t('footer.cookies')}
            </Link>
            <Link to="/legal/terminos">
              {t('footer.terms')}
            </Link>
            <Link to="/legal/disclaimer">
              {t('footer.legalNotice')}
            </Link>
            <Link to="/legal/codigo-etico">
              {t('footer.ethics')}
            </Link>
          </div>

          {/* Disclaimer */}
          <p className="footer-disclaimer">
            {t('footer.disclaimer')}
          </p>

          {/* Copyright */}
          <p className="footer-copyright">
            © {new Date().getFullYear()} <span>ANCLORA NEXUS GROUP</span> · ID: ANG-PRT-2026-EU
          </p>
        </div>
      </div>
    </footer>
  );
}

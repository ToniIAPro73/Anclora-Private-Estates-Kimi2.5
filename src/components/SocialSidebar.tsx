import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';

export function SocialSidebar() {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <div className="social-sidebar">
      <div className="social-label">{t('social.followUs')}</div>
      <div className="social-icons">
        {socialLinks.map((social) => (
          <a 
            key={social.label}
            href={social.href} 
            aria-label={social.label}
            className="text-[rgba(245,245,240,0.7)] hover:text-[#D4AF37] hover:scale-[1.2] transition-all duration-500"
          >
            <social.icon className="w-[18px] h-[18px]" />
          </a>
        ))}
      </div>
    </div>
  );
}

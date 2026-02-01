import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Phone } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav.properties'), href: '#properties' },
    { label: t('nav.invest'), href: '#invest' },
    { label: t('nav.valuation'), href: '#valuation' },
    { label: t('nav.insights'), href: '#insights' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-anclora-teal/95 dark:bg-anclora-teal/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#"
              className="font-display text-xl font-bold tracking-wide transition-colors"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span className="text-anclora-gold">ANCLORA</span>{' '}
              <span className="text-anclora-cream dark:text-anclora-cream">PRIVATE ESTATES</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-medium text-anclora-cream/80 dark:text-anclora-cream/80 hover:text-anclora-gold transition-colors duration-300"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right Section - Toggles + CTA */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Language Toggle */}
              <LanguageToggle />
              
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* Phone */}
              <a
                href="tel:+34600000000"
                className="flex items-center gap-2 text-sm text-anclora-cream/80 hover:text-anclora-gold transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+34 600 000 000</span>
              </a>
              
              {/* CTA Button */}
              <button
                onClick={() => scrollToSection('#contact')}
                className="btn-outline text-sm py-2.5 px-5"
              >
                {t('nav.bookCall')}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-anclora-cream"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-anclora-teal-dark/98 dark:bg-anclora-teal-dark/98 backdrop-blur-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className="relative flex flex-col items-center justify-center h-full gap-8">
          {/* Mobile Toggles */}
          <div className="flex items-center gap-4 mb-4">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          
          {navLinks.map((link, index) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="text-2xl font-display font-semibold text-anclora-cream hover:text-anclora-gold transition-colors"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('#contact')}
            className="btn-primary mt-8"
          >
            {t('nav.bookCall')}
          </button>
        </div>
      </div>
    </>
  );
}

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Globe } from 'lucide-react';

const languages = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-full
          transition-all duration-300 ease-out
          border
          ${isOpen 
            ? 'bg-anclora-gold/20 border-anclora-gold text-anclora-gold' 
            : 'bg-transparent border-white/20 text-anclora-cream/80 hover:border-anclora-gold/50 hover:text-anclora-gold'
          }
        `}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium hidden sm:inline">{currentLang.label}</span>
        <span className="text-sm font-medium sm:hidden">{currentLang.code.toUpperCase()}</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`
          absolute right-0 mt-2 min-w-[160px]
          bg-anclora-cream dark:bg-anclora-teal-dark
          rounded-2xl shadow-2xl
          border border-anclora-navy/10 dark:border-white/10
          overflow-hidden
          z-50
          transition-all duration-300 ease-out
          origin-top-right
          ${isOpen 
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
          }
        `}
        role="listbox"
      >
        <div className="py-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`
                w-full flex items-center gap-3 px-4 py-3
                transition-all duration-200
                ${i18n.language === lang.code 
                  ? 'bg-anclora-gold/10 text-anclora-gold' 
                  : 'text-anclora-navy dark:text-anclora-cream hover:bg-anclora-gold/5'
                }
              `}
              role="option"
              aria-selected={i18n.language === lang.code}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="text-sm font-medium">{lang.label}</span>
              {i18n.language === lang.code && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-anclora-gold" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

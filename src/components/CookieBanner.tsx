import { useState, useEffect } from 'react';
import { X, Cookie, Settings } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
      } catch {
        setShowBanner(true);
      }
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShowBanner(false);
    setShowSettings(false);
    
    // Load scripts based on preferences
    if (prefs.analytics) {
      // Load Google Analytics
      console.log('Analytics cookies enabled');
    }
    if (prefs.marketing) {
      // Load Meta Pixel
      console.log('Marketing cookies enabled');
    }
  };

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    saveConsent(allAccepted);
  };

  const acceptSelected = () => {
    saveConsent(preferences);
  };

  const rejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    saveConsent(onlyNecessary);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-anclora-cream dark:bg-anclora-teal-dark border-t-2 border-anclora-gold shadow-2xl">
      <div className="w-full px-6 lg:px-12 py-6">
        {!showSettings ? (
          // Simple View
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4 flex-1">
              <Cookie className="w-8 h-8 text-anclora-gold flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-display text-lg font-semibold mb-2 text-anclora-navy dark:text-anclora-cream">
                  Cookie Usage
                </h3>
                <p className="text-sm text-anclora-navy/70 dark:text-anclora-text-muted leading-relaxed max-w-2xl">
                  We use our own and third-party cookies to improve your experience, 
                  analyze traffic, and personalize content. You can accept all cookies, 
                  configure them, or reject non-essential ones.{' '}
                  <a 
                    href="/legal/cookies" 
                    className="text-anclora-gold hover:underline font-medium"
                  >
                    More information
                  </a>
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center gap-2 px-4 py-2.5 border border-anclora-navy/30 dark:border-white/30 rounded-lg text-anclora-navy dark:text-anclora-cream hover:bg-anclora-navy/5 dark:hover:bg-white/5 transition-colors text-sm font-medium"
              >
                <Settings className="w-4 h-4" />
                Configure
              </button>
              <button
                onClick={rejectAll}
                className="px-4 py-2.5 text-anclora-navy/70 dark:text-anclora-text-muted hover:text-anclora-navy dark:hover:text-anclora-cream transition-colors text-sm font-medium"
              >
                Reject non-essential
              </button>
              <button
                onClick={acceptAll}
                className="btn-primary text-sm py-2.5"
              >
                Accept all
              </button>
            </div>
          </div>
        ) : (
          // Settings View
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl font-semibold text-anclora-navy dark:text-anclora-cream">
                Cookie Settings
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 text-anclora-navy/60 dark:text-anclora-text-muted/60 hover:text-anclora-navy dark:hover:text-anclora-cream transition-colors"
                aria-label="Close settings"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              {/* Necessary Cookies */}
              <div className="flex items-start justify-between p-4 bg-anclora-navy/5 dark:bg-white/5 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-display font-semibold text-sm mb-1 text-anclora-navy dark:text-anclora-cream">
                    Necessary Cookies
                  </h4>
                  <p className="text-xs text-anclora-navy/60 dark:text-anclora-text-muted/60">
                    Essential for the website to function. Cannot be disabled.
                  </p>
                </div>
                <div className="ml-4">
                  <input 
                    type="checkbox" 
                    checked={true} 
                    disabled
                    className="w-5 h-5 accent-anclora-gold cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-start justify-between p-4 bg-anclora-navy/5 dark:bg-white/5 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-display font-semibold text-sm mb-1 text-anclora-navy dark:text-anclora-cream">
                    Analytics Cookies
                  </h4>
                  <p className="text-xs text-anclora-navy/60 dark:text-anclora-text-muted/60">
                    Google Analytics - Helps us understand how you interact with the site.
                  </p>
                </div>
                <div className="ml-4">
                  <input 
                    type="checkbox" 
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                    className="w-5 h-5 accent-anclora-gold cursor-pointer"
                  />
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-start justify-between p-4 bg-anclora-navy/5 dark:bg-white/5 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-display font-semibold text-sm mb-1 text-anclora-navy dark:text-anclora-cream">
                    Marketing Cookies
                  </h4>
                  <p className="text-xs text-anclora-navy/60 dark:text-anclora-text-muted/60">
                    Meta Pixel - To show you relevant ads on social media.
                  </p>
                </div>
                <div className="ml-4">
                  <input 
                    type="checkbox" 
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                    className="w-5 h-5 accent-anclora-gold cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-end">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2.5 text-anclora-navy/70 dark:text-anclora-text-muted hover:text-anclora-navy dark:hover:text-anclora-cream transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={acceptSelected}
                className="btn-primary text-sm py-2.5"
              >
                Save preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

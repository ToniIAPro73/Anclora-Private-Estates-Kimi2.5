import { ArrowLeft, Cookie, BarChart3, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const cookieTypes = [
  {
    icon: Cookie,
    title: 'Necessary Cookies',
    description: 'Essential for the website to function properly. These cannot be disabled.',
    examples: ['Session cookies', 'Authentication cookies', 'Security cookies'],
    required: true,
  },
  {
    icon: BarChart3,
    title: 'Analytics Cookies',
    description: 'Help us understand how visitors interact with our website.',
    examples: ['Google Analytics', 'Page view tracking', 'User behavior analysis'],
    required: false,
  },
  {
    icon: Target,
    title: 'Marketing Cookies',
    description: 'Used to deliver relevant advertisements and track their performance.',
    examples: ['Meta Pixel', 'Remarketing cookies', 'Social media pixels'],
    required: false,
  },
];

export function CookiesPage() {
  return (
    <div className="min-h-screen bg-anclora-teal">
      {/* Header */}
      <div className="w-full px-6 lg:px-12 py-8 border-b border-white/10">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-anclora-gold hover:text-anclora-gold-light transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to home
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-6 lg:px-12 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Cookie className="w-10 h-10 text-anclora-gold" />
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-anclora-cream">
              Cookie Policy
            </h1>
          </div>
          <p className="text-anclora-text-muted mb-12">
            Last updated: January 24, 2026
          </p>

          <div className="bg-anclora-teal-bg/50 rounded-2xl p-8 border border-white/10 mb-12">
            <p className="text-anclora-text-muted leading-relaxed m-0">
              We use first-party and third-party cookies to improve your browsing experience, 
              perform statistical analysis, and show you personalized advertising. By continuing 
              to browse, you accept their use. You can configure or reject cookies at any time 
              through our consent manager.
            </p>
          </div>

          {/* Cookie Types */}
          <div className="grid gap-6 mb-12">
            {cookieTypes.map((type) => (
              <div
                key={type.title}
                className="bg-anclora-teal-bg/50 rounded-2xl p-6 border border-white/10"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-anclora-gold/10 flex items-center justify-center flex-shrink-0">
                    <type.icon className="w-6 h-6 text-anclora-gold" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display text-xl font-semibold text-anclora-cream">
                        {type.title}
                      </h3>
                      {type.required && (
                        <span className="text-xs font-mono uppercase tracking-wider bg-anclora-gold/20 text-anclora-gold px-2 py-1 rounded">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-anclora-text-muted mb-3">
                      {type.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {type.examples.map((example) => (
                        <span
                          key={example}
                          className="text-xs text-anclora-text-muted bg-white/5 px-3 py-1 rounded-full"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Information */}
          <div className="prose prose-invert prose-lg max-w-none">
            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              What Are Cookies?
            </h2>
            <p className="text-anclora-text-muted">
              Cookies are small text files that are stored on your device when you visit a website. 
              They are widely used to make websites work more efficiently and provide information 
              to the website owners.
            </p>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              How We Use Cookies
            </h2>
            <p className="text-anclora-text-muted">
              At Anclora Private Estates, we use cookies for the following purposes:
            </p>
            <ul className="text-anclora-text-muted space-y-2">
              <li>
                <strong className="text-anclora-cream">Essential functionality:</strong>{' '}
                To enable core website features like navigation and access to secure areas
              </li>
              <li>
                <strong className="text-anclora-cream">Performance and analytics:</strong>{' '}
                To understand how visitors interact with our website and improve user experience
              </li>
              <li>
                <strong className="text-anclora-cream">Marketing:</strong>{' '}
                To deliver personalized advertisements and measure their effectiveness
              </li>
              <li>
                <strong className="text-anclora-cream">Preferences:</strong>{' '}
                To remember your settings and preferences for future visits
              </li>
            </ul>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              Third-Party Cookies
            </h2>
            <p className="text-anclora-text-muted">
              We use services from the following third parties that may set cookies:
            </p>
            <ul className="text-anclora-text-muted space-y-2">
              <li>
                <strong className="text-anclora-cream">Google Analytics:</strong>{' '}
                Used to analyze website traffic and user behavior.{' '}
                <a 
                  href="https://policies.google.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-anclora-gold hover:underline"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <strong className="text-anclora-cream">Meta (Facebook/Instagram):</strong>{' '}
                Used for advertising and conversion tracking.{' '}
                <a 
                  href="https://www.facebook.com/privacy/policy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-anclora-gold hover:underline"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              Managing Your Cookie Preferences
            </h2>
            <p className="text-anclora-text-muted">
              You can manage your cookie preferences at any time by clicking the button below 
              or through the cookie banner that appears when you first visit our website.
            </p>
            <p className="text-anclora-text-muted">
              You can also control cookies through your browser settings:
            </p>
            <ul className="text-anclora-text-muted space-y-2">
              <li>
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-anclora-gold hover:underline">
                  Google Chrome
                </a>
              </li>
              <li>
                <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-anclora-gold hover:underline">
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-anclora-gold hover:underline">
                  Safari
                </a>
              </li>
              <li>
                <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-anclora-gold hover:underline">
                  Microsoft Edge
                </a>
              </li>
            </ul>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              Contact Us
            </h2>
            <p className="text-anclora-text-muted">
              If you have any questions about our Cookie Policy, please contact us at{' '}
              <a href="mailto:privacidad@ancloraprivateestates.com" className="text-anclora-gold hover:underline">
                privacidad@ancloraprivateestates.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

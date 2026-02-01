import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PrivacyPage() {
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
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-anclora-cream mb-4">
            Privacy Policy
          </h1>
          <p className="text-anclora-text-muted mb-12">
            Last updated: January 24, 2026
          </p>

          <div className="prose prose-invert prose-lg max-w-none">
            <div className="bg-anclora-teal-bg/50 rounded-2xl p-8 border border-white/10 mb-8">
              <p className="text-anclora-text-muted leading-relaxed m-0">
                At <strong className="text-anclora-cream">Anclora Private Estates S.L.</strong>, we take your personal data protection seriously. 
                In compliance with GDPR, we inform you that your data will be processed solely to manage your requests 
                and keep you informed about our luxury properties. We do not share data with third parties without your 
                express consent, except when legally required.
              </p>
              <p className="text-anclora-gold mt-4 mb-0">
                <strong>Rights:</strong> Access, rectification, deletion, and portability via{' '}
                <a href="mailto:privacy@ancloraprivateestates.com" className="underline">
                  privacy@ancloraprivateestates.com
                </a>
              </p>
            </div>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              1. Data Controller
            </h2>
            <p className="text-anclora-text-muted">
              <strong className="text-anclora-cream">Identity:</strong> Anclora Private Estates S.L.<br />
              <strong className="text-anclora-cream">NIF:</strong> B-XXXXXXXX<br />
              <strong className="text-anclora-cream">Address:</strong> Paseo del Borne, 15, 07012 Palma de Mallorca<br />
              <strong className="text-anclora-cream">Email:</strong>{' '}
              <a href="mailto:privacidad@ancloraprivateestates.com" className="text-anclora-gold hover:underline">
                privacidad@ancloraprivateestates.com
              </a><br />
              <strong className="text-anclora-cream">Phone:</strong> +34 971 000 000
            </p>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              2. Purposes of Processing
            </h2>
            
            <h3 className="font-display text-xl font-semibold text-anclora-cream mt-8 mb-3">
              2.1 Contact Forms
            </h3>
            <ul className="text-anclora-text-muted space-y-2">
              <li><strong className="text-anclora-cream">Purpose:</strong> Attend to inquiries about properties and services</li>
              <li><strong className="text-anclora-cream">Legal basis:</strong> Consent of the interested party (Art. 6.1.a GDPR)</li>
              <li><strong className="text-anclora-cream">Retention period:</strong> 24 months from last contact</li>
              <li><strong className="text-anclora-cream">Recipients:</strong> Data is not transferred to third parties except as required by law</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-anclora-cream mt-8 mb-3">
              2.2 Newsletter/Commercial Communications
            </h3>
            <ul className="text-anclora-text-muted space-y-2">
              <li><strong className="text-anclora-cream">Purpose:</strong> Sending information about properties, events, and news</li>
              <li><strong className="text-anclora-cream">Legal basis:</strong> Consent of the interested party (Art. 6.1.a GDPR)</li>
              <li><strong className="text-anclora-cream">Retention period:</strong> Until unsubscribe is requested</li>
              <li><strong className="text-anclora-cream">Recipients:</strong> Mailchimp (USA, Privacy Shield), n8n (EU)</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-anclora-cream mt-8 mb-3">
              2.3 Property Valuations
            </h3>
            <ul className="text-anclora-text-muted space-y-2">
              <li><strong className="text-anclora-cream">Purpose:</strong> Conducting indicative appraisals</li>
              <li><strong className="text-anclora-cream">Legal basis:</strong> Consent of the interested party</li>
              <li><strong className="text-anclora-cream">Retention period:</strong> 12 months</li>
              <li><strong className="text-anclora-cream">Recipients:</strong> Data is not transferred</li>
            </ul>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              3. Your Rights
            </h2>
            <p className="text-anclora-text-muted">
              Under GDPR, you have the right to:
            </p>
            <ul className="text-anclora-text-muted space-y-2">
              <li>✅ <strong className="text-anclora-cream">Access:</strong> Know what data we have about you</li>
              <li>✅ <strong className="text-anclora-cream">Rectification:</strong> Correct inaccurate data</li>
              <li>✅ <strong className="text-anclora-cream">Erasure:</strong> &quot;Right to be forgotten&quot; (with legal exceptions)</li>
              <li>✅ <strong className="text-anclora-cream">Restriction:</strong> Limit processing in certain cases</li>
              <li>✅ <strong className="text-anclora-cream">Portability:</strong> Receive your data in a structured format</li>
              <li>✅ <strong className="text-anclora-cream">Objection:</strong> Object to processing for marketing purposes</li>
              <li>✅ <strong className="text-anclora-cream">No automated decisions:</strong> We do not apply automated profiling</li>
            </ul>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              4. How to Exercise Your Rights
            </h2>
            <p className="text-anclora-text-muted">
              You can exercise your rights by contacting us:<br />
              📧 <a href="mailto:privacidad@ancloraprivateestates.com" className="text-anclora-gold hover:underline">
                privacidad@ancloraprivateestates.com
              </a><br />
              📬 Paseo del Borne, 15, 07012 Palma de Mallorca<br />
              (Please attach a copy of your ID/NIE/Passport)
            </p>
            <p className="text-anclora-text-muted">
              <strong className="text-anclora-cream">Response time:</strong> 1 month (extendable by 2 more months in complex cases)
            </p>
            <p className="text-anclora-text-muted">
              <strong className="text-anclora-cream">Right to complain:</strong>{' '}
              <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-anclora-gold hover:underline">
                Spanish Data Protection Agency (AEPD)
              </a>
            </p>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              5. Security Measures
            </h2>
            <p className="text-anclora-text-muted">
              We implement technical and organizational measures to protect your data:
            </p>
            <ul className="text-anclora-text-muted space-y-2">
              <li>🔒 SSL/TLS encryption on all communications</li>
              <li>🔐 Restricted access via strong passwords</li>
              <li>💾 Encrypted backups</li>
              <li>👥 Continuous staff training in data protection</li>
              <li>📋 Periodic security audits</li>
            </ul>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              6. International Transfers
            </h2>
            <p className="text-anclora-text-muted">
              We use third-party services that may involve transfers outside the EEA:
            </p>
            <ul className="text-anclora-text-muted space-y-2">
              <li><strong className="text-anclora-cream">Google Analytics (USA):</strong> European Commission Adequacy Decision</li>
              <li><strong className="text-anclora-cream">Mailchimp (USA):</strong> EU-approved Standard Contractual Clauses</li>
              <li><strong className="text-anclora-cream">Meta Pixel (USA):</strong> EU-US Adequacy Decision</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

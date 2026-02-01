import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TermsPage() {
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
            Terms & Conditions
          </h1>
          <p className="text-anclora-text-muted mb-12">
            Last updated: January 24, 2026
          </p>

          <div className="prose prose-invert prose-lg max-w-none">
            <div className="bg-anclora-teal-bg/50 rounded-2xl p-8 border border-white/10 mb-12">
              <p className="text-anclora-text-muted leading-relaxed m-0">
                By accessing and using <strong className="text-anclora-cream">www.ancloraprivateestates.com</strong> (the &quot;Website&quot;), 
                you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the Website.
              </p>
            </div>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-anclora-text-muted">
              By accessing and using www.ancloraprivateestates.com (the &quot;Website&quot;), you accept 
              to be bound by these Terms and Conditions. If you do not agree, please do not use the Website.
            </p>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              2. Permitted Use of the Website
            </h2>
            
            <h3 className="font-display text-xl font-semibold text-anclora-cream mt-8 mb-3">
              2.1 Personal and Non-Commercial Use
            </h3>
            <p className="text-anclora-text-muted">
              The Website is intended exclusively for your personal and non-commercial use.
            </p>
            <p className="text-anclora-text-muted">
              <strong className="text-anclora-cream">Permitted:</strong>
            </p>
            <ul className="text-anclora-text-muted space-y-2">
              <li>✅ Browse published properties</li>
              <li>✅ Contact Anclora to request information</li>
              <li>✅ Share links to specific properties</li>
            </ul>
            <p className="text-anclora-text-muted">
              <strong className="text-anclora-cream">Prohibited:</strong>
            </p>
            <ul className="text-anclora-text-muted space-y-2">
              <li>❌ Copy content without express authorization</li>
              <li>❌ Use scrapers, bots, or automated tools</li>
              <li>❌ Reproduce photographs for commercial purposes</li>
              <li>❌ Republish listings on other platforms</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-anclora-cream mt-8 mb-3">
              2.2 Intellectual Property
            </h3>
            <p className="text-anclora-text-muted">
              All content on the Website (texts, photographs, logos, designs) is the property 
              of Anclora Private Estates or third parties who have authorized its use.
            </p>
            <p className="text-anclora-text-muted">
              Unauthorized use may constitute copyright infringement and give rise to legal action.
            </p>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              3. Real Estate Intermediation Services
            </h2>

            <h3 className="font-display text-xl font-semibold text-anclora-cream mt-8 mb-3">
              3.1 Nature of the Service
            </h3>
            <p className="text-anclora-text-muted">
              Anclora Private Estates acts as a <strong className="text-anclora-cream">professional intermediary</strong> between:
            </p>
            <ul className="text-anclora-text-muted space-y-2">
              <li>Buyers/Tenants (Demand)</li>
              <li>Sellers/Owners/Developers (Supply)</li>
            </ul>
            <p className="text-anclora-text-muted">
              <strong className="text-anclora-cream">We are NOT:</strong>
            </p>
            <ul className="text-anclora-text-muted space-y-2">
              <li>❌ Owners of the published properties (unless expressly indicated)</li>
              <li>❌ Real estate developers (unless indicated as own projects)</li>
              <li>❌ Financial or tax advisors</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-anclora-cream mt-8 mb-3">
              3.2 Intermediation Fees
            </h3>
            <p className="text-anclora-text-muted">
              <strong className="text-anclora-cream">Standard commission:</strong> 3% + VAT on the sale price (payable by the buyer)<br />
              <strong className="text-anclora-cream">Exclusive properties commission:</strong> According to individual agreement with the seller
            </p>
            <p className="text-anclora-text-muted">
              The commission is earned:
            </p>
            <ul className="text-anclora-text-muted space-y-2">
              <li>When the purchase contract is signed (public deed)</li>
              <li>Or when the deposit/earnest money contract is formalized if so stipulated</li>
            </ul>
            <p className="text-anclora-text-muted">
              <strong className="text-anclora-cream">Special conditions:</strong>
            </p>
            <ul className="text-anclora-text-muted space-y-2">
              <li>Properties &gt; €5,000,000: Commission negotiable</li>
              <li>Partners/Brokers: See Partner Program</li>
            </ul>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              4. Property Information
            </h2>

            <h3 className="font-display text-xl font-semibold text-anclora-cream mt-8 mb-3">
              4.1 Accuracy of Information
            </h3>
            <p className="text-anclora-text-muted">
              We make reasonable efforts to ensure the accuracy of information, but:
            </p>
            <ul className="text-anclora-text-muted space-y-2">
              <li>⚠️ Descriptions, photographs, and plans are indicative</li>
              <li>⚠️ Prices are subject to change without prior notice</li>
              <li>⚠️ Areas are approximate (verify with official documentation)</li>
              <li>⚠️ Legal/urban status must be verified with the seller/notary</li>
            </ul>
            <p className="text-anclora-text-muted">
              <strong className="text-anclora-cream">We strongly recommend:</strong>
            </p>
            <ul className="text-anclora-text-muted space-y-2">
              <li>Complete legal due diligence</li>
              <li>Physical inspection of the property</li>
              <li>Cadastral and registry verification</li>
              <li>Consultation with an architect (if renovation/extension is planned)</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-anclora-cream mt-8 mb-3">
              4.2 Availability
            </h3>
            <p className="text-anclora-text-muted">
              Properties may have been sold, withdrawn, or had their price changed without 
              this information being immediately updated on the Website.
            </p>
            <p className="text-anclora-text-muted">
              Anclora Private Estates is not responsible for the unavailability of published properties.
            </p>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              5. Market Data and Investment
            </h2>
            <p className="text-anclora-text-muted">
              Market data, return estimates, and projections are for <strong className="text-anclora-cream">informational purposes only</strong>.
            </p>
            <p className="text-anclora-text-muted">
              <strong className="text-anclora-cream">This does NOT constitute:</strong>
            </p>
            <ul className="text-anclora-text-muted space-y-2">
              <li>❌ Investment advice</li>
              <li>❌ Guaranteed returns</li>
              <li>❌ Personalized recommendation</li>
            </ul>
            <p className="text-anclora-text-muted">
              <strong className="text-anclora-cream">Consult professional advisors before making investment decisions.</strong>
            </p>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              6. Anti-Money Laundering
            </h2>
            <p className="text-anclora-text-muted">
              Under Law 10/2010, of April 28, Anclora Private Estates is subject to anti-money 
              laundering obligations.
            </p>
            <p className="text-anclora-text-muted">
              <strong className="text-anclora-cream">This implies:</strong>
            </p>
            <ul className="text-anclora-text-muted space-y-2">
              <li>1. Customer identification and verification (KYC)</li>
              <li>2. Verification of fund origin in transactions &gt; €10,000</li>
              <li>3. Document retention for 10 years</li>
              <li>4. Possible communication to SEPBLAC of suspicious operations</li>
            </ul>
            <p className="text-anclora-text-muted">
              <strong className="text-anclora-cream">Required documentation:</strong>
            </p>
            <ul className="text-anclora-text-muted space-y-2">
              <li>Valid ID/NIE/Passport</li>
              <li>Proof of address (census, utility bill)</li>
              <li>Declaration of fund origin (if applicable)</li>
            </ul>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              7. Limitation of Liability
            </h2>
            <p className="text-anclora-text-muted">
              Anclora Private Estates is NOT responsible for:
            </p>
            <ul className="text-anclora-text-muted space-y-2">
              <li>❌ Errors or omissions in property descriptions</li>
              <li>❌ Hidden defects in properties</li>
              <li>❌ Contractual breaches by sellers/buyers</li>
              <li>❌ Financial losses from investment decisions</li>
              <li>❌ Service interruptions on the Website</li>
              <li>❌ Computer viruses or harmful elements</li>
            </ul>
            <p className="text-anclora-text-muted">
              <strong className="text-anclora-cream">Maximum liability:</strong> Limited to the fees actually received 
              by Anclora in the specific transaction that causes the damage.
            </p>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              8. Modifications
            </h2>
            <p className="text-anclora-text-muted">
              Anclora Private Estates reserves the right to modify these Terms and Conditions at any time.
            </p>
            <p className="text-anclora-text-muted">
              Substantial changes will be notified via:
            </p>
            <ul className="text-anclora-text-muted space-y-2">
              <li>Prominent notice on the Website</li>
              <li>Email to registered users</li>
            </ul>
            <p className="text-anclora-text-muted">
              Continued use of the Website after changes are published constitutes acceptance.
            </p>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              9. Dispute Resolution
            </h2>
            <h3 className="font-display text-xl font-semibold text-anclora-cream mt-8 mb-3">
              9.1 Prior Mediation
            </h3>
            <p className="text-anclora-text-muted">
              Before going to court, the parties agree to attempt to resolve any dispute through 
              mediation with the College of Real Estate Agents of the Balearic Islands.
            </p>

            <h3 className="font-display text-xl font-semibold text-anclora-cream mt-8 mb-3">
              9.2 Jurisdiction and Applicable Law
            </h3>
            <p className="text-anclora-text-muted">
              These Terms are governed by Spanish law. For any dispute, the parties submit to 
              the Courts and Tribunals of Palma de Mallorca, unless the law establishes a different 
              mandatory jurisdiction.
            </p>

            <h3 className="font-display text-xl font-semibold text-anclora-cream mt-8 mb-3">
              9.3 Online Dispute Resolution Platform (EU)
            </h3>
            <p className="text-anclora-text-muted">
              In accordance with Regulation (EU) 524/2013, consumers can access the European 
              online dispute resolution platform:{' '}
              <a 
                href="https://ec.europa.eu/consumers/odr/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-anclora-gold hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              10. Contact
            </h2>
            <p className="text-anclora-text-muted">
              For inquiries about these Terms and Conditions:
            </p>
            <p className="text-anclora-text-muted">
              📧 <a href="mailto:legal@ancloraprivateestates.com" className="text-anclora-gold hover:underline">
                legal@ancloraprivateestates.com
              </a><br />
              📞 +34 971 000 000<br />
              📬 Paseo del Borne, 15, 07012 Palma de Mallorca
            </p>

            <div className="bg-anclora-gold/10 rounded-2xl p-6 border border-anclora-gold/30 mt-12">
              <p className="text-anclora-cream m-0">
                <strong>By using the Website, you confirm that you have read, understood, and accepted these Terms and Conditions.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

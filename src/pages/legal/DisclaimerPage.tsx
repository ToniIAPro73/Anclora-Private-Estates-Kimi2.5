import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DisclaimerPage() {
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
            <AlertTriangle className="w-10 h-10 text-anclora-gold" />
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-anclora-cream">
              Legal Notice
            </h1>
          </div>
          <p className="text-anclora-text-muted mb-12">
            Last updated: January 24, 2026
          </p>

          <div className="prose prose-invert prose-lg max-w-none">
            <div className="bg-anclora-gold/10 rounded-2xl p-8 border border-anclora-gold/30 mb-12">
              <p className="text-anclora-cream leading-relaxed m-0">
                <strong>Important Notice:</strong> The information contained on this website is for 
                informational purposes only and does not constitute legal, tax, or investment advice. 
                Property photographs and renders may not exactly match reality. All prices are subject 
                to change without notice. Anclora Private Estates is not responsible for errors or 
                omissions in the published information. Please verify all information directly with 
                our agents before making any decisions.
              </p>
            </div>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              1. Identification of the Owner
            </h2>
            <p className="text-anclora-text-muted">
              In compliance with Article 10 of Law 34/2002, of July 11, on Information Society Services 
              and Electronic Commerce (LSSI-CE), the following information is provided:
            </p>
            <div className="bg-anclora-teal-bg/50 rounded-2xl p-6 border border-white/10 mt-6">
              <p className="text-anclora-text-muted m-0">
                <strong className="text-anclora-cream">Company name:</strong> Anclora Private Estates S.L.<br />
                <strong className="text-anclora-cream">NIF/CIF:</strong> B-XXXXXXXX<br />
                <strong className="text-anclora-cream">Registered office:</strong> Paseo del Borne, 15, 07012 Palma de Mallorca, Islas Baleares<br />
                <strong className="text-anclora-cream">Email:</strong>{' '}
                <a href="mailto:legal@ancloraprivateestates.com" className="text-anclora-gold hover:underline">
                  legal@ancloraprivateestates.com
                </a><br />
                <strong className="text-anclora-cream">Phone:</strong> +34 971 000 000<br />
                <strong className="text-anclora-cream">Registered in:</strong> Registro Mercantil de Palma de Mallorca, Tomo XXXX, Folio XX, Hoja PM-XXXXX<br />
                <strong className="text-anclora-cream">Activity:</strong> Real estate intermediation<br />
                <strong className="text-anclora-cream">Professional Association:</strong> Colegio de Agentes de la Propiedad Inmobiliaria de Baleares<br />
                <strong className="text-anclora-cream">API Member Number:</strong> XXXX
              </p>
            </div>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              2. Purpose and Scope
            </h2>
            <p className="text-anclora-text-muted">
              This Legal Notice regulates the use of the website www.ancloraprivateestates.com 
              (hereinafter, the &quot;Website&quot;), owned by Anclora Private Estates S.L.
            </p>
            <p className="text-anclora-text-muted">
              Browsing the Website confers the status of user and implies full and unreserved 
              acceptance of all provisions included in this Legal Notice.
            </p>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              3. Responsibility for Content
            </h2>
            <p className="text-anclora-text-muted">
              Anclora Private Estates reserves the right to modify, without prior notice, the 
              presentation, configuration, and content of the Website, as well as the conditions 
              required for its access and/or use.
            </p>
            <p className="text-anclora-text-muted">
              Photographs, renders, and property descriptions are for guidance only and may not 
              exactly match reality. We recommend verifying all information directly with our agents.
            </p>
            <p className="text-anclora-text-muted">
              Anclora Private Estates does NOT guarantee:
            </p>
            <ul className="text-anclora-text-muted space-y-2">
              <li>The accuracy, updating, completeness, or truthfulness of the content</li>
              <li>The absence of errors in such content</li>
              <li>The uninterrupted availability of the Website</li>
              <li>The absence of viruses, malware, or other harmful elements</li>
            </ul>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              4. Real Estate Property Information
            </h2>

            <h3 className="font-display text-xl font-semibold text-anclora-cream mt-8 mb-3">
              4.1 Prices
            </h3>
            <p className="text-anclora-text-muted">
              All published prices are subject to change without prior notice and must be confirmed 
              directly with Anclora Private Estates before any commitment.
            </p>
            <p className="text-anclora-text-muted">
              Prices do NOT include:
            </p>
            <ul className="text-anclora-text-muted space-y-2">
              <li>Applicable taxes (ITP, VAT as appropriate)</li>
              <li>Notary fees</li>
              <li>Property registration fees</li>
              <li>Administrative agency fees</li>
              <li>Other costs inherent to the purchase</li>
            </ul>
            <p className="text-anclora-text-muted">
              <strong className="text-anclora-cream">Estimated additional costs:</strong> 10-12% of the sale price.
            </p>

            <h3 className="font-display text-xl font-semibold text-anclora-cream mt-8 mb-3">
              4.2 Availability
            </h3>
            <p className="text-anclora-text-muted">
              Properties may have been sold, withdrawn from the market, or had their price modified 
              without this information being immediately updated on the Website.
            </p>
            <p className="text-anclora-text-muted">
              Anclora Private Estates is not responsible for the unavailability of published properties.
            </p>

            <h3 className="font-display text-xl font-semibold text-anclora-cream mt-8 mb-3">
              4.3 Certifications
            </h3>
            <p className="text-anclora-text-muted">
              All properties have a valid Energy Efficiency Certificate, available upon request in 
              accordance with Royal Decree 390/2021.
            </p>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              5. Role of Anclora Private Estates
            </h2>
            <p className="text-anclora-text-muted">
              Anclora Private Estates acts as a <strong className="text-anclora-cream">professional real estate intermediary</strong> between 
              buyers and sellers/developers.
            </p>
            <p className="text-anclora-text-muted">
              <strong className="text-anclora-cream">We are NOT:</strong>
            </p>
            <ul className="text-anclora-text-muted space-y-2">
              <li>❌ Regulated financial advisors (CNMV)</li>
              <li>❌ Wealth managers</li>
              <li>❌ Credit institutions</li>
              <li>❌ Tax advisors</li>
            </ul>
            <p className="text-anclora-text-muted">
              <strong className="text-anclora-cream">We DO offer:</strong>
            </p>
            <ul className="text-anclora-text-muted space-y-2">
              <li>✅ Professional intermediation in real estate transactions</li>
              <li>✅ Market information for guidance</li>
              <li>✅ Coordination with independent professionals (lawyers, notaries, agencies)</li>
            </ul>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              6. Market Data and Investment
            </h2>

            <h3 className="font-display text-xl font-semibold text-anclora-cream mt-8 mb-3">
              6.1 Nature of Information
            </h3>
            <p className="text-anclora-text-muted">
              Market data, return projections, and capital appreciation are for <strong className="text-anclora-cream">INFORMATIONAL PURPOSES ONLY</strong> and are based on:
            </p>
            <ul className="text-anclora-text-muted space-y-2">
              <li>Historical data from public and private sources</li>
              <li>Third-party reports (Idealista, Fotocasa, INE, etc.)</li>
              <li>Financial institution projections</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-anclora-cream mt-8 mb-3">
              6.2 Absence of Guarantees
            </h3>
            <div className="bg-anclora-gold/10 rounded-xl p-6 border border-anclora-gold/30">
              <p className="text-anclora-cream font-semibold m-0">
                PAST PERFORMANCE DOES NOT GUARANTEE FUTURE RESULTS.
              </p>
            </div>
            <p className="text-anclora-text-muted mt-4">
              Anclora Private Estates:
            </p>
            <ul className="text-anclora-text-muted space-y-2">
              <li>Does NOT guarantee any level of return</li>
              <li>Does NOT promise specific property revaluation</li>
              <li>Does NOT ensure liquidity of real estate assets</li>
              <li>Does NOT assume responsibility for losses from investments</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-anclora-cream mt-8 mb-3">
              6.3 Calculators and Tools
            </h3>
            <p className="text-anclora-text-muted">
              ROI, mortgage, and cost calculators are illustrative tools that use general parameters. 
              Results do NOT constitute personalized financial advice.
            </p>
            <p className="text-anclora-text-muted">
              <strong className="text-anclora-cream">Consult with independent tax, legal, and financial advisors before making any investment decision.</strong>
            </p>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              7. Intellectual and Industrial Property
            </h2>
            <p className="text-anclora-text-muted">
              All content on the Website (texts, photographs, graphics, images, technology, software, 
              links, graphic designs, source code, etc.) is the intellectual property of Anclora 
              Private Estates or third parties who have authorized its use.
            </p>
            <p className="text-anclora-text-muted">
              Prohibited:
            </p>
            <ul className="text-anclora-text-muted space-y-2">
              <li>The reproduction, distribution, or public communication of content</li>
              <li>The transformation or modification of content</li>
              <li>Commercial use without express authorization</li>
            </ul>
            <p className="text-anclora-text-muted">
              Property photographs are protected by copyright and/or are the property of the 
              owners/developers. Their use is limited to promotion on the Website.
            </p>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              8. Links to Third Parties
            </h2>
            <p className="text-anclora-text-muted">
              The Website may contain links to third-party websites. Anclora Private Estates does 
              not control or assume responsibility for the content, privacy policies, or practices 
              of such sites.
            </p>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              9. Disclaimer of Warranties and Liability
            </h2>
            <p className="text-anclora-text-muted">
              Anclora Private Estates is not responsible for:
            </p>
            <ul className="text-anclora-text-muted space-y-2">
              <li>Errors or omissions in the content</li>
              <li>Lack of availability of the Website</li>
              <li>Damages resulting from the use of the Website</li>
              <li>Computer viruses or harmful elements</li>
              <li>Improper use of the Website by users</li>
            </ul>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              10. Personal Data Protection
            </h2>
            <p className="text-anclora-text-muted">
              The processing of personal data is governed by our{' '}
              <Link to="/legal/privacidad" className="text-anclora-gold hover:underline">
                Privacy Policy
              </Link>.
            </p>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              11. Applicable Law and Jurisdiction
            </h2>
            <p className="text-anclora-text-muted">
              This Legal Notice is governed by Spanish law.
            </p>
            <p className="text-anclora-text-muted">
              For the resolution of any dispute arising from the use of the Website, the parties 
              submit to the Courts and Tribunals of Palma de Mallorca, expressly waiving any other 
              jurisdiction that may correspond to them.
            </p>

            <div className="border-t border-white/10 pt-8 mt-12">
              <p className="text-anclora-text-muted">
                <strong className="text-anclora-cream">For inquiries about this Legal Notice:</strong><br />
                📧 <a href="mailto:legal@ancloraprivateestates.com" className="text-anclora-gold hover:underline">
                  legal@ancloraprivateestates.com
                </a><br />
                📞 +34 971 000 000
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

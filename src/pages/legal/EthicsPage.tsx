import { ArrowLeft, Shield, CheckCircle, Leaf, Users, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const principles = [
  {
    icon: Shield,
    title: 'Transparency',
    description: 'We operate with complete openness in all our dealings. All property information is presented accurately, and we disclose all relevant details to our clients.',
  },
  {
    icon: CheckCircle,
    title: 'Integrity',
    description: 'We uphold the highest ethical standards in every transaction. Our recommendations are always based on our clients\' best interests, not commission potential.',
  },
  {
    icon: Lock,
    title: 'Absolute Confidentiality',
    description: 'We understand the privacy needs of UHNWI clients. All client information is treated with the strictest confidentiality and protected by robust security measures.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Development',
    description: 'We are committed to the sustainable development of the Balearic Islands. We promote properties that respect the environment and local communities.',
  },
  {
    icon: Users,
    title: 'Professional Excellence',
    description: 'We continuously invest in our team\'s training and development to maintain the highest standards of service in the luxury real estate sector.',
  },
];

export function EthicsPage() {
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
            Code of Ethics
          </h1>
          <p className="text-anclora-text-muted mb-12">
            The principles that guide everything we do
          </p>

          <div className="bg-anclora-teal-bg/50 rounded-2xl p-8 border border-white/10 mb-12">
            <p className="text-anclora-text-muted leading-relaxed m-0">
              Anclora&apos;s Code of Ethics is based on <strong className="text-anclora-cream">transparency</strong>,{' '}
              <strong className="text-anclora-cream">integrity</strong>, and{' '}
              <strong className="text-anclora-cream">absolute confidentiality</strong> (UHNWI). We are committed 
              to the sustainable development of the Balearic Islands and professional excellence in the 
              luxury real estate sector.
            </p>
          </div>

          {/* Principles */}
          <div className="grid gap-6 mb-12">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="bg-anclora-teal-bg/50 rounded-2xl p-6 border border-white/10"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-anclora-gold/10 flex items-center justify-center flex-shrink-0">
                    <principle.icon className="w-6 h-6 text-anclora-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-anclora-cream mb-2">
                      {principle.title}
                    </h3>
                    <p className="text-anclora-text-muted leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Commitments */}
          <div className="prose prose-invert prose-lg max-w-none">
            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              Our Commitments
            </h2>

            <h3 className="font-display text-xl font-semibold text-anclora-cream mt-8 mb-3">
              To Our Clients
            </h3>
            <ul className="text-anclora-text-muted space-y-2">
              <li>Provide accurate and complete property information</li>
              <li>Act in the client&apos;s best interest at all times</li>
              <li>Maintain strict confidentiality of all client data</li>
              <li>Disclose any potential conflicts of interest</li>
              <li>Provide professional advice based on market knowledge</li>
              <li>Respect client decisions without pressure</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-anclora-cream mt-8 mb-3">
              To Property Owners
            </h3>
            <ul className="text-anclora-text-muted space-y-2">
              <li>Market properties professionally and ethically</li>
              <li>Provide regular updates on marketing activities</li>
              <li>Qualify potential buyers thoroughly</li>
              <li>Protect the property during viewings</li>
              <li>Negotiate fairly on behalf of the owner</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-anclora-cream mt-8 mb-3">
              To the Community
            </h3>
            <ul className="text-anclora-text-muted space-y-2">
              <li>Respect and promote local culture and heritage</li>
              <li>Support sustainable development practices</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Contribute positively to the local economy</li>
              <li>Minimize environmental impact of our operations</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-anclora-cream mt-8 mb-3">
              To Our Profession
            </h3>
            <ul className="text-anclora-text-muted space-y-2">
              <li>Maintain high professional standards</li>
              <li>Continue education and professional development</li>
              <li>Collaborate fairly with other professionals</li>
              <li>Uphold the reputation of the real estate industry</li>
              <li>Comply with the code of conduct of the API College</li>
            </ul>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              Anti-Money Laundering Commitment
            </h2>
            <p className="text-anclora-text-muted">
              In compliance with Law 10/2010, of April 28, on the prevention of money laundering 
              and terrorist financing, Anclora Private Estates:
            </p>
            <ul className="text-anclora-text-muted space-y-2">
              <li>Identifies and verifies all clients (KYC)</li>
              <li>Verifies the origin of funds in transactions over €10,000</li>
              <li>Maintains documentation for 10 years</li>
              <li>Reports suspicious operations to SEPBLAC when required</li>
              <li>Trains all staff in AML procedures</li>
            </ul>

            <h2 className="font-display text-2xl font-semibold text-anclora-cream mt-12 mb-4">
              Complaints and Grievances
            </h2>
            <p className="text-anclora-text-muted">
              If you believe we have not met the standards set out in this Code of Ethics, 
              please contact us:
            </p>
            <p className="text-anclora-text-muted">
              📧 <a href="mailto:ethics@ancloraprivateestates.com" className="text-anclora-gold hover:underline">
                ethics@ancloraprivateestates.com
              </a><br />
              📞 +34 971 000 000<br />
              📬 Paseo del Borne, 15, 07012 Palma de Mallorca
            </p>
            <p className="text-anclora-text-muted">
              All complaints will be handled confidentially and addressed within 15 business days.
            </p>

            <div className="bg-anclora-gold/10 rounded-2xl p-6 border border-anclora-gold/30 mt-12">
              <p className="text-anclora-cream m-0">
                <strong>This Code of Ethics is binding on all Anclora Private Estates employees, 
                partners, and collaborators. Violations may result in disciplinary action, including 
                termination of employment or business relationships.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

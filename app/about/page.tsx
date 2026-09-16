import { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2, Shield, Calculator, Award, Users, BookOpen } from "lucide-react"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/about`

export const metadata: Metadata = {
  title: "About Us — Free, Accurate & Privacy-First Financial Calculators",
  description:
    "Learn about Loan Calculator's mission, our mathematical calculation standards, editorial guidelines, and commitment to providing 100% free financial and mathematical tools.",
  alternates: { canonical: PAGE_URL },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Loan Calculator",
    url: PAGE_URL,
    description: "About Loan Calculator, its mission, calculation accuracy, and editorial methodology.",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "About Us", item: PAGE_URL },
    ],
  },
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <JsonLd data={jsonLd} />

      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
          <Award className="w-3.5 h-3.5" /> About Loan Calculator
        </span>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Empowering Smarter Financial & Mathematical Decisions
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We build precision-engineered, free, and privacy-focused financial calculators to help individuals, investors, and homeowners make clear financial choices.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-card border border-border rounded-2xl p-8 mb-10 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Financial decisions — whether taking a ₹50 lakh home loan, calculating retirement corpus through SIPs, or estimating income tax — involve complex mathematical equations that lenders and brokers often make opaque.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          <strong>Loan Calculator</strong> was created with a straightforward goal: provide 100% transparent, mathematically verified, and ad-respectful calculation tools with zero paywalls, zero registration requirements, and zero data tracking.
        </p>
      </div>

      {/* Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-card border border-border rounded-xl">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
            <Calculator className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Mathematical Accuracy</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            All our algorithms follow standard banking amortization standards (reducing balance EMI formula, compound interest compounding frequencies, and official tax slabs).
          </p>
        </div>

        <div className="p-6 bg-card border border-border rounded-xl">
          <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center mb-4">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-lg mb-2">100% Client-Side Privacy</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your financial inputs, salary numbers, and loan amounts are computed entirely in your browser. We never save, store, or transmit your private financial parameters to any server.
          </p>
        </div>

        <div className="p-6 bg-card border border-border rounded-xl">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Independent & Unbiased</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We are not owned by any bank, lender, or NBFC. Our calculations and educational guides are neutral, unbiased, and designed solely to assist the user.
          </p>
        </div>
      </div>

      {/* Editorial & Verification Methodology */}
      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 mb-12">
        <h2 className="text-2xl font-bold">Calculation Methodology & Quality Standards</h2>
        <p className="text-muted-foreground leading-relaxed">
          Every tool on our platform is cross-referenced against authoritative benchmarks:
        </p>
        <ul className="space-y-2 text-muted-foreground text-sm">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span><strong>Loan & EMI Models:</strong> Formulated according to the standard reducing balance compounding formula used by major commercial banks worldwide.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span><strong>Tax & Retirement Formulas:</strong> Aligned with current Income Tax Department rules, EPFO gratuity equations, and PFRDA National Pension System regulations.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span><strong>Utility & Scientific Calculators:</strong> Utilizes standard IEEE-754 precision math with parsing libraries for algebraic and geometric correctness.</span>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8">Explore Our Free Tools</h2>
        <p className="text-muted-foreground leading-relaxed">
          We offer over 25+ calculators across loans, investments, taxes, health, and everyday utilities. Check out our popular tools:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 not-prose mt-4">
          <Link href="/home-loan" className="p-3 bg-muted/40 hover:bg-muted border border-border rounded-lg text-sm font-medium transition-colors text-center">
            Home Loan EMI
          </Link>
          <Link href="/sip" className="p-3 bg-muted/40 hover:bg-muted border border-border rounded-lg text-sm font-medium transition-colors text-center">
            SIP Calculator
          </Link>
          <Link href="/income-tax-calculator" className="p-3 bg-muted/40 hover:bg-muted border border-border rounded-lg text-sm font-medium transition-colors text-center">
            Income Tax
          </Link>
          <Link href="/gst-calculator" className="p-3 bg-muted/40 hover:bg-muted border border-border rounded-lg text-sm font-medium transition-colors text-center">
            GST Calculator
          </Link>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="p-6 bg-muted/30 border border-border rounded-xl text-center">
        <h3 className="font-semibold text-base mb-1">Have feedback or questions?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          We continually update our calculation algorithms and welcome suggestions from our community.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Contact Our Team
        </Link>
      </div>
    </div>
  )
}

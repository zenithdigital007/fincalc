import { Metadata } from "next"
import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/disclaimer`

export const metadata: Metadata = {
  title: "Disclaimer — Financial & Calculation Accuracy Notice",
  description:
    "Financial disclaimer for Loan Calculator. Important information regarding calculator outputs, estimates, and non-advisory status.",
  alternates: { canonical: PAGE_URL },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Financial Disclaimer",
    url: PAGE_URL,
    description: "Financial and calculation accuracy disclaimer for Loan Calculator.",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Disclaimer", item: PAGE_URL },
    ],
  },
]

export default function DisclaimerPage() {
  const lastUpdated = "September 16, 2025"

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <JsonLd data={jsonLd} />

      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-4">
          <AlertTriangle className="w-3.5 h-3.5" /> Important Notice
        </span>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Disclaimer</h1>
        <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 leading-relaxed text-muted-foreground">
        <section className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-2">General Educational Purpose Only</h2>
          <p className="text-sm">
            All content, computational tools, financial calculators, tax estimators, and guides published on <strong>Loan Calculator</strong> ({SITE_URL}) are provided solely for general educational, illustrative, and informational purposes. None of the materials on this site constitute formal banking, financial, investment, legal, or tax advisory services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">1. No Financial Advisor Relationship</h2>
          <p>
            Use of this website does not create any financial advisor-client or fiduciary relationship. Loan Calculator is an independent, computational platform and is not registered as an investment advisor with SEBI, SEC, RBI, or any state/national regulatory authority.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">2. Loan & EMI Calculation Variance</h2>
          <p className="mb-3">
            The results produced by our EMI calculators (Home Loan, Car Loan, Personal Loan) use standard reducing balance interest algorithms. However, actual bank quotes may differ slightly due to:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Bank-specific compounding frequencies and rounding conventions.</li>
            <li>Processing fees, document verification charges, and stamp duty.</li>
            <li>Lender-specific interest rate adjustments based on your credit (CIBIL/Experian) profile.</li>
            <li>Pre-EMI interest, loan disbursement tranches, and reset frequency on floating rates.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">3. Investment & Mutual Fund (SIP/SWP/Lumpsum) Estimates</h2>
          <p>
            Mutual fund investments and equity market returns are subject to market risks. The expected rates of return (CAGR) entered into SIP, SWP, and Lumpsum calculators are hypothetical assumptions. Historical performance is not indicative of future returns.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">4. Tax & Regulatory Calculations</h2>
          <p>
            Tax laws (including Income Tax Slabs, GST classifications, Section 80C, 80D, 24(b) deductions, and PPF interest rates) change periodically through government budgets and finance acts. While we update our algorithms frequently, users must verify current tax liabilities with a qualified Chartered Accountant (CA) or certified tax professional before filing tax returns.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">5. Questions & Feedback</h2>
          <p>
            If you have questions regarding our disclaimer or notice an equation discrepancy, please reach out through our <Link href="/contact" className="underline text-primary">Contact Page</Link>.
          </p>
        </section>
      </div>
    </div>
  )
}

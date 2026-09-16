import { Metadata } from "next"
import Link from "next/link"
import { FileText } from "lucide-react"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/terms`

export const metadata: Metadata = {
  title: "Terms and Conditions — Loan Calculator",
  description:
    "Terms and Conditions governing the use of the Loan Calculator website, tools, and content.",
  alternates: { canonical: PAGE_URL },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms and Conditions",
    url: PAGE_URL,
    description: "Terms and conditions of use for Loan Calculator.",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Terms & Conditions", item: PAGE_URL },
    ],
  },
]

export default function TermsPage() {
  const lastUpdated = "September 16, 2025"

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <JsonLd data={jsonLd} />

      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
          <FileText className="w-3.5 h-3.5" /> Legal Terms
        </span>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Terms and Conditions</h1>
        <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing or using <strong>Loan Calculator</strong> ({SITE_URL}), you agree to be bound by these Terms and Conditions and our <Link href="/privacy-policy" className="underline text-primary">Privacy Policy</Link>. If you disagree with any part of these terms, you may not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">2. Use License & Intellectual Property</h2>
          <p className="mb-3">
            Permission is granted to freely use our online calculators, financial algorithms, and educational articles for personal, educational, or internal business calculations.
          </p>
          <p className="mb-3">You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Scrape, duplicate, or redistribute the proprietary software code or design assets without prior written consent.</li>
            <li>Use the website in any way that causes damage to the website or impairs availability or accessibility.</li>
            <li>Engage in unauthorized data extraction, bot automation, or denial-of-service activities against the website.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">3. Not Financial Advice (Disclaimer of Advice)</h2>
          <p className="mb-3">
            The calculators, articles, comparison tables, and estimated returns provided on Loan Calculator are created for <strong>general educational and illustrative purposes only</strong>.
          </p>
          <p className="text-sm">
            They do not constitute certified financial, investment, legal, tax, or mortgage advice. Actual loan approvals, interest rates, tax liabilities, and investment returns will depend on lender terms, market fluctuations, and statutory changes. Always consult a certified financial planner, Chartered Accountant, or licensed banker for formal advice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">4. Accuracy of Information</h2>
          <p>
            While we strive to ensure that all financial formulas, compound interest schedules, and tax formulas are up-to-date and accurate, Loan Calculator makes no warranties regarding the absolute accuracy, completeness, or reliability of any calculation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">5. Third-Party Links & Advertisements</h2>
          <p>
            Our website may display advertisements served by third-party partners (such as Google AdSense) or link to external websites. We do not endorse or assume responsibility for the content, privacy policies, or practices of any third-party websites or advertisers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">6. Limitation of Liability</h2>
          <p>
            In no event shall Loan Calculator, its owners, or contributors be liable for any damages (including, without limitation, damages for loss of profit or financial losses) arising out of the use or inability to use the tools on this website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">7. Contact Us</h2>
          <p>
            If you have any questions regarding these Terms, please contact us via our <Link href="/contact" className="underline text-primary">Contact Page</Link>.
          </p>
        </section>
      </div>
    </div>
  )
}

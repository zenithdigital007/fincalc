import { Metadata } from "next"
import { CompoundInterestCalculatorClient } from "@/components/calculators/CompoundInterestCalculatorClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/compound-interest-calculator`

export const metadata: Metadata = {
  title: "Compound Interest Calculator — Calculate Daily, Monthly & Annual Compounding",
  description:
    "Free compound interest calculator. Calculate future balance, compound interest earned with daily, monthly, quarterly, semi-annual, and annual compounding frequencies.",
  keywords: [
    "compound interest calculator", "compound interest online", "interest on interest calculator",
    "monthly compounding calculator", "daily compound interest", "investment growth calculator",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Compound Interest Calculator — Calculate Returns Online Free",
    description: "Calculate compound interest with custom compounding frequencies and monthly additions. Free compound interest calculator.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Compound Interest Calculator" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Compound Interest Calculator",
    url: PAGE_URL,
    description: "Free compound interest calculator. Supports daily, monthly, quarterly, annual compounding.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Compound Interest?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Compound interest is interest calculated on the initial principal and also on the accumulated interest of previous periods. Often called 'interest on interest', it accelerates wealth accumulation exponentially.",
        },
      },
      {
        "@type": "Question",
        name: "What is the Compound Interest formula?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A = P(1 + r/n)^(nt), where A is the future amount, P is principal balance, r is the annual interest rate in decimal, n is the number of times interest compounds per year, and t is time in years.",
        },
      },
      {
        "@type": "Question",
        name: "What is the Rule of 72?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Rule of 72 is a quick estimation shortcut: Divide 72 by your annual interest rate to find the approximate number of years required to double your money. (e.g. at 12% interest, money doubles in 72/12 = 6 years).",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Compound Interest Calculator", item: PAGE_URL },
    ],
  },
]

export default function CompoundInterestPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Compound Interest Calculator</h1>
        <p className="text-lg text-muted-foreground">
          See how compound interest grows your investments over time with flexible compounding frequencies.
        </p>
      </div>

      <CompoundInterestCalculatorClient />
      <AdBanner adSlot="5007000001" adFormat="horizontal" label="Advertisement" className="mt-10" />

      {/* Rich Educational Content */}
      <section className="max-w-4xl mx-auto mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-6">The Mathematics of Compound Interest</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Albert Einstein famously referred to compound interest as the <em>&quot;eighth wonder of the world&quot;</em>. Unlike simple interest which only earns returns on the initial deposit, compound interest reinvests earned interest back into the principal.
        </p>

        <div className="bg-muted/50 border border-border rounded-xl p-6 mb-6 font-mono text-sm">
          A = P × [ 1 + ( r / n ) ] ^ ( n × t )
          <div className="mt-3 text-xs text-muted-foreground font-sans space-y-1">
            <p><strong>A</strong> = Final accumulated amount (Principal + Interest)</p>
            <p><strong>P</strong> = Initial Principal balance</p>
            <p><strong>r</strong> = Annual interest rate (in decimal, e.g., 8% = 0.08)</p>
            <p><strong>n</strong> = Compounding frequency per year (Daily=365, Monthly=12, Quarterly=4, Annually=1)</p>
            <p><strong>t</strong> = Number of years</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Impact of Compounding Frequency on ₹1,00,000 at 10% for 10 Years</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="text-left p-3 border border-border font-semibold">Compounding Frequency</th>
                <th className="text-left p-3 border border-border font-semibold">Times / Year (n)</th>
                <th className="text-left p-3 border border-border font-semibold">Total Interest Earned</th>
                <th className="text-left p-3 border border-border font-semibold">Final Maturity Amount</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Annual", "1", "₹1,59,374", "₹2,59,374"],
                ["Semi-Annual", "2", "₹1,65,330", "₹2,65,330"],
                ["Quarterly", "4", "₹1,68,506", "₹2,68,506"],
                ["Monthly", "12", "₹1,70,704", "₹2,70,704"],
                ["Daily", "365", "₹1,71,791", "₹2,71,791"],
              ].map(([freq, times, interest, finalAmt]) => (
                <tr key={freq} className="border-b border-border">
                  <td className="p-3 border border-border font-medium">{freq}</td>
                  <td className="p-3 border border-border font-mono">{times}</td>
                  <td className="p-3 border border-border text-green-600 dark:text-green-400 font-medium">{interest}</td>
                  <td className="p-3 border border-border font-semibold">{finalAmt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6 mb-8">
          {[
            {
              q: "How does inflation affect compound interest?",
              a: "To measure your real purchasing power growth, subtract the inflation rate from your nominal return rate: Real Rate = Nominal Return - Inflation Rate.",
            },
            {
              q: "Which accounts offer compound interest?",
              a: "Fixed Deposits (quarterly compounding), Public Provident Fund (annual compounding), Mutual Funds (continuous compounding via NAV growth), and National Pension System.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="border-b border-border pb-6 last:border-0">
              <h3 className="font-semibold mb-2 text-base">{q}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

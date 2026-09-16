import { Metadata } from "next"
import { SWPCalculatorClient } from "@/components/calculators/SWPCalculatorClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/swp-calculator`

export const metadata: Metadata = {
  title: "SWP Calculator — Systematic Withdrawal Plan Returns & Monthly Income",
  description:
    "Free online SWP (Systematic Withdrawal Plan) Calculator. Calculate regular monthly cash payouts, total amount withdrawn, and remaining mutual fund portfolio balance.",
  keywords: [
    "SWP calculator", "systematic withdrawal plan calculator", "mutual fund monthly income calculator",
    "calculate SWP returns", "SWP vs dividend", "pension SWP calculator",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "SWP Calculator — Calculate Regular Monthly Income from Mutual Funds",
    description: "Calculate monthly SWP cashflows and remaining mutual fund corpus. Free SWP calculator.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "SWP Calculator" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SWP Calculator",
    url: PAGE_URL,
    description: "Free Systematic Withdrawal Plan (SWP) calculator for mutual funds.",
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
        name: "What is an SWP (Systematic Withdrawal Plan)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An SWP allows you to withdraw a fixed predetermined sum of money from your mutual fund investments on a monthly or quarterly basis, while the remaining balance continues to generate market returns.",
        },
      },
      {
        "@type": "Question",
        name: "Why is SWP more tax-efficient than Mutual Fund Dividends or Fixed Deposit Interest?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In an SWP, each withdrawal consists of both principal and capital gains. You only pay tax on the capital gains component, not the entire withdrawn amount, which makes it far more tax-efficient than interest income taxed at slab rates.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "SWP Calculator", item: PAGE_URL },
    ],
  },
]

export default function SwpPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">SWP Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Calculate monthly income from your mutual fund investments and project your remaining corpus.
        </p>
      </div>

      <SWPCalculatorClient />
      <AdBanner adSlot="5014000001" adFormat="horizontal" label="Advertisement" className="mt-10" />

      {/* Rich Educational Content */}
      <section className="max-w-4xl mx-auto mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-6">How a Systematic Withdrawal Plan (SWP) Works</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          An SWP acts as the reverse of a SIP. Instead of depositing money monthly, you redeem a specified amount periodically. It is widely considered the ideal tool for retirees and individuals seeking regular passive cashflow.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            { title: "Regular Cashflow", desc: "Create a predictable monthly salary-like income stream directly into your bank account." },
            { title: "Portfolio Longevity", desc: "If your withdrawal rate (e.g. 6% p.a.) is lower than your portfolio return (e.g. 10% p.a.), your principal continues to expand." },
            { title: "Tax Efficiency", desc: "Only the capital gain proportion of each redemption is taxable, unlike FD interest which is taxed 100% at your highest tax slab." },
            { title: "Full Liquidity", desc: "Unlike traditional annuities, you retain 100% ownership and can stop, increase, or withdraw the entire lump sum anytime." },
          ].map(({ title, desc }) => (
            <div key={title} className="p-5 bg-card border border-border rounded-xl">
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6 mb-8">
          {[
            {
              q: "What is a safe withdrawal rate for an SWP?",
              a: "Financial planners recommend a withdrawal rate of 5% to 7% per annum from a balanced or hybrid mutual fund portfolio to ensure the corpus lasts indefinitely.",
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

import { Metadata } from "next"
import { SimpleInterestCalculatorClient } from "@/components/calculators/SimpleInterestCalculatorClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/simple-interest-calculator`

export const metadata: Metadata = {
  title: "Simple Interest Calculator — Calculate SI, Total Amount & Interest Rate",
  description:
    "Free simple interest calculator. Calculate simple interest (SI), total maturity amount, principal or interest rate with step-by-step formula breakdown.",
  keywords: [
    "simple interest calculator", "SI calculator", "calculate simple interest online",
    "simple interest formula", "principal rate time calculator",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Simple Interest Calculator — Calculate SI & Maturity Amount Online",
    description: "Calculate simple interest and maturity amount easily. Free simple interest calculator.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Simple Interest Calculator" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Simple Interest Calculator",
    url: PAGE_URL,
    description: "Free simple interest calculator. Calculate SI = (P × R × T) / 100.",
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
        name: "What is Simple Interest?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Simple interest is a quick method of calculating interest charged or earned on a principal sum. Unlike compound interest, interest does not compound over periods.",
        },
      },
      {
        "@type": "Question",
        name: "What is the Simple Interest formula?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SI = (P × R × T) / 100, where P is the Principal Amount, R is the Annual Rate of Interest (in %), and T is the Time Period in years.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Simple Interest Calculator", item: PAGE_URL },
    ],
  },
]

export default function SimpleInterestPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Simple Interest Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Calculate simple interest, interest payout, and total amount quickly and accurately.
        </p>
      </div>

      <SimpleInterestCalculatorClient />
      <AdBanner adSlot="5008000001" adFormat="horizontal" label="Advertisement" className="mt-10" />

      {/* Rich Educational Content */}
      <section className="max-w-4xl mx-auto mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-6">How Simple Interest is Calculated</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Simple interest is determined by multiplying the daily interest rate by the principal by the number of days or years elapsed between payments.
        </p>

        <div className="bg-muted/50 border border-border rounded-xl p-6 mb-6 font-mono text-sm">
          SI = ( P × R × T ) / 100
          <div className="mt-3 text-xs text-muted-foreground font-sans space-y-1">
            <p><strong>P</strong> = Principal sum of money</p>
            <p><strong>R</strong> = Annual interest rate (%)</p>
            <p><strong>T</strong> = Time period in years</p>
            <p><strong>Total Amount</strong> = Principal + SI</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Simple Interest vs Compound Interest</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="text-left p-3 border border-border font-semibold">Feature</th>
                <th className="text-left p-3 border border-border font-semibold">Simple Interest</th>
                <th className="text-left p-3 border border-border font-semibold">Compound Interest</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Principal", "Remains constant throughout tenure", "Increases every period as interest is added"],
                ["Interest Growth", "Linear / Constant every year", "Exponential growth over time"],
                ["Where Used", "Short-term loans, auto loans, consumer credit", "Fixed deposits, savings accounts, mutual funds"],
              ].map(([feature, si, ci]) => (
                <tr key={feature} className="border-b border-border">
                  <td className="p-3 border border-border font-medium">{feature}</td>
                  <td className="p-3 border border-border text-muted-foreground">{si}</td>
                  <td className="p-3 border border-border font-medium">{ci}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6 mb-8">
          {[
            {
              q: "How do you calculate simple interest when time is given in months or days?",
              a: "Convert months into years by dividing by 12 (e.g. 6 months = 6/12 = 0.5 years). For days, divide by 365 (e.g. 73 days = 73/365 = 0.2 years).",
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

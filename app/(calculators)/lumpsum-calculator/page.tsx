import { Metadata } from "next"
import { LumpsumCalculatorClient } from "@/components/calculators/LumpsumCalculatorClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/lumpsum-calculator`

export const metadata: Metadata = {
  title: "Lumpsum Calculator — Calculate One-Time Mutual Fund Returns",
  description:
    "Free online Lumpsum Calculator. Calculate future maturity value and wealth gains from one-time lump sum mutual fund investments with compounding returns.",
  keywords: [
    "lumpsum calculator", "one time mutual fund investment calculator", "lumpsum return calculator",
    "calculate lumpsum returns India", "mutual fund lumpsum growth",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Lumpsum Calculator — Calculate One-Time Mutual Fund Returns",
    description: "Calculate maturity returns on one-time mutual fund investments. Free lumpsum calculator.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Lumpsum Calculator" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Lumpsum Calculator",
    url: PAGE_URL,
    description: "Free Lumpsum Calculator. Calculate compound return on one-time investments.",
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
        name: "How is Lumpsum investment return calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Lumpsum returns use the compound interest formula: Maturity Value = P × (1 + r)^n, where P is the initial one-time deposit, r is the expected annual return rate, and n is the investment period in years.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Lumpsum Calculator", item: PAGE_URL },
    ],
  },
]

export default function LumpsumPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Lumpsum Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Calculate the future value of your one-time mutual fund or equity investment.
        </p>
      </div>

      <LumpsumCalculatorClient />
      <AdBanner adSlot="5015000001" adFormat="horizontal" label="Advertisement" className="mt-10" />

      {/* Rich Educational Content */}
      <section className="max-w-4xl mx-auto mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-6">How Lumpsum Returns are Calculated</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A lumpsum investment involves deploying a substantial capital amount in one single transaction. The entire principal remains invested for the full tenure, compounding continuously.
        </p>

        <div className="bg-muted/50 border border-border rounded-xl p-6 mb-6 font-mono text-sm">
          A = P × ( 1 + r ) ⁿ
          <div className="mt-3 text-xs text-muted-foreground font-sans space-y-1">
            <p><strong>A</strong> = Estimated maturity value</p>
            <p><strong>P</strong> = One-time lump sum amount invested (₹)</p>
            <p><strong>r</strong> = Expected annual rate of return (%)</p>
            <p><strong>n</strong> = Number of investment years</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6 mb-8">
          {[
            {
              q: "When is the best time to invest a lump sum in mutual funds?",
              a: "Lump sum investments yield optimal returns during market corrections or fair valuations. If the market is at all-time highs, investors often choose a Systematic Transfer Plan (STP) from a liquid fund to equity funds over 6–12 months.",
            },
            {
              q: "How are lumpsum equity mutual fund profits taxed?",
              a: "Gains realized within 1 year are taxed at 20% (STCG). Gains held for over 1 year are taxed at 12.5% (LTCG) on profits exceeding ₹1.25 lakh per financial year.",
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

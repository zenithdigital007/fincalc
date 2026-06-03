import { Metadata } from "next"
import { SWPCalculatorClient } from "@/components/calculators/SWPCalculatorClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/swp-calculator`

export const metadata: Metadata = {
  title: "SWP Calculator — Systematic Withdrawal Plan Calculator Online Free",
  description:
    "Calculate how long your mutual fund corpus will last with monthly withdrawals using SWP. Free Systematic Withdrawal Plan calculator — enter corpus, withdrawal amount, and expected returns.",
  keywords: [
    "SWP calculator", "systematic withdrawal plan calculator", "SWP mutual fund calculator",
    "SWP return calculator India", "how long will my corpus last", "monthly withdrawal calculator",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "SWP Calculator — Systematic Withdrawal Plan Calculator",
    description: "Calculate how long your corpus lasts under SWP. Free systematic withdrawal plan calculator.",
    url: PAGE_URL, type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "SWP Calculator" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org", "@type": "WebApplication",
    name: "SWP Calculator", url: PAGE_URL,
    description: "Free SWP calculator. Calculate how long your mutual fund corpus lasts under systematic withdrawal.",
    applicationCategory: "FinanceApplication", operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question", name: "What is SWP (Systematic Withdrawal Plan)?",
        acceptedAnswer: { "@type": "Answer", text: "SWP (Systematic Withdrawal Plan) allows investors to withdraw a fixed amount from their mutual fund investment at regular intervals (usually monthly). The remaining corpus continues to earn returns. SWP is popular as a retirement income strategy." },
      },
      {
        "@type": "Question", name: "Is SWP better than FD for retirement income?",
        acceptedAnswer: { "@type": "Answer", text: "SWP from an equity mutual fund often gives better post-tax returns than FD interest over the long term, since equity LTCG (above ₹1L) is taxed at only 12.5%, vs FD interest taxed at your income tax slab rate. However, SWP returns are market-linked and not guaranteed like FD." },
      },
    ],
  },
  {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "SWP Calculator", item: PAGE_URL },
    ],
  },
]

export default function SWPPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">SWP Calculator</h1>
        <p className="text-lg text-muted-foreground">
          See how long your mutual fund corpus will last with a Systematic Withdrawal Plan. Ideal for retirement planning.
        </p>
      </div>
      <SWPCalculatorClient />
      <AdBanner adSlot="5019000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
    </div>
  )
}

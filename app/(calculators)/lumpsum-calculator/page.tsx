import { Metadata } from "next"
import { LumpsumCalculatorClient } from "@/components/calculators/LumpsumCalculatorClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/lumpsum-calculator`

export const metadata: Metadata = {
  title: "Lumpsum Calculator — One-Time Investment Returns Calculator Online Free",
  description:
    "Calculate returns on a one-time lumpsum investment in mutual funds or stocks. Enter your investment amount, expected return rate, and tenure to see wealth created. Free lumpsum investment calculator.",
  keywords: [
    "lumpsum calculator", "lumpsum investment calculator", "lumpsum mutual fund calculator",
    "one time investment calculator", "lumpsum return calculator India", "lumpsum SIP calculator",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Lumpsum Calculator — One-Time Investment Returns Calculator",
    description: "Calculate how a one-time investment grows over time. Free lumpsum calculator for mutual funds and stocks.",
    url: PAGE_URL, type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Lumpsum Calculator" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org", "@type": "WebApplication",
    name: "Lumpsum Calculator", url: PAGE_URL,
    description: "Free lumpsum calculator. Calculate one-time investment returns for mutual funds.",
    applicationCategory: "FinanceApplication", operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question", name: "What is a lumpsum investment?",
        acceptedAnswer: { "@type": "Answer", text: "A lumpsum investment is a one-time, single payment invested at once (unlike SIP which invests periodically). Lumpsum investments benefit from full exposure to market growth from day one. Ideal when you have a large amount to invest, such as a bonus, inheritance, or maturity proceeds." },
      },
      {
        "@type": "Question", name: "Lumpsum vs SIP — which is better?",
        acceptedAnswer: { "@type": "Answer", text: "If markets are at a low point, lumpsum beats SIP. If markets are volatile or at a high, SIP is safer as it averages out the cost. For regular investors without large idle funds, SIP is more practical. For a large corpus (e.g., from bonus or inheritance), lumpsum in a diversified fund can work well." },
      },
    ],
  },
  {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
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
          See how a one-time investment grows over time. Perfect for planning bonus investments, windfall gains, or large savings.
        </p>
      </div>
      <LumpsumCalculatorClient />
      <AdBanner adSlot="5020000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
    </div>
  )
}

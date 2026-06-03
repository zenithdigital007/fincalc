import { Metadata } from "next"
import { NPSCalculatorClient } from "@/components/calculators/NPSCalculatorClient"
import { NewsSection } from "@/components/shared/NewsSection"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/nps-calculator`

export const metadata: Metadata = {
  title: "NPS Calculator — National Pension Scheme Corpus & Pension Calculator",
  description:
    "Calculate your NPS corpus, lump sum payout, and estimated monthly pension at retirement. Free National Pension Scheme calculator for Tier-I subscribers in India.",
  keywords: [
    "NPS calculator", "national pension scheme calculator", "NPS corpus calculator",
    "NPS pension calculator India", "NPS retirement calculator", "Tier 1 NPS calculator",
    "NPS monthly pension calculator", "NPS return calculator",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "NPS Calculator — National Pension Scheme Corpus & Pension",
    description: "Calculate your NPS corpus and estimated monthly pension at retirement. Free NPS calculator India.",
    url: PAGE_URL, type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "NPS Calculator" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org", "@type": "WebApplication",
    name: "NPS Calculator", url: PAGE_URL,
    description: "Free NPS calculator. Calculate National Pension Scheme corpus and monthly pension.",
    applicationCategory: "FinanceApplication", operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question", name: "What is NPS and who can invest?",
        acceptedAnswer: { "@type": "Answer", text: "NPS (National Pension System) is a government-backed retirement savings scheme open to all Indian citizens aged 18-65. It offers market-linked returns with exposure to equity, corporate bonds, and government securities. NPS has two tiers: Tier-I (retirement account with tax benefits) and Tier-II (flexible savings account)." },
      },
      {
        "@type": "Question", name: "What is the minimum NPS contribution?",
        acceptedAnswer: { "@type": "Answer", text: "The minimum NPS Tier-I contribution is ₹500 per month or ₹6,000 per year. There is no maximum limit. Contributions up to ₹1.5 lakh qualify for deduction under Section 80CCD(1), and an additional ₹50,000 deduction is available under Section 80CCD(1B)." },
      },
      {
        "@type": "Question", name: "What happens to my NPS at retirement?",
        acceptedAnswer: { "@type": "Answer", text: "At retirement (age 60), you must use at least 40% of your NPS corpus to purchase an annuity plan that pays you a monthly pension. The remaining 60% can be withdrawn as a lump sum, which is fully tax-free." },
      },
    ],
  },
  {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "NPS Calculator", item: PAGE_URL },
    ],
  },
]

export default function NPSPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">NPS Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Estimate your National Pension Scheme corpus, lump-sum payout, and monthly pension at retirement.
        </p>
      </div>
      <NPSCalculatorClient />
      <AdBanner adSlot="5016000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
      <div className="max-w-6xl mx-auto">
        <NewsSection topic="NPS national pension scheme retirement PFRDA India" title="Retirement & Pension News" adSlot="5016000002" />
      </div>
    </div>
  )
}

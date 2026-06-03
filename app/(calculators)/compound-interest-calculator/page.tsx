import { Metadata } from "next"
import { CompoundInterestCalculatorClient } from "@/components/calculators/CompoundInterestCalculatorClient"
import { NewsSection } from "@/components/shared/NewsSection"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/compound-interest-calculator`

export const metadata: Metadata = {
  title: "Compound Interest Calculator — Calculate CI Online Free",
  description:
    "Calculate compound interest on any investment instantly. Choose compounding frequency — annual, semi-annual, quarterly, or monthly. Free compound interest calculator with formula.",
  keywords: [
    "compound interest calculator", "compound interest formula", "CI calculator",
    "compound interest calculator India", "quarterly compounding calculator",
    "monthly compounding interest", "annual compound interest",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Compound Interest Calculator — Free Online CI Calculator",
    description: "Calculate compound interest with any compounding frequency. See total amount and interest earned instantly.",
    url: PAGE_URL, type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Compound Interest Calculator" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org", "@type": "WebApplication",
    name: "Compound Interest Calculator", url: PAGE_URL,
    description: "Free compound interest calculator with multiple compounding frequencies.",
    applicationCategory: "FinanceApplication", operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question", name: "What is the formula for compound interest?",
        acceptedAnswer: { "@type": "Answer", text: "A = P × (1 + r/n)^(n×t), where P = Principal, r = Annual interest rate (decimal), n = Compounding frequency per year (1=annually, 4=quarterly, 12=monthly), t = Time in years, A = Final amount. Interest earned = A - P." },
      },
      {
        "@type": "Question", name: "Which compounding frequency gives the highest return?",
        acceptedAnswer: { "@type": "Answer", text: "More frequent compounding gives higher returns. Monthly compounding > Quarterly > Semi-annual > Annual. The difference is significant over long periods. For example, ₹1 lakh at 10% for 10 years: Annual = ₹2.59L, Monthly = ₹2.70L." },
      },
    ],
  },
  {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
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
          Calculate the power of compounding on your savings or investments. Choose annual, semi-annual, quarterly, or monthly compounding.
        </p>
      </div>
      <CompoundInterestCalculatorClient />
      <AdBanner adSlot="5013000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
      <div className="max-w-6xl mx-auto">
        <NewsSection topic="compound interest investment savings fixed deposit returns India" title="Savings & Investment News" adSlot="5013000002" />
      </div>
    </div>
  )
}

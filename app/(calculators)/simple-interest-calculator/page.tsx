import { Metadata } from "next"
import { SimpleInterestCalculatorClient } from "@/components/calculators/SimpleInterestCalculatorClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/simple-interest-calculator`

export const metadata: Metadata = {
  title: "Simple Interest Calculator — Calculate SI Online Free",
  description:
    "Calculate simple interest using the formula SI = PRT/100. Enter principal, rate, and time to instantly get interest and total amount. Free simple interest calculator.",
  keywords: [
    "simple interest calculator", "SI calculator", "simple interest formula",
    "P R T calculator", "calculate simple interest online", "interest calculator",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Simple Interest Calculator — Free Online SI Calculator",
    description: "Calculate simple interest using P×R×T/100. Get instant results with our free simple interest calculator.",
    url: PAGE_URL, type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Simple Interest Calculator" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org", "@type": "WebApplication",
    name: "Simple Interest Calculator", url: PAGE_URL,
    description: "Free simple interest calculator. Calculate SI using the P×R×T/100 formula.",
    applicationCategory: "FinanceApplication", operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question", name: "What is the simple interest formula?",
        acceptedAnswer: { "@type": "Answer", text: "Simple Interest (SI) = (P × R × T) / 100, where P = Principal amount, R = Annual rate of interest (%), T = Time period in years. Total Amount = P + SI." },
      },
      {
        "@type": "Question", name: "What is the difference between simple interest and compound interest?",
        acceptedAnswer: { "@type": "Answer", text: "Simple interest is calculated only on the principal amount throughout the loan/investment tenure. Compound interest is calculated on the principal plus accumulated interest. Compound interest grows faster than simple interest over time." },
      },
    ],
  },
  {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
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
          Calculate interest and total amount using the simple interest formula: SI = (P × R × T) / 100.
        </p>
      </div>
      <SimpleInterestCalculatorClient />
      <AdBanner adSlot="5014000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
    </div>
  )
}

import { Metadata } from "next"
import { PercentageCalculatorClient } from "@/components/calculators/PercentageCalculatorClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/percentage-calculator`

export const metadata: Metadata = {
  title: "Percentage Calculator — Calculate % of Number, % Change, % Increase Online",
  description:
    "Free percentage calculator. Calculate percentage of a number, what percent X is of Y, percentage change, increase or decrease by percent. 5 types of percentage calculations in one tool.",
  keywords: [
    "percentage calculator", "percentage calculator online", "percent of number calculator",
    "percentage change calculator", "percent increase calculator", "percent decrease calculator",
    "what percent is X of Y", "calculate percentage India",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Percentage Calculator — 5 Types of % Calculations Online Free",
    description: "Calculate percentage of a number, % change, % increase, % decrease, and more. Free percentage calculator.",
    url: PAGE_URL, type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Percentage Calculator" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org", "@type": "WebApplication",
    name: "Percentage Calculator", url: PAGE_URL,
    description: "Free percentage calculator. 5 calculation modes: % of, what %, % change, increase, decrease.",
    applicationCategory: "UtilityApplication", operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Percentage Calculator", item: PAGE_URL },
    ],
  },
]

export default function PercentagePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Percentage Calculator</h1>
        <p className="text-lg text-muted-foreground">
          5 calculation modes: find % of a number, what % is X of Y, % change, % increase, and % decrease.
        </p>
      </div>
      <PercentageCalculatorClient />
      <AdBanner adSlot="5023000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
    </div>
  )
}

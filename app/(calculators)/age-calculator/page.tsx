import { Metadata } from "next"
import { AgeCalculatorClient } from "@/components/calculators/AgeCalculatorClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/age-calculator`

export const metadata: Metadata = {
  title: "Age Calculator — Calculate Your Exact Age Online Free",
  description:
    "Calculate your exact age in years, months, days, weeks, hours, and minutes. Find out days until your next birthday. Free online age calculator — enter your date of birth for instant results.",
  keywords: [
    "age calculator", "age calculator online", "calculate age from date of birth",
    "exact age calculator", "date of birth age calculator", "age in days calculator",
    "age in months calculator", "birthday countdown calculator",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Age Calculator — Calculate Your Exact Age Online Free",
    description: "Find your exact age in years, months, days, and even minutes. Plus countdown to your next birthday!",
    url: PAGE_URL, type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Age Calculator" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org", "@type": "WebApplication",
    name: "Age Calculator", url: PAGE_URL,
    description: "Free age calculator. Calculate exact age in years, months, days, weeks, and hours from date of birth.",
    applicationCategory: "UtilityApplication", operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Age Calculator", item: PAGE_URL },
    ],
  },
]

export default function AgePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Age Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Find your exact age in years, months, days, weeks, and hours — plus a countdown to your next birthday.
        </p>
      </div>
      <AgeCalculatorClient />
      <AdBanner adSlot="5022000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
    </div>
  )
}

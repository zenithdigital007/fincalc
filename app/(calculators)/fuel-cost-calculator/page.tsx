import { Metadata } from "next"
import { FuelCostCalculatorClient } from "@/components/calculators/FuelCostCalculatorClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/fuel-cost-calculator`

export const metadata: Metadata = {
  title: "Fuel Cost Calculator — Petrol & Diesel Trip Cost Calculator India",
  description:
    "Calculate petrol or diesel cost for any road trip. Enter distance, vehicle mileage, and fuel price to get total fuel needed and trip cost. Free fuel cost calculator India.",
  keywords: [
    "fuel cost calculator", "petrol cost calculator India", "diesel cost calculator",
    "trip fuel cost calculator", "road trip fuel calculator", "fuel calculator km",
    "mileage calculator India", "travel cost calculator",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Fuel Cost Calculator — Trip Petrol & Diesel Cost Calculator",
    description: "Calculate fuel cost for any road trip. Enter distance, mileage, and fuel price for instant results.",
    url: PAGE_URL, type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Fuel Cost Calculator India" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org", "@type": "WebApplication",
    name: "Fuel Cost Calculator", url: PAGE_URL,
    description: "Free fuel cost calculator for road trips in India. Calculate petrol and diesel costs.",
    applicationCategory: "UtilityApplication", operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Fuel Cost Calculator", item: PAGE_URL },
    ],
  },
]

export default function FuelCostPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Fuel Cost Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Estimate your trip's petrol or diesel cost. Enter distance, vehicle mileage, and current fuel price for instant results.
        </p>
      </div>
      <FuelCostCalculatorClient />
      <AdBanner adSlot="5025000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
    </div>
  )
}

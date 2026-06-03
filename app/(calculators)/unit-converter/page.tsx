import { Metadata } from "next"
import { UnitConverterClient } from "@/components/calculators/UnitConverterClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/unit-converter`

export const metadata: Metadata = {
  title: "Unit Converter — Convert Length, Weight, Temperature, Area & More Online Free",
  description:
    "Free unit converter for length, weight, temperature, area, volume, and speed. Convert km to miles, kg to pounds, Celsius to Fahrenheit, litres to gallons, and more instantly.",
  keywords: [
    "unit converter", "length converter", "weight converter", "temperature converter",
    "km to miles", "kg to pounds", "Celsius to Fahrenheit", "unit converter online",
    "metric to imperial converter", "area converter", "volume converter", "speed converter",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Unit Converter — Length, Weight, Temperature & More",
    description: "Convert between length, weight, temperature, area, volume, and speed units instantly. Free online unit converter.",
    url: PAGE_URL, type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Unit Converter Online" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org", "@type": "WebApplication",
    name: "Unit Converter", url: PAGE_URL,
    description: "Free online unit converter. Convert length, weight, temperature, area, volume, and speed.",
    applicationCategory: "UtilityApplication", operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Unit Converter", item: PAGE_URL },
    ],
  },
]

export default function UnitConverterPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Unit Converter</h1>
        <p className="text-lg text-muted-foreground">
          Convert between units of length, weight, temperature, area, volume, and speed. Metric and imperial — instant results.
        </p>
      </div>
      <UnitConverterClient />
      <AdBanner adSlot="5027000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
    </div>
  )
}

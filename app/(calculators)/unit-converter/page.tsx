import { Metadata } from "next"
import { UnitConverterClient } from "@/components/calculators/UnitConverterClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/unit-converter`

export const metadata: Metadata = {
  title: "Unit Converter — Convert Length, Weight, Area, Volume & Temperature",
  description:
    "Free online Unit Converter. Convert length (meters, feet, inches), mass/weight (kg, lbs), area (sq ft, acres, hectares), volume, and temperature instantly.",
  keywords: [
    "unit converter", "convert units online", "length converter", "weight converter kg to lbs",
    "area converter sq ft to acres", "temperature converter celsius to fahrenheit",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Unit Converter — Convert Length, Mass, Area, Volume Online",
    description: "Free online multi-category unit converter for length, weight, area, temperature, and volume.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Unit Converter" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Unit Converter",
    url: PAGE_URL,
    description: "Free multi-unit converter tool covering metric and imperial measurements.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
          Convert across Length, Mass / Weight, Area, Volume, and Temperature with high decimal precision.
        </p>
      </div>

      <UnitConverterClient />
      <AdBanner adSlot="5027000001" adFormat="horizontal" label="Advertisement" className="mt-10" />

      {/* Rich Educational Content */}
      <section className="max-w-4xl mx-auto mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-6">Standard Conversion Formulas Reference</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="text-left p-3 border border-border font-semibold">Measurement Category</th>
                <th className="text-left p-3 border border-border font-semibold">Base Standard Unit</th>
                <th className="text-left p-3 border border-border font-semibold">Key Conversion Equivalence</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Length", "Meter (m)", "1 Meter = 3.28084 Feet = 39.3701 Inches"],
                ["Area (Real Estate)", "Square Meter (m²)", "1 Acre = 43,560 Sq Ft = 4,046.86 m² = 100 Cents"],
                ["Weight / Mass", "Kilogram (kg)", "1 Kilogram = 2.20462 Pounds (lbs) = 1,000 Grams"],
                ["Temperature", "Celsius (°C)", "°F = (°C × 9/5) + 32 | K = °C + 273.15"],
                ["Volume", "Liter (L)", "1 US Gallon = 3.78541 Liters | 1 m³ = 1,000 Liters"],
              ].map(([cat, base, eq]) => (
                <tr key={cat} className="border-b border-border">
                  <td className="p-3 border border-border font-medium">{cat}</td>
                  <td className="p-3 border border-border">{base}</td>
                  <td className="p-3 border border-border font-mono text-xs">{eq}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

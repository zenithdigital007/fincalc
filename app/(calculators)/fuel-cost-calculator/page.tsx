import { Metadata } from "next"
import { FuelCostCalculatorClient } from "@/components/calculators/FuelCostCalculatorClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/fuel-cost-calculator`

export const metadata: Metadata = {
  title: "Fuel Cost Calculator — Calculate Trip Petrol/Diesel Cost & Mileage",
  description:
    "Free online Fuel Cost Calculator. Calculate total fuel cost, liters consumed, cost per passenger for road trips, daily commutes, and car mileage.",
  keywords: [
    "fuel cost calculator", "petrol cost calculator", "diesel trip calculator",
    "mileage calculator", "calculate trip fuel cost", "car travel cost per km",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Fuel Cost Calculator — Calculate Trip Petrol/Diesel Expense",
    description: "Calculate road trip fuel expense and mileage efficiency. Free fuel calculator.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Fuel Cost Calculator" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Fuel Cost Calculator",
    url: PAGE_URL,
    description: "Free online Fuel Cost Calculator for road trips and commutes.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is trip fuel cost calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Total Fuel Required = Distance / Mileage (km/L). Total Cost = Total Fuel Required × Price per Liter.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 1, name: "Fuel Cost Calculator", item: PAGE_URL },
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
          Calculate the total fuel expense, fuel required, and per-person cost for your road trip or daily commute.
        </p>
      </div>

      <FuelCostCalculatorClient />
      <AdBanner adSlot="5025000001" adFormat="horizontal" label="Advertisement" className="mt-10" />

      {/* Rich Educational Content */}
      <section className="max-w-4xl mx-auto mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-6">How to Calculate Fuel Consumption & Trip Cost</h2>
        <div className="bg-muted/50 border border-border rounded-xl p-6 mb-6 font-mono text-sm space-y-1">
          <p>Fuel Required (Liters) = Trip Distance (km) ÷ Vehicle Mileage (km/L)</p>
          <p>Total Fuel Cost = Fuel Required × Price per Liter</p>
          <p>Cost per Kilometer = Total Fuel Cost ÷ Trip Distance</p>
        </div>

        <h2 className="text-2xl font-bold mb-6">Tips to Improve Vehicle Fuel Economy</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            { title: "Maintain Correct Tire Pressure", desc: "Underinflated tires increase rolling resistance and reduce fuel economy by up to 3–5%." },
            { title: "Smooth Acceleration & Braking", desc: "Aggressive driving in stop-and-go traffic wastes significant fuel compared to gradual acceleration." },
            { title: "Optimal Highway Cruising Speed", desc: "Driving at 70–90 km/h in highest gear yields maximum fuel efficiency on highways." },
            { title: "Reduce Unnecessary Cargo Weight", desc: "Extra 50 kg of trunk weight increases fuel consumption by approximately 1–2%." },
          ].map(({ title, desc }) => (
            <div key={title} className="p-5 bg-card border border-border rounded-xl">
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

import { Metadata } from "next"
import { DateDifferenceCalculatorClient } from "@/components/calculators/DateDifferenceCalculatorClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/date-difference-calculator`

export const metadata: Metadata = {
  title: "Date Difference Calculator — Calculate Days, Weeks & Months Between Dates",
  description:
    "Free online Date Difference Calculator. Calculate exact number of days, weeks, months, business working days, and weekends between two calendar dates.",
  keywords: [
    "date difference calculator", "days between dates", "calculate days between two dates",
    "work days calculator", "time duration between dates",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Date Difference Calculator — Calculate Duration Between Dates",
    description: "Calculate days, weeks, and months between two dates. Free date difference calculator.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Date Difference Calculator" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Date Difference Calculator",
    url: PAGE_URL,
    description: "Free Date Difference Calculator to find elapsed days, weeks, months between dates.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Date Difference Calculator", item: PAGE_URL },
    ],
  },
]

export default function DateDiffPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Date Difference Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Calculate the duration between two dates in years, months, weeks, days, and working hours.
        </p>
      </div>

      <DateDifferenceCalculatorClient />
      <AdBanner adSlot="5026000001" adFormat="horizontal" label="Advertisement" className="mt-10" />

      {/* Rich Educational Content */}
      <section className="max-w-4xl mx-auto mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-6">How Date Duration is Computed</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Measuring the span between two calendar dates involves accounting for irregular Gregorian calendar months (30 vs 31 days, and February with 28 or 29 days in leap years).
        </p>

        <h2 className="text-2xl font-bold mb-6">Practical Applications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            { title: "Project Milestones & Deadlines", desc: "Track sprint cycles, project delivery schedules, and remaining working business days." },
            { title: "Financial Interest Accrual", desc: "Calculate exact day counts (Actual/360 or Actual/365) for bond coupons and commercial loan interest." },
            { title: "Tenancy & Lease Agreements", desc: "Verify exact duration for residential rent agreements and commercial property leases." },
            { title: "Visa & Stay Duration", desc: "Accurately compute travel days to remain strictly compliant with 90/180-day international visa limits." },
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

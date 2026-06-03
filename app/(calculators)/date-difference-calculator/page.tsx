import { Metadata } from "next"
import { DateDifferenceCalculatorClient } from "@/components/calculators/DateDifferenceCalculatorClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/date-difference-calculator`

export const metadata: Metadata = {
  title: "Date Difference Calculator — Calculate Days Between Dates Online Free",
  description:
    "Calculate the number of days, weeks, months, and years between any two dates. Find exact date differences for loan tenure, project deadlines, anniversaries, and more. Free date calculator online.",
  keywords: [
    "date difference calculator", "days between dates calculator", "date calculator",
    "days calculator", "calculate days between two dates", "date duration calculator",
    "how many days between dates", "date difference in days months years",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Date Difference Calculator — Days, Weeks, Months Between Dates",
    description: "Count days, weeks, months, and years between any two dates. Free online date difference calculator.",
    url: PAGE_URL, type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Date Difference Calculator" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org", "@type": "WebApplication",
    name: "Date Difference Calculator", url: PAGE_URL,
    description: "Free date difference calculator. Calculate days, weeks, months, and years between two dates.",
    applicationCategory: "UtilityApplication", operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Date Difference Calculator", item: PAGE_URL },
    ],
  },
]

export default function DateDifferencePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Date Difference Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Count the exact number of days, weeks, months, and years between any two dates. Useful for loan tenure, anniversaries, and project deadlines.
        </p>
      </div>
      <DateDifferenceCalculatorClient />
      <AdBanner adSlot="5026000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
    </div>
  )
}

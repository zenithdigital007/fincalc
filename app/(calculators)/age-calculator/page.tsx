import { Metadata } from "next"
import { AgeCalculatorClient } from "@/components/calculators/AgeCalculatorClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/age-calculator`

export const metadata: Metadata = {
  title: "Age Calculator — Calculate Exact Age in Years, Months, Days & Next Birthday",
  description:
    "Free online Age Calculator. Calculate exact chronological age in years, months, weeks, days, hours, minutes, and countdown to your next birthday.",
  keywords: [
    "age calculator", "calculate age online", "chronological age calculator",
    "birthday countdown calculator", "exact age in days",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Age Calculator — Calculate Exact Age in Years, Months & Days",
    description: "Calculate exact chronological age and upcoming birthday countdown. Free age calculator.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Age Calculator" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Age Calculator",
    url: PAGE_URL,
    description: "Free online Age Calculator. Calculates exact chronological age down to days and seconds.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
          Find your exact chronological age in years, months, days, hours, and see days until your next birthday.
        </p>
      </div>

      <AgeCalculatorClient />
      <AdBanner adSlot="5022000001" adFormat="horizontal" label="Advertisement" className="mt-10" />

      {/* Rich Educational Content */}
      <section className="max-w-4xl mx-auto mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-6">How Chronological Age is Calculated</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Chronological age calculation accounts for leap years, varying number of days per month (28, 29, 30, or 31), and calendar boundary roll-overs according to the international Gregorian calendar standard.
        </p>

        <h2 className="text-2xl font-bold mb-6">Common Uses for Precise Age Calculation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            { title: "Government & Competitive Exams", desc: "Verifying exact cutoff age eligibility (e.g. UPSC, SSC, Banking, State PSC exams) on specific reference dates." },
            { title: "Retirement & Pension Eligibility", desc: "Calculating exact date of superannuation and provident fund vesting." },
            { title: "Insurance & Underwriting", desc: "Determining insurance age nearest birthday (ANB) for term life and health insurance premiums." },
            { title: "Child Milestones & School Admissions", desc: "Checking school admission age criteria defined by national education policies." },
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

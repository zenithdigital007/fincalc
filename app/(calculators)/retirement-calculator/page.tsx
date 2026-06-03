import { Metadata } from "next"
import { RetirementCalculatorClient } from "@/components/calculators/RetirementCalculatorClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/retirement-calculator`

export const metadata: Metadata = {
  title: "Retirement Calculator India — How Much Do You Need to Retire?",
  description:
    "Plan your retirement with India's most comprehensive retirement calculator. Enter your age, savings, monthly contributions, and expected returns to see your projected corpus vs required corpus. Free retirement planner.",
  keywords: [
    "retirement calculator India", "retirement planning calculator", "retirement corpus calculator",
    "how much to save for retirement India", "retirement fund calculator", "early retirement calculator India",
    "retirement planner online free",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Retirement Calculator — How Much Do You Need to Retire in India?",
    description: "Calculate your retirement corpus and see if you're on track. Accounts for inflation, returns, and monthly expenses.",
    url: PAGE_URL, type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Retirement Calculator India" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org", "@type": "WebApplication",
    name: "Retirement Calculator India", url: PAGE_URL,
    description: "Free retirement planner for India. Calculate projected corpus vs required corpus with inflation adjustment.",
    applicationCategory: "FinanceApplication", operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question", name: "How much money do I need to retire in India?",
        acceptedAnswer: { "@type": "Answer", text: "A common rule is the '25x rule': multiply your annual expenses at retirement by 25. For example, if you need ₹60,000/month (₹7.2L/year), you need ₹1.8 crore. This assumes a 4% annual withdrawal rate (the 4% rule). With Indian inflation of 6%, the figure will be higher in today's money terms." },
      },
      {
        "@type": "Question", name: "At what age should I start saving for retirement?",
        acceptedAnswer: { "@type": "Answer", text: "The earlier, the better. Starting at 25 instead of 35 can more than double your retirement corpus thanks to compounding. Even small monthly contributions of ₹5,000-10,000 starting at 25 can build a significant corpus by 60." },
      },
    ],
  },
  {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Retirement Calculator", item: PAGE_URL },
    ],
  },
]

export default function RetirementPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Retirement Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Find out if your savings are on track. See your projected retirement corpus vs what you actually need, adjusted for inflation.
        </p>
      </div>
      <RetirementCalculatorClient />
      <AdBanner adSlot="5018000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
    </div>
  )
}

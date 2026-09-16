import { Metadata } from "next"
import { RetirementCalculatorClient } from "@/components/calculators/RetirementCalculatorClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/retirement-calculator`

export const metadata: Metadata = {
  title: "Retirement Calculator — Calculate Target Retirement Corpus & Monthly Savings",
  description:
    "Free online Retirement Calculator. Calculate inflation-adjusted retirement corpus, required monthly savings, and post-retirement expenses to achieve financial independence (FIRE).",
  keywords: [
    "retirement calculator", "pension corpus calculator", "FIRE calculator India",
    "calculate retirement money", "inflation adjusted retirement calculator",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Retirement Calculator — Calculate Target Corpus Online",
    description: "Calculate how much money you need to retire comfortably with inflation-adjusted expenses. Free retirement calculator.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Retirement Calculator" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Retirement Calculator",
    url: PAGE_URL,
    description: "Free online Retirement Calculator with inflation and life expectancy modeling.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much corpus do I need to retire comfortably?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A standard benchmark rule (e.g. the 25x-30x rule) suggests saving at least 25 to 30 times your estimated annual expenses at retirement, adjusted for an average 6% inflation rate.",
        },
      },
      {
        "@type": "Question",
        name: "What is the 4% withdrawal rule?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The 4% rule states that you can withdraw 4% of your total retirement portfolio in the first year of retirement, and adjust subsequent withdrawals for inflation, with high probability that the funds will last 30+ years.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
          Calculate your target retirement corpus, inflation-adjusted expenses, and required monthly savings.
        </p>
      </div>

      <RetirementCalculatorClient />
      <AdBanner adSlot="5013000001" adFormat="horizontal" label="Advertisement" className="mt-10" />

      {/* Rich Educational Content */}
      <section className="max-w-4xl mx-auto mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-6">Key Steps in Retirement Financial Planning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            { title: "1. Account for Inflation", desc: "A monthly expense of ₹50,000 today will equal ₹1.60 Lakh per month in 20 years at a modest 6% annual inflation rate." },
            { title: "2. Define Life Expectancy", desc: "With healthcare advancements, plan for a post-retirement horizon of at least 25–30 years (living up to age 85–90)." },
            { title: "3. Diversify Asset Allocation", desc: "Shift gradually from equity-heavy accumulation portfolios (ages 25–50) to balanced hybrid & debt assets as retirement nears." },
            { title: "4. Build an Emergency & Health Buffer", desc: "Maintain dedicated comprehensive health insurance separate from retirement corpus to safeguard against medical contingencies." },
          ].map(({ title, desc }) => (
            <div key={title} className="p-5 bg-card border border-border rounded-xl">
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6 mb-8">
          {[
            {
              q: "What is the FIRE movement?",
              a: "FIRE stands for 'Financial Independence, Retire Early'. It is a lifestyle and investing movement centered around aggressive savings (50%+ of income) in early career years to achieve early retirement in one's 30s or 40s.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="border-b border-border pb-6 last:border-0">
              <h3 className="font-semibold mb-2 text-base">{q}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

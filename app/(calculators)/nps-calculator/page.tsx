import { Metadata } from "next"
import { NPSCalculatorClient } from "@/components/calculators/NPSCalculatorClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/nps-calculator`

export const metadata: Metadata = {
  title: "NPS Calculator — Calculate Pension & Annuity Corpus Online",
  description:
    "Free National Pension System (NPS) calculator. Calculate retirement pension wealth, lump sum withdrawal (60%) and monthly pension annuity payout (40%).",
  keywords: [
    "NPS calculator", "national pension system calculator", "pension calculator India",
    "NPS annuity calculator", "retirement pension calculator", "NPS returns calculator",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "NPS Calculator — Calculate Retirement Corpus & Monthly Pension",
    description: "Calculate your NPS pension corpus and monthly annuity payout. Free NPS calculator.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "NPS Calculator" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "NPS Calculator",
    url: PAGE_URL,
    description: "Free National Pension System (NPS) calculator.",
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
        name: "What are the withdrawal rules for NPS at age 60?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "At age 60, up to 60% of your accumulated NPS corpus can be withdrawn as a tax-free lump sum. The remaining minimum 40% must be invested in an annuity plan from an IRDAI-registered insurance company to provide regular monthly pension.",
        },
      },
      {
        "@type": "Question",
        name: "What additional tax deduction is available under Section 80CCD(1B)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An exclusive additional deduction of up to ₹50,000 per financial year is available for Tier 1 NPS investments under Section 80CCD(1B), over and above the ₹1.5 lakh limit of Section 80C.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "NPS Calculator", item: PAGE_URL },
    ],
  },
]

export default function NpsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">NPS Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Plan your retirement by calculating your National Pension Scheme corpus, lump sum, and monthly pension.
        </p>
      </div>

      <NPSCalculatorClient />
      <AdBanner adSlot="5011000001" adFormat="horizontal" label="Advertisement" className="mt-10" />

      {/* Rich Educational Content */}
      <section className="max-w-4xl mx-auto mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-6">How National Pension System (NPS) Works</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The National Pension System (NPS) is a voluntary, long-term retirement savings scheme regulated by PFRDA. It lets you allocate funds across Equity (E), Corporate Bonds (C), Government Securities (G), and Alternative Assets (A).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            { title: "60% Tax-Free Lump Sum", desc: "Upon turning 60, you can withdraw up to 60% of your total corpus completely tax-free." },
            { title: "40% Annuity Pension", desc: "A minimum of 40% corpus is converted into an annuity that guarantees a lifelong monthly pension." },
            { title: "Exclusive ₹50,000 Tax Benefit", desc: "Claim deduction under Section 80CCD(1B) beyond the standard ₹1.5L Section 80C ceiling." },
            { title: "Low Fund Management Cost", desc: "One of the world's lowest expense ratios (under 0.09% p.a.), ensuring maximum compounded returns." },
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
              q: "Can I choose between Auto Choice and Active Choice in NPS?",
              a: "Yes. Active Choice allows you to decide your own asset allocation (up to 75% in equity). Auto Choice automatically reduces equity exposure as you age (Aggressive, Moderate, or Conservative lifecycle funds).",
            },
            {
              q: "What is the difference between NPS Tier 1 and Tier 2 accounts?",
              a: "Tier 1 is the primary retirement account with tax benefits and lock-in until age 60. Tier 2 is a voluntary investment account with no lock-in and unlimited withdrawals, but without special tax deductions.",
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

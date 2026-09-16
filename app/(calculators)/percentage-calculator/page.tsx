import { Metadata } from "next"
import { PercentageCalculatorClient } from "@/components/calculators/PercentageCalculatorClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/percentage-calculator`

export const metadata: Metadata = {
  title: "Percentage Calculator — Calculate % of Number, % Change & Difference",
  description:
    "Free online percentage calculator. Calculate percentage of a number, percentage increase/decrease, percentage change, and what percentage X is of Y with step-by-step formulas.",
  keywords: [
    "percentage calculator", "percentage calculator online", "percent of number calculator",
    "percentage change calculator", "percent increase calculator", "percent decrease calculator",
    "what percent is X of Y", "calculate percentage India",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Percentage Calculator — 5 Types of % Calculations Online Free",
    description: "Calculate percentage of a number, % change, % increase, % decrease, and more. Free percentage calculator.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Percentage Calculator" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Percentage Calculator",
    url: PAGE_URL,
    description: "Free percentage calculator. 5 calculation modes: % of, what %, % change, increase, decrease.",
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
        name: "How do you calculate percentage of a number?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To find P% of a number X, multiply the number by the percentage and divide by 100: Result = (P × X) / 100. For example, 18% of 500 = (18 × 500) / 100 = 90.",
        },
      },
      {
        "@type": "Question",
        name: "How do you calculate percentage increase or decrease?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Percentage Change = ((New Value - Old Value) / |Old Value|) × 100. If positive, it is a percentage increase; if negative, it is a percentage decrease.",
        },
      },
      {
        "@type": "Question",
        name: "How do you find what percentage one number is of another?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To find what percentage X is of Y: Percentage = (X / Y) × 100. For example, 45 out of 60 is (45 / 60) × 100 = 75%.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Percentage Calculator", item: PAGE_URL },
    ],
  },
]

export default function PercentagePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Percentage Calculator</h1>
        <p className="text-lg text-muted-foreground">
          5 calculation modes: find % of a number, what % is X of Y, % change, % increase, and % decrease.
        </p>
      </div>

      <PercentageCalculatorClient />
      <AdBanner adSlot="5023000001" adFormat="horizontal" label="Advertisement" className="mt-10" />

      {/* Rich Educational Content */}
      <section className="max-w-4xl mx-auto mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-6">How to Calculate Percentages: 5 Essential Formulas</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Percentages express a ratio or fraction as a fraction of 100 (from Latin <em>per centum</em>, meaning &apos;by the hundred&apos;). Whether you are calculating retail discounts, GST/tax rates, salary hikes, or test exam scores, here is how each percentage formula works.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-5 bg-card border border-border rounded-xl">
            <h3 className="font-semibold text-base mb-2">1. Percentage of a Number (P% of X)</h3>
            <div className="bg-muted p-3 rounded font-mono text-xs mb-2">Result = (P × X) / 100</div>
            <p className="text-xs text-muted-foreground"><strong>Example:</strong> What is 18% GST on ₹2,500? → (18 × 2500) / 100 = <strong>₹450</strong>.</p>
          </div>

          <div className="p-5 bg-card border border-border rounded-xl">
            <h3 className="font-semibold text-base mb-2">2. What % is X of Y?</h3>
            <div className="bg-muted p-3 rounded font-mono text-xs mb-2">Percentage = (X / Y) × 100</div>
            <p className="text-xs text-muted-foreground"><strong>Example:</strong> Scored 420 out of 500 in exam? → (420 / 500) × 100 = <strong>84%</strong>.</p>
          </div>

          <div className="p-5 bg-card border border-border rounded-xl">
            <h3 className="font-semibold text-base mb-2">3. Percentage Change (% Increase / Decrease)</h3>
            <div className="bg-muted p-3 rounded font-mono text-xs mb-2">% Change = [(New - Old) / Old] × 100</div>
            <p className="text-xs text-muted-foreground"><strong>Example:</strong> Price went from ₹80 to ₹100? → [(100 - 80) / 80] × 100 = <strong>+25% increase</strong>.</p>
          </div>

          <div className="p-5 bg-card border border-border rounded-xl">
            <h3 className="font-semibold text-base mb-2">4. Increase / Decrease by P%</h3>
            <div className="bg-muted p-3 rounded font-mono text-xs mb-2">New Value = X × (1 ± P / 100)</div>
            <p className="text-xs text-muted-foreground"><strong>Example:</strong> ₹50,000 salary with 12% appraisal → 50,000 × 1.12 = <strong>₹56,000</strong>.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Common Percentage Conversions Reference</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="text-left p-3 border border-border font-semibold">Percentage</th>
                <th className="text-left p-3 border border-border font-semibold">Decimal</th>
                <th className="text-left p-3 border border-border font-semibold">Fraction</th>
                <th className="text-left p-3 border border-border font-semibold">Quick Calculation Trick</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["5%", "0.05", "1/20", "Divide by 20, or find 10% and halve it"],
                ["10%", "0.10", "1/10", "Move the decimal one place to the left"],
                ["12.5%", "0.125", "1/8", "Divide by 8"],
                ["20%", "0.20", "1/5", "Divide by 5"],
                ["25%", "0.25", "1/4", "Divide by 4 (half of a half)"],
                ["33.33%", "0.333...", "1/3", "Divide by 3"],
                ["50%", "0.50", "1/2", "Divide by 2"],
                ["75%", "0.75", "3/4", "Divide by 4, then multiply by 3"],
              ].map(([pct, dec, frac, trick]) => (
                <tr key={pct} className="border-b border-border">
                  <td className="p-3 border border-border font-medium">{pct}</td>
                  <td className="p-3 border border-border font-mono">{dec}</td>
                  <td className="p-3 border border-border font-mono">{frac}</td>
                  <td className="p-3 border border-border text-muted-foreground">{trick}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6 mb-8">
          {[
            {
              q: "How do I calculate percentage difference between two numbers?",
              a: "Percentage difference = (|Value 1 - Value 2| / Average of both values) × 100. It is used when neither number is specifically the 'original' starting point.",
            },
            {
              q: "Why is a 50% loss not recovered by a 50% gain?",
              a: "Because percentages are calculated relative to the base value. If you start with ₹100 and lose 50%, you have ₹50. A 50% gain on ₹50 is only ₹25, leaving you with ₹75. You need a 100% gain to recover from a 50% loss.",
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

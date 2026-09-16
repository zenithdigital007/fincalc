import { Metadata } from "next"
import { IncomeTaxCalculatorClient } from "@/components/calculators/IncomeTaxCalculatorClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/income-tax-calculator`

export const metadata: Metadata = {
  title: "Income Tax Calculator India — New vs Old Tax Regime Calculator",
  description:
    "Free Income Tax Calculator for India (FY 2024-25 / FY 2025-26). Compare tax liability under New Regime vs Old Regime with standard deduction, 80C, 80D, HRA deductions.",
  keywords: [
    "income tax calculator", "income tax calculator India", "new tax regime vs old tax regime",
    "calculate income tax 2025", "salary tax calculator India", "tax slabs FY 2024-25",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Income Tax Calculator India — New vs Old Tax Regime Comparison",
    description: "Compare tax under Old and New Tax Regimes instantly. Free online Income Tax calculator for salaried individuals.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Income Tax Calculator" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Income Tax Calculator India",
    url: PAGE_URL,
    description: "Free Income Tax Calculator for India. Compare Old vs New Tax Regime with standard deductions.",
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
        name: "Which is better: Old Tax Regime or New Tax Regime?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The New Tax Regime offers lower tax slab rates and higher rebate limits (zero tax up to ₹7-7.75 lakh with standard deduction) with simplified filing. The Old Tax Regime is better if you claim substantial deductions exceeding ₹3.75-4.25 lakh (80C, 80D, HRA, home loan interest 24b).",
        },
      },
      {
        "@type": "Question",
        name: "What is the standard deduction for salaried employees?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Under the New Tax Regime, the standard deduction has been enhanced to ₹75,000 for salaried employees and pensioners. Under the Old Regime, it remains ₹50,000.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Income Tax Calculator", item: PAGE_URL },
    ],
  },
]

export default function IncomeTaxPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Income Tax Calculator India</h1>
        <p className="text-lg text-muted-foreground">
          Compare your tax liability under the New and Old Tax Regimes and find the most tax-efficient option.
        </p>
      </div>

      <IncomeTaxCalculatorClient />
      <AdBanner adSlot="5019000001" adFormat="horizontal" label="Advertisement" className="mt-10" />

      {/* Rich Educational Content */}
      <section className="max-w-4xl mx-auto mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-6">New Tax Regime Slabs (Default Regime)</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="text-left p-3 border border-border font-semibold">Income Slab (₹)</th>
                <th className="text-left p-3 border border-border font-semibold">Tax Rate</th>
                <th className="text-left p-3 border border-border font-semibold">Key Highlights</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["₹0 to ₹3,00,000", "NIL", "Zero tax baseline threshold"],
                ["₹3,00,001 to ₹7,00,000", "5%", "Full rebate under Section 87A up to ₹7 lakh"],
                ["₹7,00,001 to ₹10,00,000", "10%", "Standard deduction of ₹75,000 applied"],
                ["₹10,00,001 to ₹12,00,000", "15%", "Lower progression compared to old slabs"],
                ["₹12,00,001 to ₹15,00,000", "20%", "Competitive tax rate for middle income"],
                ["Above ₹15,00,000", "30%", "Highest slab rate (+ 4% Health & Education Cess)"],
              ].map(([slab, rate, note]) => (
                <tr key={slab} className="border-b border-border">
                  <td className="p-3 border border-border font-medium">{slab}</td>
                  <td className="p-3 border border-border font-mono">{rate}</td>
                  <td className="p-3 border border-border text-muted-foreground text-xs">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6 mb-8">
          {[
            {
              q: "Can I switch between Old and New Tax Regimes every year?",
              a: "Salaried individuals without business income can choose between the Old and New Tax Regimes every financial year when filing their Income Tax Return (ITR). Individuals with business or professional income can switch only once in their lifetime.",
            },
            {
              q: "What is the Section 87A tax rebate?",
              a: "Section 87A provides a full tax rebate if your taxable income does not exceed ₹7,00,000 under the New Tax Regime (or ₹5,00,000 under the Old Regime), effectively resulting in zero tax liability.",
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

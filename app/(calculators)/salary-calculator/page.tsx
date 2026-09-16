import { Metadata } from "next"
import { SalaryCalculatorClient } from "@/components/calculators/SalaryCalculatorClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/salary-calculator`

export const metadata: Metadata = {
  title: "Salary Calculator — Calculate In-Hand Take-Home Pay from CTC",
  description:
    "Free Salary In-Hand Calculator for India. Calculate monthly take-home salary from annual CTC, EPF contributions, professional tax, and income tax deductions.",
  keywords: [
    "salary calculator", "in hand salary calculator", "CTC to take home calculator",
    "calculate in hand salary India", "net salary calculator", "gross to net salary",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Salary Calculator — CTC to In-Hand Take-Home Pay Calculator",
    description: "Calculate monthly take-home salary from your CTC after PF, PT and tax deductions. Free salary calculator.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Salary Calculator" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Salary In-Hand Calculator",
    url: PAGE_URL,
    description: "Free Salary In-Hand Calculator for India. Convert annual CTC into monthly take-home pay.",
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
        name: "What is the difference between CTC, Gross Salary, and In-Hand Salary?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CTC (Cost to Company) is the total annual expenditure an employer incurs on you (including employer PF, gratuity, insurance). Gross Salary is CTC minus employer benefits. In-Hand (Net) Salary is the actual cash credited to your bank account after employee PF, Professional Tax, and TDS deductions.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Salary Calculator", item: PAGE_URL },
    ],
  },
]

export default function SalaryPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Salary In-Hand Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Convert your annual CTC into your actual monthly take-home in-hand salary with full deduction breakdown.
        </p>
      </div>

      <SalaryCalculatorClient />
      <AdBanner adSlot="5016000001" adFormat="horizontal" label="Advertisement" className="mt-10" />

      {/* Rich Educational Content */}
      <section className="max-w-4xl mx-auto mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-6">Standard Salary Breakdown Structure in India</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="text-left p-3 border border-border font-semibold">Salary Component</th>
                <th className="text-left p-3 border border-border font-semibold">Typical % of CTC</th>
                <th className="text-left p-3 border border-border font-semibold">Taxability</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Basic Salary", "40% – 50%", "100% Taxable"],
                ["House Rent Allowance (HRA)", "40% – 50% of Basic", "Exempt under Section 10(13A) in Old Regime"],
                ["Special Allowance", "Balance component", "100% Taxable"],
                ["Employee PF Contribution", "12% of Basic", "Eligible for 80C in Old Regime"],
                ["Professional Tax (PT)", "₹200 / month (approx)", "State-level deductible tax"],
              ].map(([comp, pct, tax]) => (
                <tr key={comp} className="border-b border-border">
                  <td className="p-3 border border-border font-medium">{comp}</td>
                  <td className="p-3 border border-border">{pct}</td>
                  <td className="p-3 border border-border text-muted-foreground text-xs">{tax}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6 mb-8">
          {[
            {
              q: "Why is in-hand salary significantly lower than monthly CTC (CTC ÷ 12)?",
              a: "Because CTC includes indirect costs borne by the employer (such as employer EPF 12%, gratuity accrual 4.81%, health insurance premiums) plus statutory salary deductions (employee EPF 12%, Professional Tax, and Income Tax TDS).",
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

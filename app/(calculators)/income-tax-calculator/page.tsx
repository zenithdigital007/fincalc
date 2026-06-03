import { Metadata } from "next"
import { IncomeTaxCalculatorClient } from "@/components/calculators/IncomeTaxCalculatorClient"
import { NewsSection } from "@/components/shared/NewsSection"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/income-tax-calculator`

export const metadata: Metadata = {
  title: "Income Tax Calculator India FY 2024-25 — New & Old Regime",
  description:
    "Calculate your income tax for FY 2024-25 (AY 2025-26). Compare new vs old tax regime, see tax slabs, effective rate, and monthly in-hand salary. Free income tax calculator India.",
  keywords: [
    "income tax calculator India", "income tax calculator FY 2024-25", "new tax regime calculator",
    "old tax regime calculator", "income tax slab India", "tax calculator 2024",
    "AY 2025-26 tax calculator", "how much tax do I pay India",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Income Tax Calculator India FY 2024-25 — New & Old Regime",
    description: "Calculate your income tax for FY 2024-25. Compare new vs old regime instantly. Free income tax calculator.",
    url: PAGE_URL, type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Income Tax Calculator India" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org", "@type": "WebApplication",
    name: "Income Tax Calculator India", url: PAGE_URL,
    description: "Free India income tax calculator for FY 2024-25. Supports new and old tax regimes.",
    applicationCategory: "FinanceApplication", operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question", name: "Which is better — new or old tax regime?",
        acceptedAnswer: { "@type": "Answer", text: "The new tax regime (FY 2024-25) is better if you have fewer deductions. The old regime is better if you claim major deductions like HRA, 80C, 80D. Generally, the new regime is beneficial for income below ₹7.5L (due to ₹75,000 standard deduction) or income above ₹15L with limited deductions." },
      },
      {
        "@type": "Question", name: "What is the standard deduction in the new tax regime?",
        acceptedAnswer: { "@type": "Answer", text: "For FY 2024-25, the standard deduction under the new tax regime is ₹75,000 (increased from ₹50,000 in the Union Budget 2024). This means salaried individuals with income up to ₹7,75,000 pay zero tax under the new regime." },
      },
      {
        "@type": "Question", name: "Is there a tax rebate under Section 87A?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. Under the new tax regime, if your taxable income is ₹7 lakh or less, the rebate under Section 87A makes your tax liability nil. Under the old regime, the rebate applies for taxable income up to ₹5 lakh." },
      },
    ],
  },
  {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
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
        <h1 className="text-4xl font-bold tracking-tight mb-4">Income Tax Calculator — FY 2024-25</h1>
        <p className="text-lg text-muted-foreground">
          Calculate your tax under the new or old regime. See your effective rate, total tax, and monthly in-hand salary.
        </p>
      </div>
      <IncomeTaxCalculatorClient />
      <AdBanner adSlot="5011000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
      <div className="max-w-6xl mx-auto">
        <NewsSection topic="income tax India budget tax slab finance ministry" title="Tax & Budget News" adSlot="5011000002" />
      </div>
    </div>
  )
}

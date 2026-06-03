import { Metadata } from "next"
import { SalaryCalculatorClient } from "@/components/calculators/SalaryCalculatorClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/salary-calculator`

export const metadata: Metadata = {
  title: "Salary Calculator India — CTC to In-Hand Salary Calculator Online Free",
  description:
    "Convert CTC to in-hand salary instantly. See your basic, HRA, EPF, professional tax, and monthly take-home pay. Free Indian salary calculator for private sector employees.",
  keywords: [
    "salary calculator India", "CTC to in-hand salary calculator", "take home salary calculator India",
    "net salary calculator India", "monthly salary calculator", "salary breakup calculator",
    "CTC salary calculator", "EPF salary calculator India",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Salary Calculator India — CTC to In-Hand Salary Calculator",
    description: "Convert your CTC to in-hand salary. See basic, HRA, EPF deductions and monthly take-home instantly. Free salary calculator.",
    url: PAGE_URL, type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Salary Calculator India" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org", "@type": "WebApplication",
    name: "Salary Calculator India", url: PAGE_URL,
    description: "Free Indian salary calculator. Convert CTC to in-hand salary with full breakup.",
    applicationCategory: "FinanceApplication", operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question", name: "What is the difference between CTC and in-hand salary?",
        acceptedAnswer: { "@type": "Answer", text: "CTC (Cost to Company) is the total annual expenditure by the employer, including salary, EPF employer contribution, gratuity, insurance, etc. In-hand salary (take-home) is what gets credited to your account after deducting EPF (employee share), professional tax, income tax (TDS), and other deductions." },
      },
      {
        "@type": "Question", name: "What percentage of CTC is in-hand salary?",
        acceptedAnswer: { "@type": "Answer", text: "Typically, in-hand salary ranges from 65-75% of CTC depending on the salary structure, tax bracket, and deductions. For lower salaries (under ₹5L CTC), it can be 80-85%. For higher salaries with tax deductions, it may drop to 60-65%." },
      },
    ],
  },
  {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
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
        <h1 className="text-4xl font-bold tracking-tight mb-4">Salary Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Convert your CTC to in-hand salary. See the full breakup of basic, HRA, EPF, and monthly take-home pay.
        </p>
      </div>
      <SalaryCalculatorClient />
      <AdBanner adSlot="5021000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
    </div>
  )
}

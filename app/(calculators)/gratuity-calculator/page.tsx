import { Metadata } from "next"
import { GratuityCalculatorClient } from "@/components/calculators/GratuityCalculatorClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/gratuity-calculator`

export const metadata: Metadata = {
  title: "Gratuity Calculator India — Calculate Gratuity Amount Online Free",
  description:
    "Calculate your gratuity payout using the official formula. Enter last drawn salary and years of service to get your gratuity amount. Covers eligibility rules and tax-free limits. Free gratuity calculator India.",
  keywords: [
    "gratuity calculator", "gratuity calculator India", "gratuity calculation formula",
    "how to calculate gratuity", "gratuity amount calculator", "gratuity eligibility India",
    "gratuity payment act India",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Gratuity Calculator India — Calculate Gratuity Amount Free",
    description: "Calculate your gratuity payout instantly. Enter last salary and years of service. Free gratuity calculator.",
    url: PAGE_URL, type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Gratuity Calculator India" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org", "@type": "WebApplication",
    name: "Gratuity Calculator", url: PAGE_URL,
    description: "Free gratuity calculator for India. Calculate gratuity using the Payment of Gratuity Act formula.",
    applicationCategory: "FinanceApplication", operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question", name: "What is the gratuity formula in India?",
        acceptedAnswer: { "@type": "Answer", text: "Gratuity = (Last Drawn Salary × 15 × Years of Service) ÷ 26. 'Last Drawn Salary' means Basic + Dearness Allowance (DA). The divisor 26 represents working days in a month (excluding Sundays)." },
      },
      {
        "@type": "Question", name: "Who is eligible for gratuity?",
        acceptedAnswer: { "@type": "Answer", text: "An employee is eligible for gratuity upon completing 5 years of continuous service with the same employer. It is payable on: superannuation (retirement), resignation, termination, or death/disability (5-year rule waived in death/disability cases)." },
      },
      {
        "@type": "Question", name: "Is gratuity taxable?",
        acceptedAnswer: { "@type": "Answer", text: "For private sector employees covered under the Payment of Gratuity Act, gratuity up to ₹20,00,000 is fully exempt from income tax. Any amount above ₹20 lakh is taxable as per the employee's tax slab." },
      },
    ],
  },
  {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Gratuity Calculator", item: PAGE_URL },
    ],
  },
]

export default function GratuityPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Gratuity Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Calculate your gratuity payout as per the Payment of Gratuity Act. Minimum 5 years of service required.
        </p>
      </div>
      <GratuityCalculatorClient />
      <AdBanner adSlot="5017000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
    </div>
  )
}

import { Metadata } from "next"
import { GratuityCalculatorClient } from "@/components/calculators/GratuityCalculatorClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/gratuity-calculator`

export const metadata: Metadata = {
  title: "Gratuity Calculator India — Calculate Gratuity Amount Online",
  description:
    "Free online Gratuity Calculator for India. Calculate your gratuity payout under the Payment of Gratuity Act 1972 based on monthly salary and tenure.",
  keywords: [
    "gratuity calculator", "gratuity calculator India", "calculate gratuity online",
    "gratuity formula India", "payment of gratuity act 1972", "gratuity eligibility",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Gratuity Calculator India — Calculate Gratuity Online",
    description: "Calculate your gratuity payout based on salary and completed years of service. Free gratuity calculator.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Gratuity Calculator" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Gratuity Calculator India",
    url: PAGE_URL,
    description: "Free Gratuity Calculator for India based on the Payment of Gratuity Act 1972.",
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
        name: "What is the formula for gratuity calculation in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For employees covered under the Payment of Gratuity Act: Gratuity = (15 × Last Drawn Basic Salary + DA × Tenure in Years) / 26.",
        },
      },
      {
        "@type": "Question",
        name: "What is the minimum service period required for gratuity eligibility?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An employee must complete a minimum of 5 continuous years of service with the same employer to become eligible for gratuity payout. (Exemptions apply in case of death or permanent disability).",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
        <h1 className="text-4xl font-bold tracking-tight mb-4">Gratuity Calculator India</h1>
        <p className="text-lg text-muted-foreground">
          Calculate the gratuity amount payable to you upon leaving or retiring from an organization.
        </p>
      </div>

      <GratuityCalculatorClient />
      <AdBanner adSlot="5012000001" adFormat="horizontal" label="Advertisement" className="mt-10" />

      {/* Rich Educational Content */}
      <section className="max-w-4xl mx-auto mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-6">How Gratuity is Calculated in India</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Gratuity is a statutory monetary reward paid by an employer to an employee for their dedicated service under the <strong>Payment of Gratuity Act, 1972</strong>.
        </p>

        <div className="bg-muted/50 border border-border rounded-xl p-6 mb-6 font-mono text-sm">
          Gratuity = ( 15 × Last Drawn Salary × Tenure ) / 26
          <div className="mt-3 text-xs text-muted-foreground font-sans space-y-1">
            <p><strong>Last Drawn Salary</strong> = Basic Salary + Dearness Allowance (DA)</p>
            <p><strong>15</strong> = 15 days of wages calculated per completed year of service</p>
            <p><strong>26</strong> = Number of working days in a month (excluding 4 Sundays)</p>
            <p><strong>Tenure</strong> = Completed years of service (rounded up if &gt; 6 months in final year)</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Tax Exemption on Gratuity</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Under Section 10(10) of the Income Tax Act, gratuity received by private-sector employees covered under the Act is exempt up to a maximum lifetime statutory ceiling of <strong>₹20,00,000 (₹20 Lakhs)</strong>. Any excess gratuity received beyond this limit is taxable as income from salary.
        </p>

        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6 mb-8">
          {[
            {
              q: "Is 4 years and 7 months of service rounded up to 5 years?",
              a: "For the purpose of calculating gratuity amount once eligible, any period of service above 6 months is rounded up to the nearest whole year. However, to attain initial eligibility, the statutory requirement is 5 full continuous years.",
            },
            {
              q: "Is gratuity deducted from my monthly salary?",
              a: "No. Gratuity is paid entirely by the employer. It is part of your Cost to Company (CTC) structure, but no deduction is made from your monthly take-home salary.",
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

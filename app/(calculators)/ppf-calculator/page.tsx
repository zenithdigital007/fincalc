import { Metadata } from "next"
import { PPFCalculatorClient } from "@/components/calculators/PPFCalculatorClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/ppf-calculator`

export const metadata: Metadata = {
  title: "PPF Calculator — Calculate Public Provident Fund Interest & Maturity",
  description:
    "Free PPF (Public Provident Fund) calculator. Calculate interest earned, total deposits, maturity amount and tax savings (EEE category) for 15+ years tenure online.",
  keywords: [
    "PPF calculator", "public provident fund calculator", "PPF interest calculator",
    "PPF maturity value", "PPF tax benefits", "PPF returns India",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "PPF Calculator — Calculate Public Provident Fund Interest & Maturity",
    description: "Calculate PPF returns, interest earned, and maturity value. Free PPF calculator.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "PPF Calculator" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "PPF Calculator",
    url: PAGE_URL,
    description: "Free Public Provident Fund (PPF) calculator. Calculate maturity value and interest earned.",
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
        name: "What is the current PPF interest rate in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The PPF interest rate is set quarterly by the Ministry of Finance, Government of India. It currently offers a competitive, guaranteed, sovereign rate (around 7.1% p.a. compounded annually).",
        },
      },
      {
        "@type": "Question",
        name: "What is the EEE tax status of PPF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PPF enjoys Exempl-Exempt-Exempt (EEE) status: deposits are eligible for Section 80C deductions, interest earned is completely tax-free, and maturity withdrawal is 100% tax-exempt.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "PPF Calculator", item: PAGE_URL },
    ],
  },
]

export default function PpfPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">PPF Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Calculate your Public Provident Fund (PPF) maturity corpus, interest earned, and tax-free returns.
        </p>
      </div>

      <PPFCalculatorClient />
      <AdBanner adSlot="5010000001" adFormat="horizontal" label="Advertisement" className="mt-10" />

      {/* Rich Educational Content */}
      <section className="max-w-4xl mx-auto mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-6">Key Rules of Public Provident Fund (PPF)</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The Public Provident Fund is a government-backed, long-term savings scheme designed to offer guaranteed, sovereign returns with maximum tax advantages.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            { title: "Minimum & Maximum Deposit", desc: "Min ₹500/year, Max ₹1.5 Lakh/year in lump sum or up to 12 installments." },
            { title: "Lock-in Period", desc: "15-year maturity lock-in. Can be extended in blocks of 5 years indefinitely with or without contribution." },
            { title: "Interest Calculation Rule", desc: "Calculated monthly on the minimum balance between the 5th and the last day of each month, credited March 31st." },
            { title: "Loan & Partial Withdrawal", desc: "Loan available from Year 3 to Year 6. Partial withdrawals permitted from Year 7 onwards." },
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
              q: "When is the best date to deposit money into a PPF account?",
              a: "Always deposit on or before the 5th of the month. Since PPF interest is calculated on the lowest balance between the 5th and the end of the month, depositing before the 5th ensures you earn interest for that entire month.",
            },
            {
              q: "Can an NRI open a new PPF account?",
              a: "No, Non-Resident Indians (NRIs) cannot open a new PPF account. However, if an account was opened while a resident, it can continue until the 15-year maturity on a non-repatriable basis.",
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

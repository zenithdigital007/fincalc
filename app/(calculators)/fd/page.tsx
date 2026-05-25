import { Metadata } from "next"
import { FdCalculatorClient } from "@/components/calculators/FdCalculatorClient"
import { NewsSection } from "@/components/shared/NewsSection"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/fd`

export const metadata: Metadata = {
  title: "FD Calculator — Fixed Deposit Maturity & Interest Calculator",
  description:
    "Calculate your Fixed Deposit (FD) maturity amount and total interest earned. Enter principal, interest rate, tenure & compounding frequency to get accurate FD returns. Free FD calculator India.",
  keywords: [
    "FD calculator", "fixed deposit calculator", "FD maturity calculator India",
    "fixed deposit interest calculator", "FD return calculator", "bank FD calculator",
    "compound interest FD", "FD compound interest India", "post office FD calculator",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "FD Calculator — Fixed Deposit Maturity & Interest Calculator",
    description:
      "Calculate your FD maturity amount and total interest earned instantly. Free fixed deposit calculator with compound interest.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "FD Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FD Calculator — Loan Calculator",
    description: "Calculate your Fixed Deposit maturity amount and interest earned. Free FD calculator.",
    images: [`${SITE_URL}/og-image.png`],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "FD Calculator — Fixed Deposit Calculator",
    url: PAGE_URL,
    description:
      "Free online FD calculator. Calculate the maturity value and total interest earned on your fixed deposit with compound interest.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    browserRequirements: "Requires JavaScript",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the current FD interest rate in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "FD interest rates in India for 2024-2025 range from 5.5% to 9% per annum depending on the bank and tenure. Small finance banks often offer higher rates. Senior citizens typically get 0.25-0.50% additional interest.",
        },
      },
      {
        "@type": "Question",
        name: "How is FD compound interest calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "FD compound interest is calculated using the formula: A = P × (1 + r/n)^(n×t), where P is the principal, r is the annual interest rate, n is the number of times interest is compounded per year, and t is the tenure in years.",
        },
      },
      {
        "@type": "Question",
        name: "Is FD interest taxable in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, FD interest is taxable as per your income tax slab. TDS (Tax Deducted at Source) of 10% is deducted if annual interest exceeds ₹40,000 (₹50,000 for senior citizens). You must declare FD interest in your ITR.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "FD Calculator", item: PAGE_URL },
    ],
  },
]

export default function FdPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Fixed Deposit (FD) Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Find out how much your fixed deposit will grow over time with compound interest.
        </p>
      </div>
      <FdCalculatorClient />
      <AdBanner adSlot="5005000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
      <div className="max-w-6xl mx-auto">
        <NewsSection topic="fixed deposit FD bank savings interest rate RBI India" title="Banking & Savings News" adSlot="5005000002" />
      </div>
    </div>
  )
}

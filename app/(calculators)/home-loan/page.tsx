import { Metadata } from "next"
import { EmiCalculatorClient } from "@/components/calculators/EmiCalculatorClient"
import { NewsSection } from "@/components/shared/NewsSection"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/home-loan`

export const metadata: Metadata = {
  title: "Home Loan EMI Calculator — Calculate Monthly EMI & Interest",
  description:
    "Calculate your home loan EMI instantly. Enter loan amount, interest rate & tenure to get monthly EMI, total interest payable, and a full amortization schedule. Free home loan calculator.",
  keywords: [
    "home loan EMI calculator", "housing loan calculator", "mortgage calculator India",
    "home loan interest calculator", "EMI calculator", "home loan amortization",
    "monthly EMI calculator", "housing loan EMI India",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Home Loan EMI Calculator — Calculate Monthly EMI & Interest",
    description:
      "Instantly calculate your home loan EMI, total interest payable and view amortization schedule. Free home loan calculator.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Home Loan EMI Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Loan EMI Calculator — FinCalc",
    description: "Calculate your home loan EMI, total interest & amortization schedule instantly.",
    images: [`${SITE_URL}/og-image.png`],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Home Loan EMI Calculator",
    url: PAGE_URL,
    description:
      "Free online home loan EMI calculator. Calculate monthly EMI, total interest payable, and view full amortization schedule.",
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
        name: "How is home loan EMI calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Home loan EMI is calculated using the formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P is the principal loan amount, r is the monthly interest rate (annual rate / 12 / 100), and n is the number of monthly installments.",
        },
      },
      {
        "@type": "Question",
        name: "What is a good interest rate for a home loan in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Home loan interest rates in India typically range from 8% to 10% per annum as of 2024-2025, depending on the lender and your credit score. Rates vary by bank — SBI, HDFC, and ICICI offer competitive rates.",
        },
      },
      {
        "@type": "Question",
        name: "What is the maximum tenure for a home loan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most banks in India offer home loans with a maximum tenure of 30 years. Longer tenures reduce your monthly EMI but increase the total interest paid over the loan period.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Home Loan EMI Calculator", item: PAGE_URL },
    ],
  },
]

export default function HomeLoanPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Home Loan EMI Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Plan your home purchase by calculating your monthly EMI and understanding the interest breakdown.
        </p>
      </div>
      <EmiCalculatorClient defaultPrincipal={500000} defaultRate={7.5} defaultYears={20} />
      <AdBanner adSlot="5001000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
      <div className="max-w-6xl mx-auto">
        <NewsSection topic="home loan mortgage real estate housing India property" title="Real Estate & Mortgage News" adSlot="5001000002" />
      </div>
    </div>
  )
}

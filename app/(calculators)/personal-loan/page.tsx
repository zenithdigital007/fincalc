import { Metadata } from "next"
import { EmiCalculatorClient } from "@/components/calculators/EmiCalculatorClient"
import { NewsSection } from "@/components/shared/NewsSection"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/personal-loan`

export const metadata: Metadata = {
  title: "Personal Loan EMI Calculator — Calculate Loan EMI Instantly",
  description:
    "Calculate your personal loan EMI in seconds. Enter principal, interest rate & tenure to get monthly installment, total interest, and repayment schedule. Free personal loan calculator.",
  keywords: [
    "personal loan EMI calculator", "personal loan calculator India", "loan EMI calculator",
    "personal loan interest calculator", "instant loan EMI", "unsecured loan calculator",
    "salary loan calculator", "personal finance calculator",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Personal Loan EMI Calculator — Calculate Loan EMI Instantly",
    description:
      "Calculate your personal loan EMI instantly with our free calculator. Get monthly installment, total interest, and full repayment breakdown.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Personal Loan EMI Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Loan EMI Calculator — FinCalc",
    description: "Calculate your personal loan EMI, total interest & repayment schedule instantly.",
    images: [`${SITE_URL}/og-image.png`],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Personal Loan EMI Calculator",
    url: PAGE_URL,
    description:
      "Free online personal loan EMI calculator. Calculate monthly installment, total interest payable, and view full repayment schedule.",
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
        name: "What is the interest rate for personal loans in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Personal loan interest rates in India typically range from 10.5% to 24% per annum depending on the lender and your credit profile. Banks generally offer lower rates than NBFCs and digital lenders.",
        },
      },
      {
        "@type": "Question",
        name: "What is the maximum personal loan amount I can get?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Personal loan amounts in India typically range from ₹50,000 to ₹50 lakhs, depending on your income, credit score, employer category, and the lender's policy.",
        },
      },
      {
        "@type": "Question",
        name: "What documents are needed for a personal loan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Common documents for a personal loan include: identity proof (Aadhaar, PAN), address proof, last 3 months' salary slips, last 6 months' bank statements, and Form 16 or ITR for income verification.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Personal Loan EMI Calculator", item: PAGE_URL },
    ],
  },
]

export default function PersonalLoanPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Personal Loan EMI Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Quickly estimate your monthly payments for a personal loan.
        </p>
      </div>
      <EmiCalculatorClient defaultPrincipal={10000} defaultRate={11.5} defaultYears={3} />
      <AdBanner adSlot="5003000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
      <div className="max-w-6xl mx-auto">
        <NewsSection topic="personal loan credit lending RBI interest rate India" title="Personal Finance News" adSlot="5003000002" />
      </div>
    </div>
  )
}

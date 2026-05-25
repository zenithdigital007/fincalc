import { Metadata } from "next"
import { EmiCalculatorClient } from "@/components/calculators/EmiCalculatorClient"
import { NewsSection } from "@/components/shared/NewsSection"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/car-loan`

export const metadata: Metadata = {
  title: "Car Loan EMI Calculator — Calculate Auto Loan Monthly Payment",
  description:
    "Calculate your car loan EMI instantly. Enter loan amount, interest rate & tenure to see monthly EMI, total interest and full repayment schedule. Free car loan calculator India.",
  keywords: [
    "car loan EMI calculator", "auto loan calculator India", "vehicle loan EMI",
    "car loan interest calculator", "car finance calculator", "two wheeler loan calculator",
    "car loan monthly payment", "automobile loan India",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Car Loan EMI Calculator — Calculate Auto Loan Monthly Payment",
    description:
      "Instantly calculate your car loan EMI, total interest payable and full repayment schedule. Free auto loan calculator.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Car Loan EMI Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Loan EMI Calculator — FinCalc",
    description: "Calculate your car loan EMI, total interest & repayment schedule instantly.",
    images: [`${SITE_URL}/og-image.png`],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Car Loan EMI Calculator",
    url: PAGE_URL,
    description:
      "Free online car loan EMI calculator. Calculate monthly EMI, total interest payable, and view full repayment schedule.",
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
        name: "What is the average car loan interest rate in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Car loan interest rates in India typically range from 7.5% to 14% per annum depending on the lender, loan amount, tenure, and your credit score. Public sector banks generally offer lower rates than NBFCs.",
        },
      },
      {
        "@type": "Question",
        name: "How much car loan can I get on my salary?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most banks offer car loans up to 3x your annual salary or up to 85-90% of the on-road price of the vehicle. Your EMI should ideally not exceed 40-50% of your monthly take-home salary.",
        },
      },
      {
        "@type": "Question",
        name: "What is the maximum tenure for a car loan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Car loan tenures in India typically range from 1 to 7 years. A longer tenure means lower EMI but higher total interest cost. Most lenders cap car loans at 5-7 years.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Car Loan EMI Calculator", item: PAGE_URL },
    ],
  },
]

export default function CarLoanPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Car Loan EMI Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Find out exactly how much your new car will cost you per month.
        </p>
      </div>
      <EmiCalculatorClient defaultPrincipal={30000} defaultRate={8.5} defaultYears={5} />
      <AdBanner adSlot="5002000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
      <div className="max-w-6xl mx-auto">
        <NewsSection topic="car loan automobile vehicle auto finance India" title="Auto & Vehicle Finance News" adSlot="5002000002" />
      </div>
    </div>
  )
}

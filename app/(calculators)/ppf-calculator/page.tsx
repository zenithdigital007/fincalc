import { Metadata } from "next"
import { PPFCalculatorClient } from "@/components/calculators/PPFCalculatorClient"
import { NewsSection } from "@/components/shared/NewsSection"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/ppf-calculator`

export const metadata: Metadata = {
  title: "PPF Calculator — Public Provident Fund Maturity & Returns Calculator",
  description:
    "Calculate PPF maturity amount, total interest, and year-wise returns at the current 7.1% interest rate. Plan your PPF investments with our free Public Provident Fund calculator.",
  keywords: [
    "PPF calculator", "PPF interest calculator", "public provident fund calculator",
    "PPF maturity calculator", "PPF return calculator", "PPF 15 year calculator India",
    "PPF investment calculator", "PPF 7.1% calculator",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "PPF Calculator — Public Provident Fund Returns Calculator",
    description: "Calculate PPF maturity amount at 7.1% p.a. Plan your Public Provident Fund investments. Free PPF calculator.",
    url: PAGE_URL, type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "PPF Calculator" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org", "@type": "WebApplication",
    name: "PPF Calculator", url: PAGE_URL,
    description: "Free PPF calculator. Calculate Public Provident Fund maturity and returns at 7.1% p.a.",
    applicationCategory: "FinanceApplication", operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question", name: "What is the current PPF interest rate?",
        acceptedAnswer: { "@type": "Answer", text: "The current PPF interest rate is 7.1% per annum (as of FY 2024-25), compounded annually. The rate is set by the Government of India and revised quarterly, though it has been stable at 7.1% since April 2020." },
      },
      {
        "@type": "Question", name: "What is the minimum and maximum PPF investment?",
        acceptedAnswer: { "@type": "Answer", text: "The minimum annual investment in PPF is ₹500, and the maximum is ₹1,50,000 per financial year. You can invest in a lump sum or in instalments (up to 12 per year)." },
      },
      {
        "@type": "Question", name: "Is PPF interest tax-free?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. PPF enjoys EEE (Exempt-Exempt-Exempt) tax status. The investment qualifies for deduction under Section 80C, the interest earned is completely tax-free, and the maturity amount is also exempt from tax." },
      },
    ],
  },
  {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "PPF Calculator", item: PAGE_URL },
    ],
  },
]

export default function PPFPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">PPF Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Estimate your Public Provident Fund maturity value and total interest at the current 7.1% p.a. interest rate.
        </p>
      </div>
      <PPFCalculatorClient />
      <AdBanner adSlot="5015000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
      <div className="max-w-6xl mx-auto">
        <NewsSection topic="PPF public provident fund investment savings India government schemes" title="Government Savings Schemes News" adSlot="5015000002" />
      </div>
    </div>
  )
}

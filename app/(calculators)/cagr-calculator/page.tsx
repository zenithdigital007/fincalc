import { Metadata } from "next"
import { CAGRCalculatorClient } from "@/components/calculators/CAGRCalculatorClient"
import { NewsSection } from "@/components/shared/NewsSection"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/cagr-calculator`

export const metadata: Metadata = {
  title: "CAGR Calculator — Compound Annual Growth Rate Calculator Online Free",
  description:
    "Calculate CAGR (Compound Annual Growth Rate) instantly. Enter initial value, final value, and time period to get the annualised growth rate. Free CAGR calculator for investments, mutual funds & stocks.",
  keywords: [
    "CAGR calculator", "compound annual growth rate calculator", "CAGR formula",
    "investment CAGR", "mutual fund CAGR", "stock return CAGR", "CAGR calculator India",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "CAGR Calculator — Compound Annual Growth Rate Online Free",
    description: "Calculate CAGR for any investment. Enter initial and final values to get annualised growth rate instantly.",
    url: PAGE_URL, type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "CAGR Calculator" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org", "@type": "WebApplication",
    name: "CAGR Calculator", url: PAGE_URL,
    description: "Free CAGR calculator. Calculate compound annual growth rate for any investment.",
    applicationCategory: "FinanceApplication", operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question", name: "What is CAGR?",
        acceptedAnswer: { "@type": "Answer", text: "CAGR (Compound Annual Growth Rate) is the rate at which an investment grows from its initial value to its final value over a specified period, assuming the profits are reinvested each year. Formula: CAGR = (Final Value / Initial Value)^(1/Years) - 1" },
      },
      {
        "@type": "Question", name: "What is a good CAGR for mutual funds?",
        acceptedAnswer: { "@type": "Answer", text: "For equity mutual funds in India, a CAGR of 12-15% over 10+ years is considered good. Large-cap funds typically deliver 10-13%, while mid-cap and small-cap funds may deliver 15-20% over long periods. Always compare against the benchmark index." },
      },
    ],
  },
  {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "CAGR Calculator", item: PAGE_URL },
    ],
  },
]

export default function CAGRPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">CAGR Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Calculate the Compound Annual Growth Rate (CAGR) of any investment — mutual funds, stocks, real estate, or business revenue.
        </p>
      </div>
      <CAGRCalculatorClient />
      <AdBanner adSlot="5012000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
      <div className="max-w-6xl mx-auto">
        <NewsSection topic="mutual fund investment stock market returns CAGR India" title="Investment & Markets News" adSlot="5012000002" />
      </div>
    </div>
  )
}

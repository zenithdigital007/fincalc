import { Metadata } from "next"
import { SipCalculatorClient } from "@/components/calculators/SipCalculatorClient"
import { NewsSection } from "@/components/shared/NewsSection"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/sip`

export const metadata: Metadata = {
  title: "SIP Calculator — Calculate Mutual Fund SIP Returns Online Free",
  description:
    "Calculate your SIP (Systematic Investment Plan) returns instantly. Enter monthly investment, expected return rate & tenure to see total invested amount and estimated wealth created. Free SIP calculator.",
  keywords: [
    "SIP calculator", "systematic investment plan calculator", "mutual fund SIP returns",
    "SIP return calculator India", "SIP investment calculator", "monthly SIP calculator",
    "SIP maturity calculator", "ELSS SIP calculator", "SIP compound interest calculator",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "SIP Calculator — Calculate Mutual Fund SIP Returns Online Free",
    description:
      "Calculate SIP returns instantly. See how your monthly investment grows into wealth with our free Systematic Investment Plan calculator.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "SIP Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SIP Calculator — Loan Calculator",
    description: "Calculate your SIP returns and see how your mutual fund investments grow. Free SIP calculator.",
    images: [`${SITE_URL}/og-image.png`],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SIP Calculator",
    url: PAGE_URL,
    description:
      "Free online SIP calculator. Calculate the future value of your Systematic Investment Plan (SIP) in mutual funds.",
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
        name: "What is a SIP (Systematic Investment Plan)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A SIP (Systematic Investment Plan) is a method of investing a fixed amount in mutual funds at regular intervals (typically monthly). It allows investors to build wealth gradually through disciplined investing and benefits from rupee cost averaging and the power of compounding.",
        },
      },
      {
        "@type": "Question",
        name: "How much return can I expect from a SIP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Historically, equity mutual funds in India have delivered 12-15% annualized returns over long periods of 10+ years, though returns are not guaranteed. Debt funds typically return 6-8%. The SIP calculator uses your assumed rate to project returns.",
        },
      },
      {
        "@type": "Question",
        name: "What is the minimum amount to start a SIP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most mutual funds in India allow SIPs starting from as low as ₹500 per month. Some funds have a minimum of ₹100. You can start small and increase your SIP amount as your income grows.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "SIP Calculator", item: PAGE_URL },
    ],
  },
]

export default function SipPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">SIP Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Estimate the wealth you can create by making regular monthly investments.
        </p>
      </div>
      <SipCalculatorClient />
      <AdBanner adSlot="5004000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
      <div className="max-w-6xl mx-auto">
        <NewsSection topic="SIP mutual fund investment stock market SEBI returns India" title="Investment & Markets News" adSlot="5004000002" />
      </div>
    </div>
  )
}

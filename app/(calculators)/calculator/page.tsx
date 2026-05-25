import { Metadata } from "next"
import { NormalCalculatorClient } from "@/components/calculators/NormalCalculatorClient"
import { NewsSection } from "@/components/shared/NewsSection"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/calculator`

export const metadata: Metadata = {
  title: "Free Online Calculator — Fast Arithmetic with History",
  description:
    "Free online calculator with full keyboard support and calculation history. Supports addition, subtraction, multiplication, division, and percentages. Fast, simple, and easy to use.",
  keywords: [
    "online calculator", "free calculator", "calculator online", "simple calculator",
    "arithmetic calculator", "basic calculator online", "percentage calculator",
    "keyboard calculator", "math calculator online", "calculator with history",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Free Online Calculator — Fast Arithmetic with History",
    description:
      "Free online calculator with keyboard support and calculation history. Addition, subtraction, multiplication, division, and percentages.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Free Online Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Calculator — FinCalc",
    description: "Fast, free online calculator with keyboard support and history. Do arithmetic instantly.",
    images: [`${SITE_URL}/og-image.png`],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Online Calculator",
    url: PAGE_URL,
    description:
      "Free online calculator with full keyboard support and calculation history. Supports basic arithmetic operations.",
    applicationCategory: "UtilitiesApplication",
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
        name: "Can I use this calculator with a keyboard?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! This online calculator fully supports keyboard input. Use number keys, +, -, *, / for operators, Enter or = to calculate, Backspace to delete, and Escape to clear.",
        },
      },
      {
        "@type": "Question",
        name: "Does this calculator save calculation history?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the calculator keeps a running history of your recent calculations during your session, so you can refer back to previous results.",
        },
      },
      {
        "@type": "Question",
        name: "What operations does this calculator support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This calculator supports addition (+), subtraction (−), multiplication (×), division (÷), percentage (%), and decimal numbers. For advanced math functions, try the Scientific Calculator.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Calculator", item: PAGE_URL },
    ],
  },
]

export default function NormalCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Calculator</h1>
        <p className="text-lg text-muted-foreground">
          A fast and elegant calculator with full keyboard support and calculation history.
        </p>
      </div>
      <NormalCalculatorClient />
      <AdBanner adSlot="5007000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
      <div className="max-w-6xl mx-auto">
        <NewsSection
          topic="calculator arithmetic mathematics education tools productivity"
          title="Math & Technology News"
          adSlot="5007000002"
        />
      </div>
    </div>
  )
}

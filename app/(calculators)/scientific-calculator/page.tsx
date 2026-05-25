import { Metadata } from "next"
import { ScientificCalculatorClient } from "@/components/calculators/ScientificCalculatorClient"
import { NewsSection } from "@/components/shared/NewsSection"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/scientific-calculator`

export const metadata: Metadata = {
  title: "Scientific Calculator Online — Trig, Logarithm, Constants Free",
  description:
    "Free advanced scientific calculator online. Supports trigonometric functions (sin, cos, tan), logarithms (log, ln), factorial, powers, square root, constants (π, e), and memory functions. Full keyboard support.",
  keywords: [
    "scientific calculator online", "free scientific calculator", "trigonometry calculator",
    "sin cos tan calculator", "logarithm calculator online", "log calculator",
    "scientific calculator with steps", "advanced math calculator", "engineering calculator online",
    "factorial calculator", "square root calculator online",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Scientific Calculator Online — Trig, Logarithm, Constants Free",
    description:
      "Free advanced scientific calculator. Supports sin, cos, tan, log, ln, factorial, powers, π, e, and memory functions. Full keyboard support.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Scientific Calculator Online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scientific Calculator Online — FinCalc",
    description: "Free advanced scientific calculator with trig, log, constants, and memory functions.",
    images: [`${SITE_URL}/og-image.png`],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Scientific Calculator",
    url: PAGE_URL,
    description:
      "Free online scientific calculator with trigonometric functions, logarithms, factorial, constants (π, e), and memory functions.",
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
        name: "What functions does the scientific calculator support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This scientific calculator supports: trigonometric functions (sin, cos, tan, and their inverses), logarithms (log base 10, natural log ln), factorial (!), powers and roots, mathematical constants π and e, memory functions (M+, M-, MR, MC), and basic arithmetic.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use degrees and radians?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the scientific calculator supports both degree (DEG) and radian (RAD) modes for trigonometric calculations. You can switch between modes using the DEG/RAD toggle button.",
        },
      },
      {
        "@type": "Question",
        name: "Does this scientific calculator support keyboard input?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the scientific calculator supports keyboard input for numbers and basic operations. Use number keys, +, -, *, / for operators, and Enter to calculate.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Scientific Calculator", item: PAGE_URL },
    ],
  },
]

export default function ScientificCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-5xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Scientific Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Advanced calculations with trigonometry, logarithms, memory functions, and mathematical constants.
        </p>
      </div>
      <ScientificCalculatorClient />
      <AdBanner adSlot="5008000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
      <div className="max-w-6xl mx-auto">
        <NewsSection
          topic="science mathematics trigonometry physics engineering research"
          title="Science & Engineering News"
          adSlot="5008000002"
        />
      </div>
    </div>
  )
}

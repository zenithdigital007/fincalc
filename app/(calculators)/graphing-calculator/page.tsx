import { Metadata } from "next"
import { GraphingCalculatorClient } from "@/components/calculators/GraphingCalculatorClient"
import { NewsSection } from "@/components/shared/NewsSection"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/graphing-calculator`

export const metadata: Metadata = {
  title: "Graphing Calculator Online — Plot Math Functions Free",
  description:
    "Free online graphing calculator. Plot and visualize mathematical functions like sin(x), x², cos(x), tan(x) interactively. Supports up to 3 simultaneous functions with custom x-range. No download needed.",
  keywords: [
    "graphing calculator online", "free graphing calculator", "function plotter online",
    "math graphing calculator", "plot mathematical functions", "interactive graph calculator",
    "graph sin cos tan online", "quadratic function grapher", "online function visualizer",
    "desmos alternative free", "math function plotter",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Graphing Calculator Online — Plot Math Functions Free",
    description:
      "Plot and visualize mathematical functions interactively. Free online graphing calculator — no download needed. Supports sin, cos, tan, x², and more.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Graphing Calculator Online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Graphing Calculator Online — FinCalc",
    description: "Free online graphing calculator. Plot sin(x), cos(x), x², and more interactively.",
    images: [`${SITE_URL}/og-image.png`],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Graphing Calculator",
    url: PAGE_URL,
    description:
      "Free online graphing calculator. Plot and visualize up to 3 mathematical functions simultaneously on an interactive graph.",
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
        name: "What functions can I plot with this graphing calculator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can plot any mathematical function of x, including trigonometric functions (sin(x), cos(x), tan(x)), polynomials (x^2, x^3), exponentials (e^x), logarithms (log(x)), and combinations of these. You can plot up to 3 functions simultaneously.",
        },
      },
      {
        "@type": "Question",
        name: "How do I enter functions in the graphing calculator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Enter functions using standard mathematical notation: use x as the variable, ^ for exponents (e.g., x^2), * for multiplication, and standard function names like sin(x), cos(x), tan(x), log(x), sqrt(x), and abs(x).",
        },
      },
      {
        "@type": "Question",
        name: "Can I customize the x-axis range?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can set a custom x-axis range using the min and max x-value inputs. This allows you to zoom into specific regions of the graph or view the function over a wider range.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Graphing Calculator", item: PAGE_URL },
    ],
  },
]

export default function GraphingCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Graphing Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Visualize and plot mathematical functions. Enter up to 3 functions and see them rendered on an interactive graph.
        </p>
      </div>
      <GraphingCalculatorClient />
      <AdBanner adSlot="5009000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
      <div className="max-w-6xl mx-auto">
        <NewsSection
          topic="data visualization mathematics graphing functions calculus charts"
          title="Data Visualization & Math News"
          adSlot="5009000002"
        />
      </div>
    </div>
  )
}

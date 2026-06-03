import { Metadata } from "next"
import { GSTCalculatorClient } from "@/components/calculators/GSTCalculatorClient"
import { NewsSection } from "@/components/shared/NewsSection"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/gst-calculator`

export const metadata: Metadata = {
  title: "GST Calculator — Add or Remove GST Online Free (5%, 12%, 18%, 28%)",
  description:
    "Calculate GST instantly. Add GST to get the final price, or remove GST to find the base amount. Supports all Indian GST slabs: 5%, 12%, 18%, 28%. Free online GST calculator.",
  keywords: [
    "GST calculator", "GST calculator India", "add GST", "remove GST", "inclusive GST calculator",
    "exclusive GST calculator", "GST rate calculator", "18% GST calculator", "28% GST",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "GST Calculator — Add or Remove GST Online Free",
    description: "Instantly add or remove GST (5%, 12%, 18%, 28%) from any amount. Free online GST calculator for India.",
    url: PAGE_URL, type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "GST Calculator India" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org", "@type": "WebApplication",
    name: "GST Calculator", url: PAGE_URL,
    description: "Free online GST calculator. Add or remove GST for all Indian tax slabs.",
    applicationCategory: "FinanceApplication", operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question", name: "What are the GST slabs in India?",
        acceptedAnswer: { "@type": "Answer", text: "India has four main GST slabs: 5% (essential goods like packaged food), 12% (processed foods, computers), 18% (most services, restaurants, electronics), and 28% (luxury goods, cars, tobacco)." },
      },
      {
        "@type": "Question", name: "How do I calculate GST on a price?",
        acceptedAnswer: { "@type": "Answer", text: "To add GST: GST Amount = Price × (GST Rate / 100); Final Price = Price + GST Amount. To remove GST from an inclusive price: Base Price = Inclusive Price / (1 + GST Rate / 100)." },
      },
      {
        "@type": "Question", name: "Is GST applicable on all goods and services?",
        acceptedAnswer: { "@type": "Answer", text: "Most goods and services in India are taxable under GST. However, some items are exempt: unprocessed agricultural produce, milk, fresh vegetables, healthcare services, and educational services are either exempt or taxed at 0%." },
      },
    ],
  },
  {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "GST Calculator", item: PAGE_URL },
    ],
  },
]

export default function GSTPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">GST Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Add or remove GST from any amount. Supports all Indian GST slabs — 5%, 12%, 18%, and 28%.
        </p>
      </div>
      <GSTCalculatorClient />
      <AdBanner adSlot="5010000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
      <div className="max-w-6xl mx-auto">
        <NewsSection topic="GST tax India goods services finance business" title="GST & Tax News" adSlot="5010000002" />
      </div>
    </div>
  )
}

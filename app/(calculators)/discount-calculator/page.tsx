import { Metadata } from "next"
import { DiscountCalculatorClient } from "@/components/calculators/DiscountCalculatorClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/discount-calculator`

export const metadata: Metadata = {
  title: "Discount Calculator — Calculate Sale Price & Savings Online Free",
  description:
    "Calculate discounted price and savings instantly. Enter original price and discount percentage to find the final price and amount saved. Free discount calculator for shopping, retail, and GST deals.",
  keywords: [
    "discount calculator", "sale price calculator", "percentage discount calculator",
    "discount amount calculator online", "how much do I save calculator", "price after discount calculator",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Discount Calculator — Find Sale Price & Savings Instantly",
    description: "Enter original price and discount % to see final price and savings. Free discount calculator online.",
    url: PAGE_URL, type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Discount Calculator" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org", "@type": "WebApplication",
    name: "Discount Calculator", url: PAGE_URL,
    description: "Free discount calculator. Find discounted price and savings for any percentage off.",
    applicationCategory: "UtilityApplication", operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Discount Calculator", item: PAGE_URL },
    ],
  },
]

export default function DiscountPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Discount Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Quickly find out how much you save and what you pay after any discount. Perfect for sales, shopping, and price comparisons.
        </p>
      </div>
      <DiscountCalculatorClient />
      <AdBanner adSlot="5024000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
    </div>
  )
}

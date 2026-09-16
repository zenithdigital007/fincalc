import { Metadata } from "next"
import { DiscountCalculatorClient } from "@/components/calculators/DiscountCalculatorClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/discount-calculator`

export const metadata: Metadata = {
  title: "Discount Calculator — Calculate Sale Price, Savings & Double Discounts",
  description:
    "Free online Discount Calculator. Calculate final sale price, money saved, stacked double discounts, and sales tax additions for shopping sales instantly.",
  keywords: [
    "discount calculator", "sale price calculator", "percent off calculator",
    "calculate discount online", "double discount calculator", "shopping savings calculator",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Discount Calculator — Calculate Final Price & Savings",
    description: "Calculate percentage discounts, savings amount, and final checkout price. Free discount calculator.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Discount Calculator" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Discount Calculator",
    url: PAGE_URL,
    description: "Free Discount Calculator for shopping sales, percentage off and stacked coupons.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do you calculate a discount?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Savings Amount = Original Price × (Discount Rate / 100). Final Price = Original Price - Savings Amount.",
        },
      },
      {
        "@type": "Question",
        name: "How do stacked or double discounts work (e.g. 50% + 20% off)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Stacked discounts are applied sequentially, not added together. 50% off ₹1,000 reduces it to ₹500. An additional 20% off applies to ₹500, giving a final price of ₹400 (equivalent to a 60% total discount, not 70%).",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
          Find out the final discounted price, amount saved, and additional stacked discount savings.
        </p>
      </div>

      <DiscountCalculatorClient />
      <AdBanner adSlot="5024000001" adFormat="horizontal" label="Advertisement" className="mt-10" />

      {/* Rich Educational Content */}
      <section className="max-w-4xl mx-auto mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-6">How Discount Calculations Work</h2>
        <div className="bg-muted/50 border border-border rounded-xl p-6 mb-6 font-mono text-sm">
          <p>Discount Saved = Original Price × ( Discount % ÷ 100 )</p>
          <p className="mt-2">Final Sale Price = Original Price − Discount Saved</p>
        </div>

        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6 mb-8">
          {[
            {
              q: "Is 'Buy 1 Get 1 Free' better than 50% off?",
              a: "'Buy 1 Get 1 Free' is mathematically identical to a 50% discount when purchasing two items of equal value. However, 50% off is more flexible because you only need to purchase one single item.",
            },
            {
              q: "How do you calculate the original price from a discounted price?",
              a: "Original Price = Sale Price / [1 - (Discount % / 100)]. For example, an item bought at ₹800 after 20% discount had an original price of 800 / 0.8 = ₹1,000.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="border-b border-border pb-6 last:border-0">
              <h3 className="font-semibold mb-2 text-base">{q}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

import { Metadata } from "next"
import { GSTCalculatorClient } from "@/components/calculators/GSTCalculatorClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/gst-calculator`

export const metadata: Metadata = {
  title: "GST Calculator India — Calculate Inclusive & Exclusive GST Online",
  description:
    "Free online GST calculator for India. Calculate GST inclusive and exclusive amounts, CGST, SGST, IGST for 0%, 5%, 12%, 18%, and 28% tax slabs instantly.",
  keywords: [
    "GST calculator", "GST calculator India", "calculate GST online", "inclusive GST calculator",
    "exclusive GST calculator", "CGST SGST calculator", "18 percent GST calculator",
    "GST reverse calculator", "goods and services tax calculator",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "GST Calculator India — Calculate Inclusive & Exclusive GST Online",
    description: "Calculate GST amounts instantly with CGST, SGST and IGST breakdown. Free GST calculator for all Indian tax slabs.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "GST Calculator" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "GST Calculator India",
    url: PAGE_URL,
    description: "Free GST calculator for India. Supports 0%, 5%, 12%, 18%, 28% slabs with inclusive/exclusive calculations.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is GST calculated (Exclusive GST)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For GST Exclusive price: GST Amount = (Base Amount × GST Rate) / 100. Total Price = Base Amount + GST Amount.",
        },
      },
      {
        "@type": "Question",
        name: "How is Inclusive GST (Reverse GST) calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For GST Inclusive price: Base Amount = (Total Price × 100) / (100 + GST Rate). GST Amount = Total Price - Base Amount.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between CGST, SGST, and IGST?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For intra-state transactions (within same state), GST is split equally between Central GST (CGST) and State GST (SGST). For inter-state transactions (between different states), Integrated GST (IGST) applies entirely to the Centre.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "GST Calculator", item: PAGE_URL },
    ],
  },
]

export default function GstPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">GST Calculator India</h1>
        <p className="text-lg text-muted-foreground">
          Calculate GST Inclusive or Exclusive amounts, CGST, SGST, and IGST for all Indian tax slabs.
        </p>
      </div>

      <GSTCalculatorClient />
      <AdBanner adSlot="5020000001" adFormat="horizontal" label="Advertisement" className="mt-10" />

      {/* Rich Educational Content */}
      <section className="max-w-4xl mx-auto mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-6">How GST is Calculated in India</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The Goods and Services Tax (GST) is a unified, destination-based indirect tax in India. Depending on whether your base price already includes tax or not, you use one of two mathematical equations:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-card border border-border rounded-xl">
            <h3 className="font-semibold text-lg mb-2">1. GST Exclusive (Add GST)</h3>
            <p className="text-xs text-muted-foreground mb-3">When base price does NOT include tax:</p>
            <div className="bg-muted p-3 rounded font-mono text-xs mb-3 space-y-1">
              <p>GST Amount = (Base Amount × Rate) ÷ 100</p>
              <p>Total Invoice = Base Amount + GST Amount</p>
            </div>
            <p className="text-xs text-muted-foreground">
              <strong>Example:</strong> Base ₹1,000 with 18% GST → Tax = ₹180, Total = <strong>₹1,180</strong>.
            </p>
          </div>

          <div className="p-6 bg-card border border-border rounded-xl">
            <h3 className="font-semibold text-lg mb-2">2. GST Inclusive (Remove / Reverse GST)</h3>
            <p className="text-xs text-muted-foreground mb-3">When the retail price already includes tax:</p>
            <div className="bg-muted p-3 rounded font-mono text-xs mb-3 space-y-1">
              <p>Base Amount = (Total × 100) ÷ (100 + Rate)</p>
              <p>GST Amount = Total − Base Amount</p>
            </div>
            <p className="text-xs text-muted-foreground">
              <strong>Example:</strong> MRP ₹1,180 with 18% GST → Base = ₹1,000, Tax = <strong>₹180</strong>.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Current GST Tax Slabs in India</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="text-left p-3 border border-border font-semibold">Tax Slab</th>
                <th className="text-left p-3 border border-border font-semibold">CGST + SGST Split</th>
                <th className="text-left p-3 border border-border font-semibold">Common Eligible Goods & Services</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["0% (Exempt)", "0% + 0%", "Fresh vegetables, unbranded foodgrains, milk, salt, healthcare, education"],
                ["5%", "2.5% + 2.5%", "Packaged food items, footwear & apparel under ₹1000, economy air travel, railway tickets"],
                ["12%", "6% + 6%", "Business class air travel, processed food, mobile phones, computers"],
                ["18% (Standard)", "9% + 9%", "IT services, restaurants, telecom, banking & financial services, capital goods"],
                ["28% (Luxury / Sin)", "14% + 14%", "Automobiles, luxury items, tobacco, aerated drinks, betting/gaming (+ cess)"],
              ].map(([slab, split, items]) => (
                <tr key={slab} className="border-b border-border">
                  <td className="p-3 border border-border font-medium">{slab}</td>
                  <td className="p-3 border border-border font-mono text-xs">{split}</td>
                  <td className="p-3 border border-border text-muted-foreground text-xs">{items}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6 mb-8">
          {[
            {
              q: "Who is required to register for GST in India?",
              a: "Businesses with an aggregate annual turnover exceeding ₹40 lakh for goods (₹20 lakh for special category states) and ₹20 lakh for services (₹10 lakh for special states) must register for GST.",
            },
            {
              q: "What is the Input Tax Credit (ITC)?",
              a: "Input Tax Credit allows a registered business to reduce the GST paid on purchases (inputs) from the GST collected on sales (output tax liability), eliminating double taxation.",
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

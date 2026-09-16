import { Metadata } from "next"
import { CAGRCalculatorClient } from "@/components/calculators/CAGRCalculatorClient"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/cagr-calculator`

export const metadata: Metadata = {
  title: "CAGR Calculator — Calculate Compound Annual Growth Rate Online",
  description:
    "Free online CAGR calculator. Calculate the Compound Annual Growth Rate and absolute returns of your investments, business revenue, or mutual funds accurately.",
  keywords: [
    "CAGR calculator", "compound annual growth rate calculator", "calculate CAGR online",
    "annualized return calculator", "investment CAGR calculator", "business revenue growth rate",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "CAGR Calculator — Calculate Compound Annual Growth Rate Online",
    description: "Calculate Compound Annual Growth Rate (CAGR) and absolute return for your investments. Free CAGR calculator.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "CAGR Calculator" }],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CAGR Calculator",
    url: PAGE_URL,
    description: "Free CAGR calculator. Calculate compound annual growth rate and absolute growth.",
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
        name: "What is CAGR (Compound Annual Growth Rate)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CAGR is the mean annual growth rate of an investment over a specified period of time longer than one year. It smooths out fluctuations and gives a steady annualized rate of return.",
        },
      },
      {
        "@type": "Question",
        name: "What is the formula to calculate CAGR?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CAGR = (End Value / Beginning Value)^(1 / Years) - 1. Multiply by 100 to express as a percentage.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between Absolute Return and CAGR?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolute return measures the total percentage gain or loss without considering time duration. CAGR accounts for the time period and compounding, making multi-year investments comparable.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "CAGR Calculator", item: PAGE_URL },
    ],
  },
]

export default function CagrPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">CAGR Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Calculate the Compound Annual Growth Rate (CAGR) and annualized returns of your investments.
        </p>
      </div>

      <CAGRCalculatorClient />
      <AdBanner adSlot="5006000001" adFormat="horizontal" label="Advertisement" className="mt-10" />

      {/* Rich Educational Content */}
      <section className="max-w-4xl mx-auto mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-6">What is CAGR and How is it Calculated?</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The <strong>Compound Annual Growth Rate (CAGR)</strong> is the standard metric used by financial analysts, investors, and business leaders to measure the smoothed annual return of an investment or metric over multiple years.
        </p>

        <div className="bg-muted/50 border border-border rounded-xl p-6 mb-6 font-mono text-sm">
          CAGR = [ ( End Value / Start Value ) ^ ( 1 / n ) − 1 ] × 100
          <div className="mt-3 text-xs text-muted-foreground font-sans space-y-1">
            <p><strong>End Value</strong> = Final investment value</p>
            <p><strong>Start Value</strong> = Initial principal invested</p>
            <p><strong>n</strong> = Number of investment years</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Absolute Return vs CAGR Comparison</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="text-left p-3 border border-border font-semibold">Metric</th>
                <th className="text-left p-3 border border-border font-semibold">Absolute Return</th>
                <th className="text-left p-3 border border-border font-semibold">CAGR (Annualized)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Formula", "[(End - Start) / Start] × 100", "[(End / Start)^(1/n) - 1] × 100"],
                ["Time Factor", "Ignores time taken completely", "Normalizes returns per year"],
                ["Best Used For", "Short-term investments (< 1 year)", "Long-term assets (> 1-10+ years)"],
                ["Example (₹1L to ₹2L in 5 yrs)", "100% Total Gain", "14.87% per year CAGR"],
              ].map(([metric, abs, cagr]) => (
                <tr key={metric} className="border-b border-border">
                  <td className="p-3 border border-border font-medium">{metric}</td>
                  <td className="p-3 border border-border text-muted-foreground">{abs}</td>
                  <td className="p-3 border border-border font-semibold text-primary">{cagr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6 mb-8">
          {[
            {
              q: "Can CAGR be negative?",
              a: "Yes. If the ending value is less than the beginning value, the CAGR will be a negative percentage, indicating an annualized loss over that duration.",
            },
            {
              q: "Why is CAGR better than Average Annual Return?",
              a: "Average annual return can be misleading due to volatility. For example, a 100% gain followed by a 50% loss yields a simple average of 25%, but you actually ended up with zero net gain (CAGR = 0%). CAGR reflects true compounded reality.",
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

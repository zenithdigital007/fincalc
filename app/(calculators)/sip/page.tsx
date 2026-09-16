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
        name: "How is SIP return calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SIP returns are calculated using the compound interest future value annuity formula: M = P × ({[1 + i]^n - 1} / i) × (1 + i), where P is monthly investment, i is monthly return rate (annual rate / 12 / 100), and n is the total number of monthly payments.",
        },
      },
      {
        "@type": "Question",
        name: "How much return can I expect from a mutual fund SIP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Historically, broad-market Indian equity mutual funds (Nifty 50, flexi-cap, large & mid-cap) have delivered 12% to 15% CAGR over 10-15 year horizons. Debt mutual funds generally yield 6% to 8%.",
        },
      },
      {
        "@type": "Question",
        name: "What is Rupee Cost Averaging in SIP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rupee cost averaging means you buy more fund units when market prices are low and fewer units when prices are high. Over the long term, this lowers your average acquisition cost per unit without needing to time the market.",
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
          Estimate the wealth you can create through disciplined monthly mutual fund investments.
        </p>
      </div>

      <SipCalculatorClient />
      <AdBanner adSlot="5004000001" adFormat="horizontal" label="Advertisement" className="mt-10" />

      {/* Rich Educational Content */}
      <section className="max-w-4xl mx-auto mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-6">How Does a SIP Calculator Work?</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A Systematic Investment Plan (SIP) is one of the most effective ways for retail investors to participate in equity mutual funds. By investing a predetermined amount every month, you benefit from compounded growth and mitigate market volatility through rupee cost averaging.
        </p>

        <div className="bg-muted/50 border border-border rounded-xl p-6 mb-6 font-mono text-sm">
          M = P × [ ( (1 + i)ⁿ − 1 ) / i ] × (1 + i)
          <div className="mt-3 text-xs text-muted-foreground font-sans space-y-1">
            <p><strong>M</strong> = Maturity Amount (Future Value)</p>
            <p><strong>P</strong> = Monthly investment amount (₹)</p>
            <p><strong>i</strong> = Periodic monthly interest rate = Annual rate ÷ 12 ÷ 100</p>
            <p><strong>n</strong> = Total number of monthly installments (Tenure in years × 12)</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">The Power of Compounding: SIP Growth Illustration</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The table below demonstrates how a regular monthly SIP of ₹10,000 grows over different time horizons assuming a 12% annual return:
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="text-left p-3 border border-border font-semibold">Tenure</th>
                <th className="text-left p-3 border border-border font-semibold">Total Invested</th>
                <th className="text-left p-3 border border-border font-semibold">Estimated Gains</th>
                <th className="text-left p-3 border border-border font-semibold">Total Maturity Value</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["5 Years", "₹6,00,000", "₹2,24,864", "₹8,24,864"],
                ["10 Years", "₹12,00,000", "₹11,23,391", "₹23,23,391"],
                ["15 Years", "₹18,00,000", "₹32,45,760", "₹50,45,760"],
                ["20 Years", "₹24,00,000", "₹75,91,479", "₹99,91,479"],
                ["25 Years", "₹30,00,000", "₹1,59,76,351", "₹1,89,76,351"],
              ].map(([tenure, invested, gains, total]) => (
                <tr key={tenure} className="border-b border-border">
                  <td className="p-3 border border-border font-medium">{tenure}</td>
                  <td className="p-3 border border-border text-muted-foreground">{invested}</td>
                  <td className="p-3 border border-border text-green-600 dark:text-green-400 font-medium">{gains}</td>
                  <td className="p-3 border border-border font-semibold">{total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mb-6">Key Benefits of SIP Investing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            {
              title: "Rupee Cost Averaging",
              desc: "Automates buy-the-dip strategy. When NAV falls, you receive more units; when NAV rises, your existing units increase in value.",
            },
            {
              title: "Financial Discipline",
              desc: "Encourages a 'pay yourself first' mentality by automating monthly deductions right after salary credit.",
            },
            {
              title: "No Need to Time the Market",
              desc: "Removes emotional decision-making. Staying invested across market cycles yields better risk-adjusted returns.",
            },
            {
              title: "Step-Up SIP Flexibility",
              desc: "You can increase your SIP by 10% each year as your income grows, significantly multiplying your ultimate retirement corpus.",
            },
          ].map(({ title, desc }) => (
            <div key={title} className="p-5 bg-card border border-border rounded-xl">
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6 mb-8">
          {[
            {
              q: "What is the difference between SIP and Lumpsum investment?",
              a: "In a SIP, you invest a fixed amount periodically (e.g. monthly), which minimizes timing risk. In a Lumpsum investment, you invest the entire amount at once, which performs best when markets are undervalued.",
            },
            {
              q: "Can I stop or pause my SIP anytime?",
              a: "Yes. Mutual fund SIPs in open-ended schemes carry no lock-in (except ELSS tax-saving funds which have a 3-year lock-in). You can pause, modify, or stop your SIP anytime without penalty.",
            },
            {
              q: "Are mutual fund SIP returns taxable in India?",
              a: "Yes. Equity fund gains held for more than 1 year are classified as Long Term Capital Gains (LTCG) and taxed at 12.5% on gains exceeding ₹1.25 lakh per financial year. Short-term gains (under 1 year) are taxed at 20%.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="border-b border-border pb-6 last:border-0">
              <h3 className="font-semibold mb-2 text-base">{q}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto">
        <NewsSection topic="SIP mutual fund investment stock market SEBI returns India" title="Investment & Markets News" adSlot="5004000002" />
      </div>
    </div>
  )
}

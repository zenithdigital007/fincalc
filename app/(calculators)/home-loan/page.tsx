import { Metadata } from "next"
import { EmiCalculatorClient } from "@/components/calculators/EmiCalculatorClient"
import { NewsSection } from "@/components/shared/NewsSection"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/home-loan`

export const metadata: Metadata = {
  title: "Home Loan EMI Calculator — Calculate Monthly EMI & Interest",
  description:
    "Calculate your home loan EMI instantly. Enter loan amount, interest rate & tenure to get monthly EMI, total interest payable, and a full amortization schedule. Free home loan calculator.",
  keywords: [
    "home loan EMI calculator", "housing loan calculator", "mortgage calculator India",
    "home loan interest calculator", "EMI calculator", "home loan amortization",
    "monthly EMI calculator", "housing loan EMI India",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Home Loan EMI Calculator — Calculate Monthly EMI & Interest",
    description:
      "Instantly calculate your home loan EMI, total interest payable and view amortization schedule. Free home loan calculator.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Home Loan EMI Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Loan EMI Calculator — Loan Calculator",
    description: "Calculate your home loan EMI, total interest & amortization schedule instantly.",
    images: [`${SITE_URL}/og-image.png`],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Home Loan EMI Calculator",
    url: PAGE_URL,
    description:
      "Free online home loan EMI calculator. Calculate monthly EMI, total interest payable, and view full amortization schedule.",
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
        name: "How is home loan EMI calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Home loan EMI is calculated using the formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P is the principal loan amount, r is the monthly interest rate (annual rate / 12 / 100), and n is the number of monthly installments.",
        },
      },
      {
        "@type": "Question",
        name: "What is a good interest rate for a home loan in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Home loan interest rates in India typically range from 8% to 10% per annum as of 2024-2025, depending on the lender and your credit score. Rates vary by bank — SBI, HDFC, and ICICI offer competitive rates.",
        },
      },
      {
        "@type": "Question",
        name: "What is the maximum tenure for a home loan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most banks in India offer home loans with a maximum tenure of 30 years. Longer tenures reduce your monthly EMI but increase the total interest paid over the loan period.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Home Loan EMI Calculator", item: PAGE_URL },
    ],
  },
]

export default function HomeLoanPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Home Loan EMI Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Plan your home purchase by calculating your monthly EMI and understanding the interest breakdown.
        </p>
      </div>
      <EmiCalculatorClient defaultPrincipal={500000} defaultRate={7.5} defaultYears={20} />
      <AdBanner adSlot="5001000001" adFormat="horizontal" label="Advertisement" className="mt-10" />

      {/* ── Educational Content Section ── */}
      <section className="max-w-4xl mx-auto mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-6">How Home Loan EMI is Calculated</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Your Home Loan EMI (Equated Monthly Instalment) is calculated using a standard mathematical formula that considers
          three variables: the principal loan amount, the annual interest rate, and the loan tenure in months.
        </p>
        <div className="bg-muted/50 border border-border rounded-xl p-6 mb-6 font-mono text-sm">
          EMI = [P × r × (1 + r)ⁿ] / [(1 + r)ⁿ − 1]
          <div className="mt-3 text-xs text-muted-foreground font-sans space-y-1">
            <p><strong>P</strong> = Principal loan amount (₹)</p>
            <p><strong>r</strong> = Monthly interest rate = Annual rate ÷ 12 ÷ 100</p>
            <p><strong>n</strong> = Loan tenure in months</p>
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-8">
          For example, on a ₹50 lakh loan at 8.75% p.a. for 20 years: the monthly rate r = 0.087500/12 = 0.007292,
          n = 240 months, giving an EMI of approximately <strong>₹44,105</strong>. The total amount paid over 20 years would be
          ₹1,05,85,200 — meaning you pay ₹55,85,200 in interest on a ₹50 lakh loan.
        </p>

        <h2 className="text-2xl font-bold mb-6">Understanding Your EMI Amortisation</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          One of the most important — and often surprising — facts about home loan EMIs is how they are split between
          interest and principal repayment. In the early years of a long-tenure loan, the majority of each EMI goes towards
          paying interest, not reducing your outstanding balance.
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="text-left p-3 border border-border font-semibold">Loan Year</th>
                <th className="text-left p-3 border border-border font-semibold">% Towards Interest</th>
                <th className="text-left p-3 border border-border font-semibold">% Towards Principal</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Year 1", "~89%", "~11%"],
                ["Year 5", "~83%", "~17%"],
                ["Year 10", "~72%", "~28%"],
                ["Year 15", "~54%", "~46%"],
                ["Year 20", "~25%", "~75%"],
              ].map(([year, interest, principal]) => (
                <tr key={year} className="border-b border-border">
                  <td className="p-3 border border-border">{year}</td>
                  <td className="p-3 border border-border text-red-500 dark:text-red-400">{interest}</td>
                  <td className="p-3 border border-border text-green-600 dark:text-green-400">{principal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-8">
          This is why making prepayments early in the loan tenure has such a powerful impact — every rupee that reduces
          the principal in Year 1 saves years of future interest charges.
        </p>

        <h2 className="text-2xl font-bold mb-6">Factors That Affect Your Home Loan EMI</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            { title: "Loan Amount (Principal)", desc: "The higher the loan amount, the higher the EMI. Putting a larger down payment (20–30% of property value) significantly reduces the EMI." },
            { title: "Interest Rate", desc: "Even a 0.5% difference in rate can change your EMI by ₹1,500–₹3,000 on a ₹50 lakh loan. Always compare rates across banks and NBFCs." },
            { title: "Loan Tenure", desc: "Longer tenure = lower EMI but much higher total interest. A 20-year loan on ₹50L pays ₹20L+ more in interest than a 15-year loan at the same rate." },
            { title: "Credit Score", desc: "A CIBIL score above 750 gets you the best home loan rates. Scores below 700 may mean a 0.5–1% higher rate, costing lakhs over the loan term." },
          ].map(({ title, desc }) => (
            <div key={title} className="p-5 bg-card border border-border rounded-xl">
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">Current Home Loan Interest Rates in India (2025)</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="text-left p-3 border border-border font-semibold">Bank / Lender</th>
                <th className="text-left p-3 border border-border font-semibold">Interest Rate (p.a.)</th>
                <th className="text-left p-3 border border-border font-semibold">Processing Fee</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["SBI", "8.50% – 9.85%", "0.35% (min ₹2,000)"],
                ["HDFC Bank", "8.75% – 9.65%", "Up to 0.50%"],
                ["ICICI Bank", "8.75% – 9.80%", "0.50% – 2%"],
                ["Kotak Mahindra", "8.75% – 9.50%", "0.50%"],
                ["Bank of Baroda", "8.40% – 10.90%", "0.25% – 0.50%"],
                ["LIC Housing Finance", "8.50% – 10.75%", "0.25%"],
              ].map(([bank, rate, fee]) => (
                <tr key={bank} className="border-b border-border">
                  <td className="p-3 border border-border font-medium">{bank}</td>
                  <td className="p-3 border border-border">{rate}</td>
                  <td className="p-3 border border-border text-muted-foreground">{fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mb-8">
          * Rates are indicative and subject to change. Always verify with the lender directly before applying. Rates depend on loan amount, tenure, credit score, and property type.
        </p>

        <h2 className="text-2xl font-bold mb-6">Tax Benefits on Home Loans in India</h2>
        <div className="space-y-4 mb-8">
          {[
            {
              section: "Section 24(b) — Interest Deduction",
              benefit: "Up to ₹2,00,000 per year on interest paid for self-occupied property. No limit for let-out property (entire interest deductible)."
            },
            {
              section: "Section 80C — Principal Repayment",
              benefit: "Principal repaid during the year is eligible for 80C deduction (within the ₹1.5 lakh combined limit). Note: Available only in the old tax regime."
            },
            {
              section: "Section 80EEA — First-Time Buyer Bonus",
              benefit: "Additional ₹1.5 lakh deduction on interest for first-time homebuyers (for loans sanctioned under specific PMAY conditions). Check current eligibility."
            },
          ].map(({ section, benefit }) => (
            <div key={section} className="p-5 bg-card border border-border rounded-xl">
              <h3 className="font-semibold text-sm mb-2">{section}</h3>
              <p className="text-sm text-muted-foreground">{benefit}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6 mb-8">
          {[
            {
              q: "How much home loan can I get on my salary?",
              a: "Most banks follow the 40–50% FOIR (Fixed Obligation to Income Ratio) rule. If your gross monthly income is ₹1 lakh, your total EMI obligations (including the new home loan) should not exceed ₹40,000–₹50,000. At 8.75% for 20 years, ₹40,000 EMI supports a loan of approximately ₹43–45 lakh. Use our calculator above with your desired loan amount to verify."
            },
            {
              q: "What is the minimum credit score required for a home loan in India?",
              a: "Most banks require a minimum CIBIL score of 650–700. However, to get the best interest rates (which can save you lakhs over the loan term), aim for 750+. SBI and HDFC offer preferential rates to borrowers with scores above 750."
            },
            {
              q: "Can I prepay my home loan without penalty?",
              a: "Yes. Under RBI guidelines, banks cannot charge prepayment penalties on floating-rate home loans for individual borrowers. Fixed-rate loans may carry a penalty of 2–3% of the prepaid amount. Always confirm the terms with your specific lender."
            },
            {
              q: "What is the maximum tenure for a home loan in India?",
              a: "Most banks offer a maximum tenure of 30 years. However, your loan must be repaid before you turn 70 (or 75 at some banks). So a 50-year-old borrower may only get a maximum 20-year tenure."
            },
            {
              q: "What documents are required for a home loan application?",
              a: "Salaried employees typically need: last 3 months' salary slips, Form 16 / ITR for 2 years, 6 months' bank statements, identity proof (Aadhaar/PAN), address proof, and property documents. Self-employed borrowers also need balance sheets and profit & loss statements for 2–3 years."
            },
            {
              q: "Is a home loan balance transfer worth it?",
              a: "A balance transfer makes sense if the interest rate difference is at least 0.5% and you have 10+ years of loan remaining. Switching costs (processing fee, legal charges) typically amount to 1–1.5% of the outstanding balance. Run the numbers: if rate savings over remaining tenure exceed switching costs, transfer is beneficial."
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
        <NewsSection topic="home loan mortgage real estate housing India property" title="Real Estate & Mortgage News" adSlot="5001000002" />
      </div>
    </div>
  )
}

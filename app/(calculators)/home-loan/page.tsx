import { Metadata } from "next"
import { EmiCalculatorClient } from "@/components/calculators/EmiCalculatorClient"
import { NewsSection } from "@/components/shared/NewsSection"
import { AdBanner } from "@/components/ads/AdBanner"

export const metadata: Metadata = {
  title: "Home Loan EMI Calculator | FinCalc",
  description: "Calculate your home loan EMI, total interest payable, and view the amortization schedule with our easy-to-use Home Loan EMI Calculator.",
}

export default function HomeLoanPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Home Loan EMI Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Plan your home purchase by calculating your monthly EMI and understanding the interest breakdown.
        </p>
      </div>
      <EmiCalculatorClient defaultPrincipal={500000} defaultRate={7.5} defaultYears={20} />
      <AdBanner adSlot="5001000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
      <div className="max-w-6xl mx-auto">
        <NewsSection topic="home loan mortgage real estate housing India property" title="Real Estate & Mortgage News" adSlot="5001000002" />
      </div>
    </div>
  )
}

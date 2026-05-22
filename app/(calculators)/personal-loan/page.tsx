import { Metadata } from "next"
import { EmiCalculatorClient } from "@/components/calculators/EmiCalculatorClient"
import { NewsSection } from "@/components/shared/NewsSection"
import { AdBanner } from "@/components/ads/AdBanner"

export const metadata: Metadata = {
  title: "Personal Loan EMI Calculator | FinCalc",
  description: "Calculate your personal loan EMI quickly and view the complete repayment schedule with our Personal Loan EMI Calculator.",
}

export default function PersonalLoanPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Personal Loan EMI Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Quickly estimate your monthly payments for a personal loan.
        </p>
      </div>
      <EmiCalculatorClient defaultPrincipal={10000} defaultRate={11.5} defaultYears={3} />
      <AdBanner adSlot="5003000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
      <div className="max-w-6xl mx-auto">
        <NewsSection topic="personal loan credit lending RBI interest rate India" title="Personal Finance News" adSlot="5003000002" />
      </div>
    </div>
  )
}

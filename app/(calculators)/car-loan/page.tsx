import { Metadata } from "next"
import { EmiCalculatorClient } from "@/components/calculators/EmiCalculatorClient"
import { NewsSection } from "@/components/shared/NewsSection"
import { AdBanner } from "@/components/ads/AdBanner"

export const metadata: Metadata = {
  title: "Car Loan EMI Calculator | FinCalc",
  description: "Calculate your car loan EMI and see the complete amortization schedule with our intuitive Car Loan EMI Calculator.",
}

export default function CarLoanPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Car Loan EMI Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Find out exactly how much your new car will cost you per month.
        </p>
      </div>
      <EmiCalculatorClient defaultPrincipal={30000} defaultRate={8.5} defaultYears={5} />
      <AdBanner adSlot="5002000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
      <div className="max-w-6xl mx-auto">
        <NewsSection topic="car loan automobile vehicle auto finance India" title="Auto & Vehicle Finance News" adSlot="5002000002" />
      </div>
    </div>
  )
}

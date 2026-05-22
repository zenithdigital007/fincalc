import { Metadata } from "next"
import { FdCalculatorClient } from "@/components/calculators/FdCalculatorClient"
import { NewsSection } from "@/components/shared/NewsSection"
import { AdBanner } from "@/components/ads/AdBanner"

export const metadata: Metadata = {
  title: "FD Calculator | Fixed Deposit Return Calculator | FinCalc",
  description: "Calculate your Fixed Deposit (FD) maturity value and interest earned with our easy-to-use FD calculator.",
}

export default function FdPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Fixed Deposit (FD) Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Find out how much your fixed deposit will grow over time with compound interest.
        </p>
      </div>
      <FdCalculatorClient />
      <AdBanner adSlot="5005000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
      <div className="max-w-6xl mx-auto">
        <NewsSection topic="fixed deposit FD bank savings interest rate RBI India" title="Banking & Savings News" adSlot="5005000002" />
      </div>
    </div>
  )
}

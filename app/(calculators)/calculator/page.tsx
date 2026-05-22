import { Metadata } from "next"
import { NormalCalculatorClient } from "@/components/calculators/NormalCalculatorClient"
import { NewsSection } from "@/components/shared/NewsSection"
import { AdBanner } from "@/components/ads/AdBanner"

export const metadata: Metadata = {
  title: "Calculator | FinCalc",
  description: "A fast, keyboard-operable calculator with calculation history. Supports basic arithmetic: addition, subtraction, multiplication, division, and percentages.",
}

export default function NormalCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Calculator</h1>
        <p className="text-lg text-muted-foreground">
          A fast and elegant calculator with full keyboard support and calculation history.
        </p>
      </div>
      <NormalCalculatorClient />
      <AdBanner adSlot="5007000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
      <div className="max-w-6xl mx-auto">
        <NewsSection
          topic="calculator arithmetic mathematics education tools productivity"
          title="Math & Technology News"
          adSlot="5007000002"
        />
      </div>
    </div>
  )
}

import { Metadata } from "next"
import { ScientificCalculatorClient } from "@/components/calculators/ScientificCalculatorClient"
import { NewsSection } from "@/components/shared/NewsSection"
import { AdBanner } from "@/components/ads/AdBanner"

export const metadata: Metadata = {
  title: "Scientific Calculator | FinCalc",
  description: "Advanced scientific calculator with trigonometric functions (sin, cos, tan), logarithms, memory, constants (π, e), and keyboard support.",
}

export default function ScientificCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Scientific Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Advanced calculations with trigonometry, logarithms, memory functions, and mathematical constants.
        </p>
      </div>
      <ScientificCalculatorClient />
      <AdBanner adSlot="5008000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
      <div className="max-w-6xl mx-auto">
        <NewsSection
          topic="science mathematics trigonometry physics engineering research"
          title="Science & Engineering News"
          adSlot="5008000002"
        />
      </div>
    </div>
  )
}

import { Metadata } from "next"
import { GraphingCalculatorClient } from "@/components/calculators/GraphingCalculatorClient"
import { NewsSection } from "@/components/shared/NewsSection"
import { AdBanner } from "@/components/ads/AdBanner"

export const metadata: Metadata = {
  title: "Graphing Calculator | FinCalc",
  description: "Plot and visualize mathematical functions like sin(x), x^2, cos(x) interactively. Supports up to 3 simultaneous functions with custom x-range.",
}

export default function GraphingCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Graphing Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Visualize and plot mathematical functions. Enter up to 3 functions and see them rendered on an interactive graph.
        </p>
      </div>
      <GraphingCalculatorClient />
      <AdBanner adSlot="5009000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
      <div className="max-w-6xl mx-auto">
        <NewsSection
          topic="data visualization mathematics graphing functions calculus charts"
          title="Data Visualization & Math News"
          adSlot="5009000002"
        />
      </div>
    </div>
  )
}

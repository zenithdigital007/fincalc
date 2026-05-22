import { Metadata } from "next"
import { BmiCalculatorClient } from "@/components/calculators/BmiCalculatorClient"
import { NewsSection } from "@/components/shared/NewsSection"
import { AdBanner } from "@/components/ads/AdBanner"

export const metadata: Metadata = {
  title: "BMI Calculator | FinCalc",
  description: "Calculate your Body Mass Index (BMI) in metric or imperial units. Get your BMI category, ideal weight range, and understand what your score means.",
}

export default function BmiPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">BMI Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Calculate your Body Mass Index using metric or imperial units. Understand your weight category and ideal weight range.
        </p>
      </div>
      <BmiCalculatorClient />
      <AdBanner adSlot="5006000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
      <div className="max-w-6xl mx-auto">
        <NewsSection topic="BMI body mass index obesity health fitness weight nutrition" title="Health & Fitness News" adSlot="5006000002" />
      </div>
    </div>
  )
}

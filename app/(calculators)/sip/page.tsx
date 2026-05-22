import { Metadata } from "next"
import { SipCalculatorClient } from "@/components/calculators/SipCalculatorClient"
import { NewsSection } from "@/components/shared/NewsSection"
import { AdBanner } from "@/components/ads/AdBanner"

export const metadata: Metadata = {
  title: "SIP Calculator | Systematic Investment Plan | FinCalc",
  description: "Calculate your mutual fund returns with our SIP calculator. Estimate the future value of your systematic investment plan.",
}

export default function SipPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">SIP Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Estimate the wealth you can create by making regular monthly investments.
        </p>
      </div>
      <SipCalculatorClient />
      <AdBanner adSlot="5004000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
      <div className="max-w-6xl mx-auto">
        <NewsSection topic="SIP mutual fund investment stock market SEBI returns India" title="Investment & Markets News" adSlot="5004000002" />
      </div>
    </div>
  )
}

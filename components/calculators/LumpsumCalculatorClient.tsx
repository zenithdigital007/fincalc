"use client"
import { useState, useMemo } from "react"
import { calculateLumpsum } from "@/lib/math"
import { SliderInput } from "@/components/shared/SliderInput"

export function LumpsumCalculatorClient() {
  const [principal, setPrincipal] = useState(500000)
  const [returnRate, setReturnRate] = useState(12)
  const [years, setYears] = useState(10)

  const result = useMemo(() => calculateLumpsum(principal, returnRate, years), [principal, returnRate, years])
  const fmt = (n: number) => {
    if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)}Cr`
    if (n >= 100000)   return `₹${(n / 100000).toFixed(2)}L`
    return `₹${n.toLocaleString('en-IN')}`
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-bold">Lumpsum Calculator</h2>
        <p className="text-sm text-muted-foreground -mt-4">Estimate returns on a one-time mutual fund / investment</p>
        <SliderInput
          label="Investment Amount (₹)"
          value={principal}
          min={1000}
          max={10000000}
          step={1000}
          onChange={setPrincipal}
          formatValue={(v) => {
            if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`
            return `₹${v.toLocaleString('en-IN')}`
          }}
        />
        <SliderInput label="Expected Return Rate (% p.a.)" value={returnRate} min={1} max={30} step={0.5} onChange={setReturnRate} formatValue={(v) => `${v}%`} />
        <SliderInput label="Investment Period (Years)" value={years} min={1} max={40} step={1} onChange={setYears} formatValue={(v) => `${v} Yr`} />
      </div>
      <div className="space-y-6 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <h3 className="text-xl font-bold mb-4">Lumpsum Summary</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Invested Amount</span>
            <span className="font-semibold">{fmt(result.investedAmount)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Estimated Returns</span>
            <span className="font-bold text-lg text-primary">{fmt(result.estimatedReturn)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Total Value</span>
            <span className="font-bold text-xl">{fmt(result.totalValue)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

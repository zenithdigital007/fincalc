"use client"
import { useState, useMemo } from "react"
import { calculateCAGR } from "@/lib/math"
import { SliderInput } from "@/components/shared/SliderInput"

export function CAGRCalculatorClient() {
  const [initialValue, setInitialValue] = useState(100000)
  const [finalValue, setFinalValue] = useState(250000)
  const [years, setYears] = useState(5)

  const result = useMemo(() => calculateCAGR(initialValue, finalValue, years), [initialValue, finalValue, years])
  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-bold">CAGR Calculator</h2>
        <SliderInput label="Initial Value (₹)" value={initialValue} min={1000} max={10000000} step={1000} onChange={setInitialValue} formatValue={(v) => fmt(v)} />
        <SliderInput label="Final Value (₹)" value={finalValue} min={1000} max={10000000} step={1000} onChange={setFinalValue} formatValue={(v) => fmt(v)} />
        <SliderInput label="Time Period (Years)" value={years} min={1} max={30} step={1} onChange={setYears} formatValue={(v) => `${v} Yr`} />
      </div>
      <div className="space-y-6 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <h3 className="text-xl font-bold mb-4">Results</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">CAGR</span>
            <span className="font-bold text-2xl text-primary">{result.cagr}%</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Absolute Return</span>
            <span className="font-semibold">{fmt(result.absoluteReturn)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Absolute Return %</span>
            <span className="font-semibold">{result.absoluteReturnPct}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

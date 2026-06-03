"use client"
import { useState, useMemo } from "react"
import { calculateSimpleInterest } from "@/lib/math"
import { SliderInput } from "@/components/shared/SliderInput"
import { useCurrency } from "@/components/providers/currency-provider"
import { formatCurrency } from "@/lib/utils"

export function SimpleInterestCalculatorClient() {
  const [principal, setPrincipal] = useState(10000)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(3)
  const { currency } = useCurrency()

  const result = useMemo(() => calculateSimpleInterest(principal, rate, years), [principal, rate, years])
  const fmt = (n: number) => formatCurrency(n, currency)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-bold">Simple Interest Calculator</h2>
        <SliderInput label="Principal Amount" value={principal} min={100} max={1000000} step={100} onChange={setPrincipal} formatValue={fmt} />
        <SliderInput label="Annual Interest Rate" value={rate} min={0.5} max={30} step={0.25} onChange={setRate} formatValue={(v) => `${v}%`} />
        <SliderInput label="Time Period (Years)" value={years} min={1} max={30} step={1} onChange={setYears} formatValue={(v) => `${v} yr`} />
        <div className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground">
          <strong>Formula:</strong> SI = (P × R × T) / 100<br />
          Simple interest does not compound — interest is calculated only on the original principal.
        </div>
      </div>
      <div className="space-y-6 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <h3 className="text-xl font-bold mb-4">Results</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Principal</span>
            <span className="font-semibold">{fmt(principal)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Simple Interest</span>
            <span className="font-bold text-lg text-primary">{fmt(result.interest)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Total Amount</span>
            <span className="font-bold text-lg">{fmt(result.totalAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

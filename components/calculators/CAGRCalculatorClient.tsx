"use client"
import { useState, useMemo } from "react"
import { calculateCAGR } from "@/lib/math"
import { useCurrency } from "@/components/providers/currency-provider"
import { formatCurrency } from "@/lib/utils"

export function CAGRCalculatorClient() {
  const [initialValue, setInitialValue] = useState(10000)
  const [finalValue, setFinalValue] = useState(25000)
  const [years, setYears] = useState(5)
  const { currency } = useCurrency()
  const fmt = (n: number) => formatCurrency(n, currency)

  const { cagr } = useMemo(() => calculateCAGR(initialValue, finalValue, years), [initialValue, finalValue, years])

  const inputClass = "w-full p-3 rounded-xl border border-border bg-background text-foreground text-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary/50"

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-bold">CAGR Calculator</h2>
        <p className="text-sm text-muted-foreground -mt-2">Compound Annual Growth Rate — the annualised return of any investment</p>
        <div>
          <label className="text-sm font-medium text-muted-foreground block mb-2">Initial Investment Value</label>
          <input type="number" value={initialValue} onChange={(e) => setInitialValue(Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground block mb-2">Final Value</label>
          <input type="number" value={finalValue} onChange={(e) => setFinalValue(Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground block mb-2">Period (Years)</label>
          <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className={inputClass} min={1} />
        </div>
        <div className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground">
          <strong>Formula:</strong> CAGR = (Final ÷ Initial)^(1/Years) − 1
        </div>
      </div>
      <div className="space-y-6 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <h3 className="text-xl font-bold mb-4">CAGR Result</h3>
        <div className="text-center py-6">
          <p className="text-6xl font-black text-primary">{cagr.toFixed(2)}%</p>
          <p className="text-muted-foreground text-sm mt-2">Compound Annual Growth Rate</p>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Initial Value</span>
            <span className="font-semibold">{fmt(initialValue)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Final Value</span>
            <span className="font-semibold">{fmt(finalValue)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Total Growth</span>
            <span className="font-semibold">{((finalValue - initialValue) / initialValue * 100).toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

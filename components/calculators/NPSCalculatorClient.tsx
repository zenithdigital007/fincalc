"use client"
import { useState, useMemo } from "react"
import { calculateNPS } from "@/lib/math"
import { SliderInput } from "@/components/shared/SliderInput"

export function NPSCalculatorClient() {
  const [monthly, setMonthly] = useState(5000)
  const [returnRate, setReturnRate] = useState(10)
  const [years, setYears] = useState(25)
  const [annuityPct, setAnnuityPct] = useState(40)

  const result = useMemo(() => calculateNPS(monthly, returnRate, years, annuityPct), [monthly, returnRate, years, annuityPct])
  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-bold">NPS Calculator</h2>
        <p className="text-sm text-muted-foreground -mt-4">National Pension Scheme — Estimate your retirement corpus</p>
        <SliderInput label="Monthly Contribution (₹)" value={monthly} min={500} max={100000} step={500} onChange={setMonthly} formatValue={fmt} />
        <SliderInput label="Expected Annual Return" value={returnRate} min={6} max={15} step={0.5} onChange={setReturnRate} formatValue={(v) => `${v}%`} />
        <SliderInput label="Years to Retirement" value={years} min={5} max={40} step={1} onChange={setYears} formatValue={(v) => `${v} Yr`} />
        <SliderInput
          label="Annuity Percentage (min 40%)"
          value={annuityPct}
          min={40}
          max={100}
          step={5}
          onChange={setAnnuityPct}
          formatValue={(v) => `${v}%`}
        />
      </div>
      <div className="space-y-6 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <h3 className="text-xl font-bold mb-4">NPS Summary</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Total Corpus</span>
            <span className="font-bold text-lg text-primary">{fmt(result.corpus)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Lump Sum (at 60)</span>
            <span className="font-semibold">{fmt(result.lumpSum)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Annuity Corpus ({annuityPct}%)</span>
            <span className="font-semibold">{fmt(result.annuityCorpus)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Est. Monthly Pension</span>
            <span className="font-bold text-lg">{fmt(result.monthlyPension)}</span>
          </div>
          <p className="text-xs text-muted-foreground pt-2">Pension estimated at 6% annuity rate. Actual pension depends on annuity provider chosen at retirement.</p>
        </div>
      </div>
    </div>
  )
}

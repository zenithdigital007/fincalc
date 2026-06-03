"use client"
import { useState, useMemo } from "react"
import { calculateSWP } from "@/lib/math"
import { SliderInput } from "@/components/shared/SliderInput"

export function SWPCalculatorClient() {
  const [corpus, setCorpus] = useState(5000000)
  const [withdrawal, setWithdrawal] = useState(30000)
  const [returnRate, setReturnRate] = useState(8)

  const result = useMemo(() => calculateSWP(corpus, withdrawal, returnRate), [corpus, withdrawal, returnRate])
  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-bold">SWP Calculator</h2>
        <p className="text-sm text-muted-foreground -mt-4">Systematic Withdrawal Plan — how long will your corpus last?</p>
        <SliderInput
          label="Total Corpus (₹)"
          value={corpus}
          min={100000}
          max={50000000}
          step={100000}
          onChange={setCorpus}
          formatValue={(v) => {
            if (v >= 10000000) return `₹${(v / 10000000).toFixed(1)}Cr`
            return `₹${(v / 100000).toFixed(1)}L`
          }}
        />
        <SliderInput label="Monthly Withdrawal (₹)" value={withdrawal} min={1000} max={500000} step={1000} onChange={setWithdrawal} formatValue={fmt} />
        <SliderInput label="Expected Annual Return" value={returnRate} min={1} max={15} step={0.5} onChange={setReturnRate} formatValue={(v) => `${v}%`} />
      </div>
      <div className="space-y-6 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <h3 className="text-xl font-bold mb-4">SWP Summary</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Corpus Duration</span>
            <span className="font-bold text-xl text-primary">
              {result.corpusExhausted ? `${result.durationYears} yrs` : '50+ yrs'}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Duration (Months)</span>
            <span className="font-semibold">
              {result.corpusExhausted ? result.durationMonths : '600+'}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Total Withdrawn</span>
            <span className="font-semibold">{fmt(result.totalWithdrawn)}</span>
          </div>
          {!result.corpusExhausted && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-sm text-green-600 dark:text-green-400 font-semibold">
              Corpus will last 50+ years at this withdrawal rate!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

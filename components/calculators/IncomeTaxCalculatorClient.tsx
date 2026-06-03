"use client"
import { useState, useMemo } from "react"
import { calculateIncomeTax } from "@/lib/math"
import { SliderInput } from "@/components/shared/SliderInput"

export function IncomeTaxCalculatorClient() {
  const [income, setIncome] = useState(1000000)
  const [regime, setRegime] = useState<'new' | 'old'>('new')

  const result = useMemo(() => calculateIncomeTax(income, regime), [income, regime])

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-bold mb-2">Income Tax Calculator</h2>
        <p className="text-sm text-muted-foreground -mt-4">FY 2024-25 / AY 2025-26</p>

        <div className="flex gap-3">
          {(['new', 'old'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRegime(r)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
                regime === r
                  ? 'bg-foreground text-background border-foreground'
                  : 'border-border text-muted-foreground hover:bg-muted'
              }`}
            >
              {r === 'new' ? 'New Regime' : 'Old Regime'}
            </button>
          ))}
        </div>

        <SliderInput
          label="Annual Income (₹)"
          value={income}
          min={0}
          max={10000000}
          step={50000}
          onChange={setIncome}
          formatValue={(v) => {
            if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`
            return `₹${v.toLocaleString('en-IN')}`
          }}
        />

        {/* Slab reference */}
        <div className="bg-muted/50 rounded-xl p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            {regime === 'new' ? 'New' : 'Old'} Regime Slabs (FY 2024-25)
          </p>
          {regime === 'new' ? (
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex justify-between"><span>Up to ₹3L</span><span>Nil</span></div>
              <div className="flex justify-between"><span>₹3L – ₹6L</span><span>5%</span></div>
              <div className="flex justify-between"><span>₹6L – ₹9L</span><span>10%</span></div>
              <div className="flex justify-between"><span>₹9L – ₹12L</span><span>15%</span></div>
              <div className="flex justify-between"><span>₹12L – ₹15L</span><span>20%</span></div>
              <div className="flex justify-between"><span>Above ₹15L</span><span>30%</span></div>
              <div className="mt-2 pt-2 border-t border-border/50 text-xs">Rebate u/s 87A: Nil tax if income ≤ ₹7L</div>
            </div>
          ) : (
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex justify-between"><span>Up to ₹2.5L</span><span>Nil</span></div>
              <div className="flex justify-between"><span>₹2.5L – ₹5L</span><span>5%</span></div>
              <div className="flex justify-between"><span>₹5L – ₹10L</span><span>20%</span></div>
              <div className="flex justify-between"><span>Above ₹10L</span><span>30%</span></div>
              <div className="mt-2 pt-2 border-t border-border/50 text-xs">Rebate u/s 87A: Nil tax if income ≤ ₹5L</div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <h3 className="text-xl font-bold mb-4">Tax Summary</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Annual Income</span>
            <span className="font-semibold">{fmt(income)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Tax (before cess)</span>
            <span className="font-semibold">{fmt(result.taxBeforeCess)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Health & Education Cess (4%)</span>
            <span className="font-semibold">{fmt(result.cess)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Total Tax</span>
            <span className="font-bold text-lg text-destructive">{fmt(result.totalTax)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Effective Rate</span>
            <span className="font-bold text-lg text-primary">{result.effectiveRate}%</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Monthly In-Hand</span>
            <span className="font-bold text-lg">{fmt(result.inHandMonthly)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

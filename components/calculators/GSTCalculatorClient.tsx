"use client"
import { useState, useMemo } from "react"
import { calculateGST } from "@/lib/math"
import { SliderInput } from "@/components/shared/SliderInput"
import { useCurrency } from "@/components/providers/currency-provider"
import { formatCurrency } from "@/lib/utils"

const GST_RATES = [5, 10, 12, 15, 18, 20, 25, 28]

export function GSTCalculatorClient() {
  const [amount, setAmount] = useState(1000)
  const [gstRate, setGstRate] = useState(18)
  const [mode, setMode] = useState<'add' | 'remove'>('add')
  const { currency } = useCurrency()

  const result = useMemo(() => calculateGST(amount, gstRate, mode), [amount, gstRate, mode])
  const fmt = (n: number) => formatCurrency(n, currency)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-bold mb-2">Sales Tax / VAT Calculator</h2>

        {/* Mode toggle */}
        <div className="flex gap-3">
          {(['add', 'remove'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
                mode === m
                  ? 'bg-foreground text-background border-foreground'
                  : 'border-border text-muted-foreground hover:bg-muted'
              }`}
            >
              {m === 'add' ? 'Add Tax' : 'Remove Tax'}
            </button>
          ))}
        </div>

        <SliderInput
          label={mode === 'add' ? 'Amount (Excl. Tax)' : 'Amount (Incl. Tax)'}
          value={amount}
          min={1}
          max={100000}
          step={1}
          onChange={setAmount}
          formatValue={(v) => fmt(v)}
        />

        {/* Tax Rate pills */}
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-3">Tax Rate</p>
          <div className="flex gap-2 flex-wrap">
            {GST_RATES.map((rate) => (
              <button
                key={rate}
                onClick={() => setGstRate(rate)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  gstRate === rate
                    ? 'bg-foreground text-background border-foreground'
                    : 'border-border text-muted-foreground hover:bg-muted'
                }`}
              >
                {rate}%
              </button>
            ))}
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium text-muted-foreground block mb-2">Custom Rate (%)</label>
            <input
              type="number"
              min={0}
              max={100}
              step={0.5}
              value={gstRate}
              onChange={(e) => setGstRate(Number(e.target.value))}
              className="w-28 p-2 rounded-xl border border-border bg-background text-foreground text-base font-bold focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <h3 className="text-xl font-bold mb-4">Breakdown</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Base Amount</span>
            <span className="font-semibold">{fmt(result.baseAmount)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Tax ({gstRate}%)</span>
            <span className="font-bold text-lg text-primary">{fmt(result.gstAmount)}</span>
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

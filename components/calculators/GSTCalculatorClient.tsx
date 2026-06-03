"use client"
import { useState, useMemo } from "react"
import { calculateGST } from "@/lib/math"
import { SliderInput } from "@/components/shared/SliderInput"

const GST_RATES = [5, 12, 18, 28]

export function GSTCalculatorClient() {
  const [amount, setAmount] = useState(10000)
  const [gstRate, setGstRate] = useState(18)
  const [mode, setMode] = useState<'add' | 'remove'>('add')

  const result = useMemo(() => calculateGST(amount, gstRate, mode), [amount, gstRate, mode])

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-bold mb-2">GST Calculator</h2>

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
              {m === 'add' ? 'Add GST' : 'Remove GST'}
            </button>
          ))}
        </div>

        <SliderInput
          label={mode === 'add' ? 'Amount (Excl. GST)' : 'Amount (Incl. GST)'}
          value={amount}
          min={100}
          max={1000000}
          step={100}
          onChange={setAmount}
          formatValue={(v) => fmt(v)}
        />

        {/* GST Rate pills */}
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-3">GST Rate</p>
          <div className="flex gap-3 flex-wrap">
            {GST_RATES.map((rate) => (
              <button
                key={rate}
                onClick={() => setGstRate(rate)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
                  gstRate === rate
                    ? 'bg-foreground text-background border-foreground'
                    : 'border-border text-muted-foreground hover:bg-muted'
                }`}
              >
                {rate}%
              </button>
            ))}
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
            <span className="text-muted-foreground">GST ({gstRate}%)</span>
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

"use client"
import { useState } from "react"

type Mode = 'percent_of' | 'what_percent' | 'percent_change' | 'increase_by' | 'decrease_by'

const MODES: { value: Mode; label: string; description: string }[] = [
  { value: 'percent_of',    label: '% of Number',     description: 'What is X% of Y?' },
  { value: 'what_percent',  label: 'What %?',          description: 'X is what % of Y?' },
  { value: 'percent_change',label: '% Change',         description: '% change from X to Y' },
  { value: 'increase_by',   label: 'Increase by %',    description: 'Increase X by Y%' },
  { value: 'decrease_by',   label: 'Decrease by %',    description: 'Decrease X by Y%' },
]

export function PercentageCalculatorClient() {
  const [mode, setMode] = useState<Mode>('percent_of')
  const [a, setA] = useState(20)
  const [b, setB] = useState(500)

  function calculate() {
    switch (mode) {
      case 'percent_of':    return { label: `${a}% of ${b}`,                result: (a / 100) * b }
      case 'what_percent':  return { label: `${a} is ___% of ${b}`,         result: (a / b) * 100 }
      case 'percent_change':return { label: `% change from ${a} to ${b}`,   result: ((b - a) / a) * 100 }
      case 'increase_by':   return { label: `${a} increased by ${b}%`,      result: a * (1 + b / 100) }
      case 'decrease_by':   return { label: `${a} decreased by ${b}%`,      result: a * (1 - b / 100) }
    }
  }

  const { label, result } = calculate()
  const fmt = (n: number) => Math.round(n * 100) / 100

  const inputLabels: Record<Mode, [string, string]> = {
    percent_of:     ['Percentage (%)', 'Number'],
    what_percent:   ['Value (X)', 'Total (Y)'],
    percent_change: ['Original Value', 'New Value'],
    increase_by:    ['Original Number', 'Percentage (%)'],
    decrease_by:    ['Original Number', 'Percentage (%)'],
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-bold">Percentage Calculator</h2>
        {/* Mode selector */}
        <div className="flex flex-wrap gap-2">
          {MODES.map((m) => (
            <button
              key={m.value}
              onClick={() => setMode(m.value)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                mode === m.value
                  ? 'bg-foreground text-background border-foreground'
                  : 'border-border text-muted-foreground hover:bg-muted'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">{MODES.find(m => m.value === mode)?.description}</p>
        <div className="grid grid-cols-2 gap-6">
          {[{ val: a, set: setA, label: inputLabels[mode][0] }, { val: b, set: setB, label: inputLabels[mode][1] }].map(({ val, set, label: lbl }) => (
            <div key={lbl}>
              <label className="text-sm font-medium text-muted-foreground block mb-2">{lbl}</label>
              <input
                type="number"
                value={val}
                onChange={(e) => set(Number(e.target.value))}
                className="w-full p-3 rounded-xl border border-border bg-background text-foreground text-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-6 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <h3 className="text-xl font-bold mb-4">Result</h3>
        <div className="text-center py-6">
          <p className="text-xs text-muted-foreground mb-2">{label} =</p>
          <p className="text-5xl font-black text-primary">{fmt(result)}</p>
          {(mode === 'what_percent' || mode === 'percent_change') && (
            <p className="text-lg text-muted-foreground mt-1">%</p>
          )}
        </div>
      </div>
    </div>
  )
}

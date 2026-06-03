"use client"
import { useState, useMemo } from "react"
import { calculateSalary } from "@/lib/math"
import { SliderInput } from "@/components/shared/SliderInput"

export function SalaryCalculatorClient() {
  const [ctc, setCtc] = useState(1200000)

  const result = useMemo(() => calculateSalary(ctc), [ctc])
  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

  const rows = [
    { label: "CTC (Annual)",             value: fmt(result.ctc),              highlight: false },
    { label: "Gross Salary",              value: fmt(result.grossSalary),      highlight: false },
    { label: "— Basic (40% of CTC)",     value: fmt(result.basic),            highlight: false },
    { label: "— HRA (50% of Basic)",     value: fmt(result.hra),              highlight: false },
    { label: "— Special Allowance",      value: fmt(result.specialAllowance), highlight: false },
    { label: "EPF (Employee, 12%)",      value: `- ${fmt(result.epfEmployee)}`, highlight: false },
    { label: "Professional Tax",          value: `- ${fmt(result.professionalTax)}`, highlight: false },
    { label: "In-Hand (Annual)",         value: fmt(result.inHandAnnual),     highlight: true  },
    { label: "In-Hand (Monthly)",        value: fmt(result.inHandMonthly),    highlight: true  },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-bold">Salary Calculator</h2>
        <p className="text-sm text-muted-foreground -mt-4">Estimate your in-hand salary from CTC (approximate, India private sector)</p>
        <SliderInput
          label="Annual CTC (₹)"
          value={ctc}
          min={100000}
          max={10000000}
          step={50000}
          onChange={setCtc}
          formatValue={(v) => {
            if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`
            return fmt(v)
          }}
        />
        <div className="bg-muted/50 rounded-xl p-4 text-xs text-muted-foreground space-y-1">
          <p><strong>Assumptions:</strong> Basic = 40% of CTC, HRA = 50% of Basic, Special Allowance = 20% of CTC</p>
          <p>EPF capped at ₹1,800/month. Professional Tax ₹200/month. No income tax deducted here — use the Income Tax Calculator separately.</p>
        </div>
      </div>
      <div className="space-y-4 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <h3 className="text-xl font-bold mb-2">Salary Breakdown</h3>
        {rows.map(({ label, value, highlight }) => (
          <div key={label} className={`flex justify-between items-center py-2 border-b ${highlight ? 'font-bold' : ''}`}>
            <span className={highlight ? 'text-foreground' : 'text-muted-foreground text-sm'}>{label}</span>
            <span className={highlight ? 'text-lg text-primary' : 'text-sm'}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

"use client"
import { useState, useMemo } from "react"
import { calculateSalary } from "@/lib/math"
import { SliderInput } from "@/components/shared/SliderInput"
import { useCurrency } from "@/components/providers/currency-provider"
import { formatCurrency } from "@/lib/utils"

export function SalaryCalculatorClient() {
  const [ctc, setCtc] = useState(80000)
  const { currency } = useCurrency()
  const fmt = (n: number) => formatCurrency(n, currency)

  const result = useMemo(() => calculateSalary(ctc), [ctc])

  const rows = [
    { label: "Gross Annual CTC",               value: fmt(result.ctc),              highlight: false },
    { label: "Gross Salary",                   value: fmt(result.grossSalary),      highlight: false },
    { label: "— Basic (40% of CTC)",           value: fmt(result.basic),            highlight: false },
    { label: "— Housing Allowance (HRA)",       value: fmt(result.hra),              highlight: false },
    { label: "— Other Allowances",             value: fmt(result.specialAllowance), highlight: false },
    { label: "Provident Fund (Emp, 12%)",      value: `- ${fmt(result.epfEmployee)}`, highlight: false },
    { label: "Other Deductions",               value: `- ${fmt(result.professionalTax)}`, highlight: false },
    { label: "Net Annual Pay",                 value: fmt(result.inHandAnnual),     highlight: true  },
    { label: "Net Monthly Pay",                value: fmt(result.inHandMonthly),    highlight: true  },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-bold">Salary Calculator</h2>
        <p className="text-sm text-muted-foreground -mt-4">Estimate your net take-home pay from gross annual CTC (approximate)</p>
        <SliderInput
          label="Annual CTC (Cost to Company)"
          value={ctc}
          min={10000}
          max={1000000}
          step={1000}
          onChange={setCtc}
          formatValue={fmt}
        />
        <div className="bg-muted/50 rounded-xl p-4 text-xs text-muted-foreground space-y-1">
          <p><strong>Assumptions:</strong> Basic = 40% of CTC · Housing Allowance = 50% of Basic · Other Allowances = 20% of CTC</p>
          <p>Provident Fund contribution capped at approx. 12% of basic. Actual deductions vary by employer and country.</p>
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

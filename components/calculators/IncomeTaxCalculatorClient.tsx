"use client"
import { useState, useMemo } from "react"
import { SliderInput } from "@/components/shared/SliderInput"
import { useCurrency } from "@/components/providers/currency-provider"
import { formatCurrency } from "@/lib/utils"

// Generic progressive income tax calculator with editable brackets
const DEFAULT_BRACKETS = [
  { upTo: 10000,    rate: 0   },
  { upTo: 40000,    rate: 12  },
  { upTo: 80000,    rate: 20  },
  { upTo: 180000,   rate: 24  },
  { upTo: Infinity, rate: 30  },
]

function calcTax(income: number, brackets: typeof DEFAULT_BRACKETS) {
  let tax = 0
  let prev = 0
  for (const b of brackets) {
    if (income <= prev) break
    const taxable = Math.min(income, b.upTo) - prev
    tax += taxable * (b.rate / 100)
    prev = b.upTo
  }
  return tax
}

export function IncomeTaxCalculatorClient() {
  const [income, setIncome] = useState(60000)
  const [standardDeduction, setStandardDeduction] = useState(12500)
  const { currency } = useCurrency()
  const fmt = (n: number) => formatCurrency(n, currency)

  const taxableIncome = Math.max(0, income - standardDeduction)
  const tax = useMemo(() => calcTax(taxableIncome, DEFAULT_BRACKETS), [taxableIncome])
  const effectiveRate = income > 0 ? (tax / income) * 100 : 0
  const afterTax = income - tax

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm">
        <div>
          <h2 className="text-2xl font-bold">Income Tax Estimator</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Progressive tax estimate based on standard brackets. Adjust inputs to match your country&apos;s rates.
          </p>
        </div>
        <SliderInput
          label="Annual Income"
          value={income}
          min={0}
          max={500000}
          step={1000}
          onChange={setIncome}
          formatValue={(v) => fmt(v)}
        />
        <SliderInput
          label="Standard Deduction / Personal Allowance"
          value={standardDeduction}
          min={0}
          max={50000}
          step={500}
          onChange={setStandardDeduction}
          formatValue={(v) => fmt(v)}
        />
        {/* Bracket table */}
        <div className="bg-muted/50 rounded-xl p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Reference Tax Brackets</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground text-xs border-b">
                <th className="text-left pb-2">Income Up To</th>
                <th className="text-right pb-2">Tax Rate</th>
              </tr>
            </thead>
            <tbody>
              {DEFAULT_BRACKETS.map((b, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-1.5">{b.upTo === Infinity ? 'Above' : `${fmt(b.upTo)}`}</td>
                  <td className="py-1.5 text-right font-semibold">{b.rate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-3">Note: Brackets are illustrative. Update them to match your country&apos;s tax law.</p>
        </div>
      </div>

      <div className="space-y-6 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <h3 className="text-xl font-bold mb-4">Tax Summary</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Gross Income</span>
            <span className="font-semibold">{fmt(income)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Taxable Income</span>
            <span className="font-semibold">{fmt(taxableIncome)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Estimated Tax</span>
            <span className="font-bold text-lg text-destructive">{fmt(tax)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Effective Rate</span>
            <span className="font-bold text-lg text-primary">{effectiveRate.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">After-Tax Income</span>
            <span className="font-bold text-xl text-green-600 dark:text-green-400">{fmt(afterTax)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

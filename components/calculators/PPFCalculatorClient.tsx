"use client"
import { useState, useMemo } from "react"
import { calculatePPF } from "@/lib/math"
import { SliderInput } from "@/components/shared/SliderInput"

export function PPFCalculatorClient() {
  const [annualInvestment, setAnnualInvestment] = useState(150000)
  const [years, setYears] = useState(15)

  const result = useMemo(() => calculatePPF(annualInvestment, years), [annualInvestment, years])
  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-bold">PPF Calculator</h2>
        <p className="text-sm text-muted-foreground -mt-4">Public Provident Fund — Current rate: 7.1% p.a. (Government of India)</p>
        <SliderInput
          label="Yearly Investment (₹)"
          value={annualInvestment}
          min={500}
          max={150000}
          step={500}
          onChange={setAnnualInvestment}
          formatValue={fmt}
        />
        <SliderInput
          label="Investment Period (Years)"
          value={years}
          min={15}
          max={50}
          step={1}
          onChange={setYears}
          formatValue={(v) => `${v} Yr`}
        />
        <div className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground space-y-1">
          <p><strong>Max yearly deposit:</strong> ₹1,50,000</p>
          <p><strong>Lock-in period:</strong> 15 years (extendable in 5-year blocks)</p>
          <p><strong>Tax benefit:</strong> EEE — Investment, Interest & Maturity all tax-free</p>
        </div>
      </div>
      <div className="space-y-6 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <h3 className="text-xl font-bold mb-4">PPF Summary</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Invested Amount</span>
            <span className="font-semibold">{fmt(result.investedAmount)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Interest Earned</span>
            <span className="font-bold text-lg text-primary">{fmt(result.interestEarned)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Maturity Value</span>
            <span className="font-bold text-lg">{fmt(result.maturityValue)}</span>
          </div>
          <p className="text-xs text-muted-foreground pt-2">Interest rate: 7.1% p.a. (subject to Government revision quarterly)</p>
        </div>
      </div>
    </div>
  )
}

"use client"
import { useState, useMemo } from "react"
import { calculateGratuity } from "@/lib/math"
import { SliderInput } from "@/components/shared/SliderInput"
import { useCurrency } from "@/components/providers/currency-provider"
import { formatCurrency } from "@/lib/utils"

export function GratuityCalculatorClient() {
  const [lastSalary, setLastSalary] = useState(5000)
  const [yearsOfService, setYearsOfService] = useState(10)
  const { currency } = useCurrency()
  const fmt = (n: number) => formatCurrency(n, currency)

  const result = useMemo(() => calculateGratuity(lastSalary, yearsOfService), [lastSalary, yearsOfService])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-bold">Gratuity / Severance Calculator</h2>
        <p className="text-sm text-muted-foreground -mt-4">
          Formula: (Last Salary × 15 × Years) ÷ 26 — commonly used for end-of-service gratuity calculations
        </p>
        <SliderInput label="Last Drawn Monthly Salary" value={lastSalary} min={500} max={100000} step={500} onChange={setLastSalary} formatValue={fmt} />
        <SliderInput label="Years of Service" value={yearsOfService} min={1} max={40} step={1} onChange={setYearsOfService} formatValue={(v) => `${v} yr`} />
        <div className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground">
          <p><strong>Eligibility:</strong> Most jurisdictions require a minimum service period (commonly 5 years) before gratuity is payable.</p>
          <p className="mt-1"><strong>Note:</strong> Local labour laws may apply different formulas. Check your country&apos;s regulations.</p>
        </div>
      </div>
      <div className="space-y-6 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <h3 className="text-xl font-bold mb-4">Gratuity Summary</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Last Salary</span>
            <span className="font-semibold">{fmt(lastSalary)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Years of Service</span>
            <span className="font-semibold">{yearsOfService} yr</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Gratuity Amount</span>
            <span className="font-bold text-2xl text-primary">{fmt(result.gratuity)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

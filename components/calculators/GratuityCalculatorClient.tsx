"use client"
import { useState, useMemo } from "react"
import { calculateGratuity } from "@/lib/math"
import { SliderInput } from "@/components/shared/SliderInput"

export function GratuityCalculatorClient() {
  const [lastSalary, setLastSalary] = useState(50000)
  const [yearsOfService, setYearsOfService] = useState(10)

  const result = useMemo(() => calculateGratuity(lastSalary, yearsOfService), [lastSalary, yearsOfService])
  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-bold">Gratuity Calculator</h2>
        <p className="text-sm text-muted-foreground -mt-4">Gratuity is payable after 5 years of continuous service. Formula: (Last Salary × 15 × Years) ÷ 26</p>
        <SliderInput label="Last Drawn Salary (Basic + DA) ₹/month" value={lastSalary} min={5000} max={500000} step={1000} onChange={setLastSalary} formatValue={fmt} />
        <SliderInput label="Years of Service" value={yearsOfService} min={5} max={40} step={1} onChange={setYearsOfService} formatValue={(v) => `${v} Yr`} />
        <div className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground">
          <p><strong>Eligibility:</strong> Minimum 5 years of continuous service with one employer.</p>
          <p className="mt-1"><strong>Tax exemption:</strong> Gratuity up to ₹20,00,000 is fully tax-free for private sector employees.</p>
        </div>
      </div>
      <div className="space-y-6 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <h3 className="text-xl font-bold mb-4">Gratuity Summary</h3>
        <div className="space-y-4">
          {yearsOfService < 5 ? (
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 text-sm text-destructive">
              Minimum 5 years of service required to be eligible for gratuity.
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Last Salary</span>
                <span className="font-semibold">{fmt(lastSalary)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Years of Service</span>
                <span className="font-semibold">{yearsOfService} years</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Gratuity Amount</span>
                <span className="font-bold text-2xl text-primary">{fmt(result.gratuity)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Tax-Free Limit</span>
                <span className="font-semibold">{fmt(result.taxFreeLimit)}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

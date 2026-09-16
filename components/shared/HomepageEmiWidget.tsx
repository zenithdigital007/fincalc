"use client"

import { useState, useMemo } from "react"
import { calculateEMI } from "@/lib/math"
import { formatCurrency } from "@/lib/utils"
import { useCurrency } from "@/components/providers/currency-provider"
import { SliderInput } from "@/components/shared/SliderInput"

export function HomepageEmiWidget() {
  const [principal, setPrincipal] = useState(200000)
  const [rate, setRate] = useState(8.5)
  const [years, setYears] = useState(20)
  const { currency } = useCurrency()

  const { emi, totalInterest, totalPayment } = useMemo(
    () => calculateEMI(principal, rate, years * 12),
    [principal, rate, years]
  )

  const fmt = (n: number) => formatCurrency(n, currency)

  return (
    <div className="w-full max-w-4xl mx-auto bg-card border border-border rounded-2xl shadow-sm p-6 text-left">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
        Quick EMI Calculator — adjust sliders or type values directly
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Loan Amount */}
        <SliderInput
          label="Loan Amount"
          value={principal}
          min={10000}
          max={5000000}
          step={10000}
          onChange={setPrincipal}
          formatValue={fmt}
        />

        {/* Interest Rate */}
        <SliderInput
          label="Interest Rate"
          value={rate}
          min={1}
          max={20}
          step={0.1}
          onChange={setRate}
          formatValue={(val) => `${val}%`}
        />

        {/* Tenure */}
        <SliderInput
          label="Tenure"
          value={years}
          min={1}
          max={30}
          step={1}
          onChange={setYears}
          formatValue={(val) => `${val} Yr`}
        />
      </div>

      {/* Results row */}
      <div className="grid grid-cols-3 gap-3 border-t border-border pt-5">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Monthly EMI</p>
          <p className="text-xl font-black text-primary">{fmt(emi)}</p>
        </div>
        <div className="text-center border-x border-border">
          <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
          <p className="text-xl font-black text-destructive">{fmt(totalInterest)}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Total Payable</p>
          <p className="text-xl font-black">{fmt(totalPayment)}</p>
        </div>
      </div>
    </div>
  )
}

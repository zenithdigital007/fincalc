"use client"

import { useState, useMemo } from "react"
import { calculateEMI } from "@/lib/math"
import { formatCurrency } from "@/lib/utils"

function fmt(n: number) {
  return formatCurrency(n, "INR")
}

export function HomepageEmiWidget() {
  const [principal, setPrincipal] = useState(2000000)
  const [rate, setRate] = useState(8.5)
  const [years, setYears] = useState(20)

  const { emi, totalInterest, totalPayment } = useMemo(
    () => calculateEMI(principal, rate, years * 12),
    [principal, rate, years]
  )

  return (
    <div className="w-full max-w-3xl mx-auto bg-card border border-border rounded-2xl shadow-sm p-6 text-left">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
        Quick EMI Calculator — adjust sliders &amp; see instant results
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {/* Loan Amount */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-muted-foreground">Loan Amount</label>
            <span className="text-sm font-bold text-primary px-3 py-1 bg-primary/10 rounded-lg border border-primary/20">
              ₹{(principal / 100000).toFixed(1)}L
            </span>
          </div>
          <input
            type="range"
            min={100000}
            max={10000000}
            step={100000}
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹1L</span><span>₹1Cr</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-muted-foreground">Interest Rate</label>
            <span className="text-sm font-bold text-primary px-3 py-1 bg-primary/10 rounded-lg border border-primary/20">
              {rate}%
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={20}
            step={0.25}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1%</span><span>20%</span>
          </div>
        </div>

        {/* Tenure */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-muted-foreground">Tenure</label>
            <span className="text-sm font-bold text-primary px-3 py-1 bg-primary/10 rounded-lg border border-primary/20">
              {years} Yr
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={30}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 Yr</span><span>30 Yr</span>
          </div>
        </div>
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

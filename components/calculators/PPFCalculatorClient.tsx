"use client"
import { useState, useMemo } from "react"
import { calculatePPF } from "@/lib/math"
import { SliderInput } from "@/components/shared/SliderInput"
import { useCurrency } from "@/components/providers/currency-provider"
import { formatCurrency } from "@/lib/utils"

export function PPFCalculatorClient() {
  const [annualInvestment, setAnnualInvestment] = useState(10000)
  const [years, setYears] = useState(15)
  const [customRate, setCustomRate] = useState(7.1)
  const { currency } = useCurrency()
  const fmt = (n: number) => formatCurrency(n, currency)

  const result = useMemo(() => calculatePPF(annualInvestment, years, customRate), [annualInvestment, years, customRate])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-bold">Recurring Savings Calculator</h2>
        <p className="text-sm text-muted-foreground -mt-4">Calculate how a fixed annual contribution grows at a guaranteed interest rate (e.g. PPF, NSC, government bonds)</p>
        <SliderInput
          label="Yearly Investment"
          value={annualInvestment}
          min={100}
          max={150000}
          step={100}
          onChange={setAnnualInvestment}
          formatValue={fmt}
        />
        <SliderInput
          label="Investment Period (Years)"
          value={years}
          min={1}
          max={40}
          step={1}
          onChange={setYears}
          formatValue={(v) => `${v} yr`}
        />
        <div>
          <label className="text-sm font-medium text-muted-foreground block mb-2">Annual Interest Rate (%)</label>
          <input
            type="number"
            value={customRate}
            min={0.1}
            max={20}
            step={0.1}
            onChange={(e) => setCustomRate(Number(e.target.value))}
            className="w-32 p-2 rounded-xl border border-border bg-background text-foreground text-base font-bold focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>
      <div className="space-y-6 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <h3 className="text-xl font-bold mb-4">Summary</h3>
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
          <p className="text-xs text-muted-foreground pt-2">Interest rate: {customRate}% p.a., compounded annually</p>
        </div>
      </div>
    </div>
  )
}

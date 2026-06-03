"use client"
import { useState, useMemo } from "react"
import { calculateRetirement } from "@/lib/math"
import { SliderInput } from "@/components/shared/SliderInput"
import { useCurrency } from "@/components/providers/currency-provider"
import { formatCurrency } from "@/lib/utils"

export function RetirementCalculatorClient() {
  const [currentAge, setCurrentAge] = useState(30)
  const [retirementAge, setRetirementAge] = useState(65)
  const [currentSavings, setCurrentSavings] = useState(50000)
  const [monthlyContribution, setMonthlyContribution] = useState(1500)
  const [expectedReturn, setExpectedReturn] = useState(7)
  const [inflationRate, setInflationRate] = useState(3)
  const [monthlyExpenses, setMonthlyExpenses] = useState(4000)
  const { currency } = useCurrency()
  const fmt = (n: number) => formatCurrency(n, currency)

  const result = useMemo(
    () => calculateRetirement(currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn, inflationRate, monthlyExpenses),
    [currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn, inflationRate, monthlyExpenses]
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-bold">Retirement Planner</h2>
        <div className="grid grid-cols-2 gap-6">
          <SliderInput label="Current Age" value={currentAge} min={18} max={60} step={1} onChange={setCurrentAge} formatValue={(v) => `${v} yr`} />
          <SliderInput label="Retirement Age" value={retirementAge} min={45} max={80} step={1} onChange={setRetirementAge} formatValue={(v) => `${v} yr`} />
        </div>
        <SliderInput label="Current Savings" value={currentSavings} min={0} max={2000000} step={1000} onChange={setCurrentSavings} formatValue={fmt} />
        <SliderInput label="Monthly Contribution" value={monthlyContribution} min={100} max={20000} step={100} onChange={setMonthlyContribution} formatValue={fmt} />
        <SliderInput label="Expected Return (% p.a.)" value={expectedReturn} min={2} max={18} step={0.5} onChange={setExpectedReturn} formatValue={(v) => `${v}%`} />
        <SliderInput label="Inflation Rate (% p.a.)" value={inflationRate} min={1} max={10} step={0.5} onChange={setInflationRate} formatValue={(v) => `${v}%`} />
        <SliderInput label="Monthly Expenses at Retirement" value={monthlyExpenses} min={500} max={50000} step={500} onChange={setMonthlyExpenses} formatValue={fmt} />
      </div>
      <div className="space-y-6 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <h3 className="text-xl font-bold mb-4">Retirement Summary</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Years to Retire</span>
            <span className="font-semibold">{retirementAge - currentAge} yr</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Projected Corpus</span>
            <span className="font-bold text-lg text-primary">{fmt(result.projectedCorpus)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Required Corpus</span>
            <span className="font-bold text-lg">{fmt(result.requiredCorpus)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Future Monthly Expenses</span>
            <span className="font-semibold">{fmt(result.futureMonthlyExpenses)}</span>
          </div>
          {result.shortfall > 0 ? (
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3 text-sm text-destructive font-semibold">
              Shortfall: {fmt(result.shortfall)} — Increase contributions!
            </div>
          ) : (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-sm text-green-600 dark:text-green-400 font-semibold">
              Surplus: {fmt(result.surplus)} — You&apos;re on track! 🎉
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

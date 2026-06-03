"use client"
import { useState, useMemo } from "react"
import { calculateRetirement } from "@/lib/math"
import { SliderInput } from "@/components/shared/SliderInput"

export function RetirementCalculatorClient() {
  const [currentAge, setCurrentAge] = useState(30)
  const [retirementAge, setRetirementAge] = useState(60)
  const [currentSavings, setCurrentSavings] = useState(500000)
  const [monthlyContribution, setMonthlyContribution] = useState(15000)
  const [expectedReturn, setExpectedReturn] = useState(10)
  const [inflationRate, setInflationRate] = useState(6)
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000)

  const result = useMemo(
    () => calculateRetirement(currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn, inflationRate, monthlyExpenses),
    [currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn, inflationRate, monthlyExpenses]
  )
  const fmt = (n: number) => {
    if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`
    if (n >= 100000)   return `₹${(n / 100000).toFixed(1)}L`
    return `₹${n.toLocaleString('en-IN')}`
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-bold">Retirement Planner</h2>
        <div className="grid grid-cols-2 gap-6">
          <SliderInput label="Current Age" value={currentAge} min={18} max={55} step={1} onChange={setCurrentAge} formatValue={(v) => `${v} yr`} />
          <SliderInput label="Retirement Age" value={retirementAge} min={45} max={75} step={1} onChange={setRetirementAge} formatValue={(v) => `${v} yr`} />
        </div>
        <SliderInput label="Current Savings (₹)" value={currentSavings} min={0} max={10000000} step={50000} onChange={setCurrentSavings} formatValue={fmt} />
        <SliderInput label="Monthly Contribution (₹)" value={monthlyContribution} min={1000} max={200000} step={1000} onChange={setMonthlyContribution} formatValue={(v) => `₹${v.toLocaleString('en-IN')}`} />
        <SliderInput label="Expected Return (% p.a.)" value={expectedReturn} min={4} max={18} step={0.5} onChange={setExpectedReturn} formatValue={(v) => `${v}%`} />
        <SliderInput label="Inflation Rate (% p.a.)" value={inflationRate} min={2} max={12} step={0.5} onChange={setInflationRate} formatValue={(v) => `${v}%`} />
        <SliderInput label="Monthly Expenses at Retirement (₹)" value={monthlyExpenses} min={10000} max={500000} step={5000} onChange={setMonthlyExpenses} formatValue={(v) => `₹${v.toLocaleString('en-IN')}`} />
      </div>
      <div className="space-y-6 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <h3 className="text-xl font-bold mb-4">Retirement Summary</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Years to Retire</span>
            <span className="font-semibold">{retirementAge - currentAge} years</span>
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
              Surplus: {fmt(result.surplus)} — You're on track! 🎉
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
